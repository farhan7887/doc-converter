import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: NextRequest) {
  let browser = null;
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
            body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; padding: 40px; color: #1a1a1a; }
            h1 { font-size: 24px; margin: 20px 0 10px; }
            h2 { font-size: 20px; margin: 18px 0 8px; }
            h3 { font-size: 16px; margin: 16px 0 6px; }
            p { margin: 8px 0; }
            table { border-collapse: collapse; width: 100%; margin: 10px 0; }
            td, th { border: 1px solid #ccc; padding: 6px 10px; }
            img { max-width: 100%; }
            ul, ol { margin: 8px 0; padding-left: 24px; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
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
    if (browser) await browser.close();
    console.error("CONVERSION ERROR:", err.message || err);
    return NextResponse.json({ error: err.message || "Conversion failed" }, { status: 500 });
  }
}