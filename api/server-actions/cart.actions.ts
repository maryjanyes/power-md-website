'use server';

import { prisma } from '@/lib/prisma';
import { CartOrderPayload } from '@/lib/types/cart.types';
import Nodemailer from 'nodemailer';

const getTransportInstance = () => {
  const transportParams = {
    host: process.env.SMTP_GMAIL_HOSTNAME,
    port: 587,
    auth: {
      user: process.env.SMTP_GMAIL_USERNAME,
      pass: process.env.SMTP_GMAIL_PASSWORD,
    },
  };
  const transportInstance = Nodemailer.createTransport(transportParams);

  return transportInstance;
};

export async function createNewCartOrder(cartOrderPayload: CartOrderPayload, existsUserId?: number) {
  let shippingContactId = null;
  const { shippingContactInfo, items } = cartOrderPayload;

  if (!existsUserId) {
    shippingContactId = (await prisma.cartOrderShipping.create({
      data: ({
        ...shippingContactInfo,
        email: undefined,
        notes: undefined,
      } as any),
    })).id;
  }

  const newCartOrder = await prisma.cartOrder.create({
    data: {
      ...(existsUserId ? {
        contact_user_id: existsUserId,
      } : {
        contact_shipping_id: shippingContactId,
      }),
    },
  });
  const cartOrderItemsToAdd = items.map((item) => ({
    quantity: item.quantity,
    product_id: item.product_id,
    cart_order_id: newCartOrder.id,
  }));
  const newCartOrderItems = await prisma.cartOrderItem.createMany({
    data: cartOrderItemsToAdd,
  });
  const transport = getTransportInstance();
  const emailParams = {
    from: `"Power.UKR" <power_ukr.support@gmail.com>`,
    to: shippingContactInfo.email,
    subject: `Нове замовлення #${newCartOrder.id}`,
    html: `
      <div style="padding: 10px;">
        <span style="font-weight: bold; font-size: 20px;">Вітаємо, ваше замовлення: </span>
        <ul style="padding-inline: 0px; margin-block-start: 0px; margin-top: 10px;">
          ${cartOrderItemsToAdd.reduce((acc, item, itemId) => {
            return acc+= `<li><span>Кількість: ${item.quantity}</span><br /><span>Позиція: ${items[itemId].product_name}</span></li>`;
          }, "")}
        </ul>
        <span style="font-size: 16px;">Очікуйте на дзвінок менеджера.</span>
      </div>
    `
  }
  await transport.sendMail(emailParams);

  return { newCartOrder, newCartOrderItems };
}
