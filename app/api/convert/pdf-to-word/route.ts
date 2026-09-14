import { NextRequest, NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    const paragraphs: Paragraph[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      let lastY: number | null = null;
      let currentLine = "";
      let currentFontSize = 12;

      const fontSizes: number[] = textContent.items
        .map((item: any) => item.transform[3])
        .filter((h: number) => h > 0);
      const avgFontSize =
        fontSizes.length > 0 ? fontSizes.reduce((a, b) => a + b, 0) / fontSizes.length : 12;

      const flushLine = () => {
        if (!currentLine.trim()) {
          currentLine = "";
          return;
        }
        const isHeading = currentFontSize > avgFontSize * 1.3;
        paragraphs.push(
          new Paragraph({
            heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
            children: [
              new TextRun({
                text: currentLine.trim(),
                bold: isHeading,
              }),
            ],
          })
        );
        currentLine = "";
      };

      for (const item of textContent.items as any[]) {
        const y = item.transform[5];
        const fontSize = item.transform[3];

        if (lastY !== null && Math.abs(y - lastY) > 3) {
          flushLine();
        }

        currentLine += item.str + (item.hasEOL ? "" : " ");
        currentFontSize = fontSize;
        lastY = y;
      }
      flushLine();

      if (pageNum < pdf.numPages) {
        paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs.length > 0 ? paragraphs : [new Paragraph({ children: [new TextRun("")] })],
        },
      ],
    });

    const docxBuffer = await Packer.toBuffer(doc);

    return new NextResponse(new Uint8Array(docxBuffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=converted.docx",
      },
    });
  } catch (err: any) {
    console.error("CONVERSION ERROR:", err.message || err);
    return NextResponse.json({ error: err.message || "Conversion failed" }, { status: 500 });
  }
}