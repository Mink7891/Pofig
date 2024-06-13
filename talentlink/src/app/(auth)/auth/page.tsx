import AuthForm from "@/components/forms/authForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Авторизация",
};

export default function Login() {
    return (
        <AuthForm />
    );
}
