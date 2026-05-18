export interface CartOrderItem {
  quantity: number,
  product_id: number,
  product_name: string,
  price: number,
}

export interface CartOrderPayload {
  items: CartOrderItem[],
  shippingContactInfo: CartOrderShippingContactForm,
}

export interface CartOrderShippingContactForm {
  full_name: string,
  phone: string,
  home_address: string,
  city: string,
  zip_code: string,
  country: string,
  notes: string,
}
