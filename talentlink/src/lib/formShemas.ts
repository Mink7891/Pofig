import { z } from "zod";

export const AddNewFormData = z.object({
    Header: z
      .string()
      .min(1, { message: "Header is required." }),
    Category: z
      .string()
      .min(1, { message: "Category is required." }),
    Text: z
      .string()
      .min(1, { message: "Text is required." }),
    NewID: z.number().optional()
  });