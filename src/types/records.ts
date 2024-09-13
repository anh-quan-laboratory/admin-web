import { z } from "zod";

export const TestRecordSchema = z.object({
  customerId: z.string(),
  doctorId: z.string().optional(),
  tests: z.array(z.string()),
  price: z.number().optional(),
})

export type TestRecordInput = z.infer<typeof TestRecordSchema>;

export type TestRecord = TestRecordInput & {
  _id: string;
};

export const defaultTestRecordValue: TestRecordInput = {
  customerId: "",
  doctorId: "",
  tests: [],
  price: 0,
}