import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath("/open-source", "page");
    revalidatePath("/en/open-source", "page");
    revalidatePath("/it/open-source", "page");
    
    return NextResponse.json({
      revalidated: true,
      message: "Open source pages revalidated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
