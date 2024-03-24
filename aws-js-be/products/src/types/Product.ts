export interface Product {
  description: string;
  title: string;
  id: string;
  price: number;
  imageName: string;
}

export type ProductList = Array<Product>;
