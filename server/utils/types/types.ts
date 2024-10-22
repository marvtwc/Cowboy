import { Schema, Types } from "mongoose";

export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
  access: AccessL;
  customers?: Schema.Types.ObjectId[];
}
export enum AccessL {
  user = "user",
  admin = "admin",
}
export interface ProductModel {
  _id?: string;
  type: string;
  part_number: string;
  product_name: string;
  size: string;
  amount_per_case: number;
  cases_per_pallet?: number;
  cost_per_product: number;
  pallet_per_truck?: number;
  unit_measure?: string;
  note?: string;
  vendor_owned:Schema.Types.ObjectId;
}
export interface ContactModel {
  _id?: string;
  name: string;
  phone_number: string;
  email: string;
  title?: string;
  note?: string;
}
export interface VendorModel {
  _id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contacts?: Schema.Types.ObjectId[];
  note?: string;
}
export interface CustomerModel {
  _id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  contacts?: Schema.Types.ObjectId[];
  margin: number;
  note?: string;
}
export interface OrderModel {
  _id?: string;
  employee: Schema.Types.ObjectId;
  quotes: Schema.Types.ObjectId[];
  invoices: Schema.Types.ObjectId[];
  customer: Schema.Types.ObjectId;
}

export interface QuoteContentsModel {
  _id?: string;
  product: Schema.Types.ObjectId;
  quantity: number;
  margin: number;
}

export interface InvoiceContentsModel {
  _id?: string;
  product: ProductModel;
  quantity: number;
  margin: number;
}

export interface QuoteModel {
  _id?: string;
  selling_order_po?:string;
  vendor: Schema.Types.ObjectId;
  customer: Schema.Types.ObjectId;
  quote_content: QuoteContentsModel[];
}

export interface InvoiceModel {
  _id?: string;
  vendor: Schema.Types.ObjectId;
  customer: Schema.Types.ObjectId;
  invoice_content: Types.DocumentArray<InvoiceContentsModel>;
  generating_quote: Schema.Types.ObjectId;
}

export interface PackingSlipModel {
  _id?: string;
  generating_invoice: Schema.Types.ObjectId;
  order_content: Types.DocumentArray<InvoiceContentsModel>;
}

export interface VendorOrderModel{
  _id?: string;
  buying_order_po: string;
  generating_invoice: Schema.Types.ObjectId;
}
