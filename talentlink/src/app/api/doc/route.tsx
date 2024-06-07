import { NextRequest } from "next/server";
import coms from "../coms";

//get data from url
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  const filteredComments = coms.filter((item) => item.comment.includes(query));
  if (filteredComments.length == 0) {
    return Response.json(coms);
  }

  return Response.json(filteredComments);
}

export async function POST(req: Request) {
  const comment = await req.json();
  const newComment = {
    id: coms.length + 1,
    comment: comment.text,
  };
  coms.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 210,
  });
}
