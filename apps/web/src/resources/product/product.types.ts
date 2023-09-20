export interface Product {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  deletedOn?: Date | null;
  productName: string;
  price: number;
  productImageUrl?: string | null;
  inCart?: boolean;
}
