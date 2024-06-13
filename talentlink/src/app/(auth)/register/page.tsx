import { RegisterForm } from "@/components/forms/registerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Регистрация",
};

export default function Register() {
    return (
        <RegisterForm />
    );
}
