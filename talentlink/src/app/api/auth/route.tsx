import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  //read headers
  const reqHeaders = new Headers(req.headers);

  //   console.log(reqHeaders.get("auth"));

  cookies().set("result", "good");
  //   console.log(cookies().get("result"));
  //   console.log(req.cookies.get("theme"));
  //write headers
  return new Response("<h1>api data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
