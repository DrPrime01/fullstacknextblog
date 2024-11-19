export {};

declare global {
  type PostType = {
    _id: string;
    userId: string;
    desc: string;
    img: string;
    slug: string;
    title: string;
  };

  type CartSliceType = {
    cartItems: ProductType[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
  };
}
