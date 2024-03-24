import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    title: "Decadent Croissant",
    description: "Buttery and flaky French-style pastry, perfect with coffee",
    price: 2.5,
    imageName: "croissant",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    title: "Tomato Basil Baguette",
    description: "Crisp bread filled with dried tomatoes and basil",
    price: 3.0,
    imageName: "tomato-basil-baguette",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    title: "Chocolate Chip Cookie",
    description: "Classic cookie studded with gooey chocolate chips",
    price: 1.2,
    imageName: "cookie",
  },
  {
    description: "Sweet and soft muffin loaded with juicy blueberries",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 2.0,
    title: "Blueberry Muffin",
    imageName: "muffin",
  },
  {
    description: "Soft bun glazed with aromatic cinnamon icing",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 2.3,
    title: "Cinnamon Roll",
    imageName: "",
  },
  {
    description: "Healthy and hearty bread made of various grains",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 4.0,
    title: "Multigrain Bread",
    imageName: "",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product: {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      title: "Decadent Croissant",
      description: "Buttery and flaky French-style pastry, perfect with coffee",
      price: 2.5,
      imageName: "croissant",
    },
    count: 5,
  },
  {
    product: {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      title: "Tomato Basil Baguette",
      description: "Crisp bread filled with dried tomatoes and basil",
      price: 3.0,
      imageName: "tomato-basil-baguette",
    },
    count: 5,
  },
];

export const orders: Order[] = [
  {
    id: "1",
    address: {
      address: "some address",
      firstName: "Name",
      lastName: "Surname",
      comment: "",
    },
    items: [
      { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 2 },
      { productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1", count: 5 },
    ],
    statusHistory: [
      { status: OrderStatus.Open, timestamp: Date.now(), comment: "New order" },
    ],
  },
  {
    id: "2",
    address: {
      address: "another address",
      firstName: "John",
      lastName: "Doe",
      comment: "Ship fast!",
    },
    items: [{ productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 3 }],
    statusHistory: [
      {
        status: OrderStatus.Sent,
        timestamp: Date.now(),
        comment: "Fancy order",
      },
    ],
  },
];
