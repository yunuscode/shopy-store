export interface Cart {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  deletedOn?: Date | null;
  productName: string;
  productId: string;
  userId: string;
  productPrice: number;
  productImageUrl?: string | null;
}
