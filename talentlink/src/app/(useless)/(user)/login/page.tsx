import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

export default function Login() {
  return (
    <main className="">
      <h1>Login</h1>
      <Button>
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </main>
  );
}
