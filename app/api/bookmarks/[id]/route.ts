import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Function to handle authorization check and bookmark retrieval
async function getAuthorizedBookmark(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  }); // <-- await
  if (!session) return { unauthorized: true } as const;

  const bookmark = await prisma.bookmark.findUnique({
    where: { id, userId: session.user.id },
  });
  if (!bookmark) return { notFound: true } as const;

  return { bookmark } as const;
}

// PATCH: UPDATE a bookmark
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // 🔥 Must await the params (React Compiler requirement)
  const { id } = await context.params;

  const check = await getAuthorizedBookmark(id);

  if ("unauthorized" in check) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if ("notFound" in check) {
    return NextResponse.json(
      { error: "Bookmark not found" },
      { status: 404 }
    );
  }

  const data = await req.json();

  const updatedBookmark = await prisma.bookmark.update({
    where: { id },
    data: {
      ...data,
      expiresAt:
        data.expiresAt !== undefined
          ? data.expiresAt
            ? new Date(data.expiresAt)
            : null
          : undefined,
    },
  });

  return NextResponse.json(updatedBookmark);
}

// DELETE: DELETE a bookmark
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const check = await getAuthorizedBookmark(id);

  if ("unauthorized" in check)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );

  if ("notFound" in check)
    return NextResponse.json(
      { error: "Bookmark not found" },
      { status: 404 }
    );

  await prisma.bookmark.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
