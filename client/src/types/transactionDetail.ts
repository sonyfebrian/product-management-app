export  interface ITransactionDetail {
  
    transaction_id: number;
    product_variant_id: number;
    qty: number;
    subtotal: number;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user: null | string;
    updated_date: string;
    createdAt: string;
    updatedAt: string;
    product_variant: {
      product_variant_id: number;
      price: number;
      name: string;
      image_location: string;
    };
    transaction: {
      transaction_id: number;
    };
  }