import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("word") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

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

    const isLocal = process.env.NODE_ENV === "development";

    const browser = await puppeteer.launch({
      args: isLocal ? [] : chromium.args,
      executablePath: isLocal
        ? undefined
        : await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return new NextResponse(new Uint8Array(pdfBuffer), {
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