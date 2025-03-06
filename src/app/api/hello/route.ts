export const dynamic = "force-static";
export const revalidate = 10;

export async function GET(request: Request) {
  return new Response('Hello! Welcome to Daniel Zotti\'s website!');
}
