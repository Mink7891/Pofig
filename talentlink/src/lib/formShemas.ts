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
    NewID: z.number().optional(),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Почта обязательна",
    }),
    password: z.string().min(6, {
        message: "Пароль должен состоять минимум из 6 символов",
    }),
    username: z.string().min(4, {
        message: "Имя пользователя должно содержать минимум 4 символа",
    }),
});