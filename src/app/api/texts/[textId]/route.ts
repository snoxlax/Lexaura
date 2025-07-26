import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ textId: string }> },
) {
  try {
    const { textId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the text exists and belongs to the user
    const existingText = await prisma.letter.findUnique({
      where: { id: textId, userId },
    });

    if (!existingText) {
      return Response.json({ error: "Text not found" }, { status: 404 });
    }

    // Delete the text
    await prisma.letter.delete({
      where: { id: textId, userId },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting text:", error);
    return Response.json({ error: "Failed to delete text" }, { status: 500 });
  }
}
