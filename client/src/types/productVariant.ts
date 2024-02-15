export interface IProductVariant {
  id:number;
  product_id: number;
  code: string;
  name: string;
  image_location: string;
  qty: number;
  price: number;
  active: boolean;
  created_user: string;
}