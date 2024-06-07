import { redirect } from "next/navigation";
import coms from "../../coms";

interface Params {
  params: {
    id: string;
  };
}
export async function GET(req: Request, { params }: Params) {
  const comment = coms.find((comment) => comment.id === +params.id);
  if (+params.id > coms.length) {
    redirect("/api/doc");
  }
  return Response.json(comment);
}

export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json();
  const { text } = body;
  const cell = coms[+params.id - 1];
  cell.comment = text;
  return Response.json(cell);
}
export async function DELETE(req: Request, { params }: Params) {
  coms.splice(+params.id - 1, 1);

  return Response.json(coms);
}
