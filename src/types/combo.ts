import { Test } from "./test";

export interface Combo {
  _id: string;
  name: string;
  tests: Test[];
  price: number;
}

export interface CreateComboInput {
  name: string;
  tests: string[];
  price: number;
}

export interface ComboFormValues {
  name: string;
  tests: string[];
  price: number;
}
