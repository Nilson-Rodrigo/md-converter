import { NextRequest, NextResponse } from "next/server";
import htmlToDocx from "html-to-docx";
import { remark } from "remark";
import html from "remark-html";

export async function POST(req: NextRequest) {
  try {
    const { markdown } = await req.json();

    if (!markdown) {
      return NextResponse.json({ error: "Conteúdo vazio" }, { status: 400 });
    }

    // 1. Transforma Markdown em HTML
    const processed = await remark().use(html).process(markdown);
    const htmlContent = processed.toString();

    // 2. Transforma HTML em buffer DOCX
    const fileBuffer = await htmlToDocx(htmlContent, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      header: true,
    });

    // 3. Retorna o arquivo para download
    const uint8Array = new Uint8Array(
      fileBuffer instanceof Buffer 
        ? fileBuffer 
        : Buffer.from(fileBuffer)
    );

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="documento.docx"',
      },
    });
  } catch (error) {
    console.error("Erro na conversão DOCX:", error);
    return NextResponse.json({ error: "Falha na conversão" }, { status: 500 });
  }
}