import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct || password !== correct) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", correct, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
  return res;
}
