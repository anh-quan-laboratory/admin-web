import { z } from "zod";

export enum TestCategory {
  RANGE = "RANGE",
  BOOLEAN = "BOOLEAN",
}

export const CreateTestSchema = z
  .object({
    name: z.string().min(1),
    unit: z.string(),
    min: z.coerce.number().min(0).optional(),
    max: z.coerce.number().optional(),
    posibleValues: z.array(z.string()).optional(),
    normalValue: z.string().optional(),
    price: z.coerce.number(),
    category: z.enum([TestCategory.BOOLEAN, TestCategory.RANGE]),
  })
  .refine(
    (data) => {
      if (data.category === TestCategory.RANGE) {
        return data.min !== undefined && data.max !== undefined && (data?.min as number) <= (data?.max as number);
      } else {
        return data.posibleValues !== undefined && data.normalValue !== undefined;
      }
    },
    {
      message: "Invalid data based on category",
      path: ["category"],
    }
  );

export type CreateTestInput = z.infer<typeof CreateTestSchema>;

export type Test = CreateTestInput & {
  _id: string;
};

export const defaultTest: CreateTestInput = {
  name: "",
  price: 0,
  normalValue: "",
  unit: "",
  category: TestCategory.RANGE,
  min: 0,
  max: 0,
  posibleValues: [],
};
