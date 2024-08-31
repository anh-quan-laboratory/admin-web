import { z } from "zod";
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

export const comboSchema = z.object({
  name: z.string().min(1, { message: "Tên gói xét nghiệm không được để trống" }),
  price: z.coerce.number().min(0, { message: "Giá tiền không hợp lệ" }),
  tests: z.array(z.string()),
});

export type ComboSchema = z.infer<typeof comboSchema>;

export const defaultCombo: ComboSchema = {
  name: "",
  tests: [],
  price: 0,
};
