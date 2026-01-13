// shared/src/index.ts
// Define a Zod schema or Type here later
export const TAX_RATE = 0.16;

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Client {
  id: string;
  name: string;
}

export const greet = (name: string) => `Hello, ${name}!`;
