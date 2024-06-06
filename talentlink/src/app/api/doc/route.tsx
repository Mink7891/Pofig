import coms from "../coms";

export async function GET() {
  return Response.json(coms);
}
