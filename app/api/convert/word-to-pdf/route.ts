import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("word") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert Word -> HTML
    const { value: html } = await mammoth.convertToHtml({ buffer });

    const fullHtml = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; padding: 40px; }
            img { max-width: 100%; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    // Convert HTML -> PDF using headless Chromium
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=converted.pdf",
      },
    });
  } catch (err: any) {
    console.error("CONVERSION ERROR:", err.message || err);
    return NextResponse.json({ error: err.message || "Conversion failed" }, { status: 500 });
  }
}