import { NextResponse } from "next/server";
import { listBlogPosts, createBlogPost, parseFormInput } from "@/lib/blogStore";

export async function GET() {
  const posts = await listBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const input = parseFormInput(raw);
  if ("error" in input) return NextResponse.json({ error: input.error }, { status: 400 });

  try {
    const post = await createBlogPost(input);
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
