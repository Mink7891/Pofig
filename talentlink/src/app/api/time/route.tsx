//not in dev mode ебаный next caches data for GET
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    time: new Date().toLocaleTimeString(),
  });
}
