export interface IProduct {
  id: number;
  plu: string;
  name: string;
  product_category_id: number;
  active: boolean;
  created_user: string;
}

export interface IProductList {
  products: IProduct[];
}
