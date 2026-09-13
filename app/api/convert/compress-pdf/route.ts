import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
    });

    return new NextResponse(Buffer.from(compressedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=compressed.pdf",
      },
    });
  } catch (err: any) {
    console.error("COMPRESSION ERROR:", err.message || err);
    return NextResponse.json({ error: err.message || "Compression failed" }, { status: 500 });
  }
}