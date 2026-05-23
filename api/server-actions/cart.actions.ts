'use server';

import { User } from '@/db/generated/prisma/client';
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

export async function createNewCartOrder(cartOrderPayload: CartOrderPayload, user?: User) {
  let shippingContactId = null;
  const { shippingContactInfo } = cartOrderPayload;

  if (!user?.id) {
    shippingContactId = (await prisma.cartOrderShipping.create({
      data: {
        phone: shippingContactInfo.phone,
        home_address: shippingContactInfo.home_address,
        city: shippingContactInfo.city,
        country: shippingContactInfo.country,
        full_name: shippingContactInfo.full_name,
        zip_code: shippingContactInfo.zip_code,
      },
    })).id;
  }

  const newCartOrder = await prisma.cartOrder.create({
    data: {
      ...(user?.id ? {
        contact_user_id: user.id,
      } : {
        contact_shipping_id: shippingContactId,
      }),
    },
  });
  const cartOrderItemsToAdd = cartOrderPayload.items.map((item) => ({
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
    to: user?.email || shippingContactInfo.email,
    subject: `Нове замовлення #(${newCartOrder.id})`,
    html: `<div><p>Ваше замовлення відправлено в обробку. Очікуйте на дзвінок менеджера.</p></div>`
  }
  await transport.sendMail(emailParams);

  return { newCartOrder, newCartOrderItems };
}
