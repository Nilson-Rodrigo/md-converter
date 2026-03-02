"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { saveAs } from "file-saver";

export default function Home() {
  const [markdown, setMarkdown] = useState("# Olá Mundo\n\nComece a escrever seu documento...\n\n## Títulos funcionam\n- Listas também\n- **Negrito** e *itálio*");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("preview-content");
      
      if (element) {
        await html2pdf()
          .from(element)
          .set({
            margin: 10,
            filename: "documento.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { 
              scale: 2, 
              letterRendering: true,
              useCORS: false,
            },
            jsPDF: { 
              format: "a4", 
              orientation: "portrait", 
              unit: "mm" 
            },
            // Removido pagebreak para evitar erro de tipo
          })
          .save();
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao gerar PDF");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadDocx = async () => {
    try {
      const response = await fetch("/api/convert-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown }),
      });
      
      if (!response.ok) throw new Error("Erro na conversão");
      
      const blob = await response.blob();
      saveAs(blob, "documento.docx");
    } catch (error) {
      alert("Erro ao gerar DOCX. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <header className="max-w-7xl mx-auto mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📄 MD Converter</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadPDF}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "⏳ Gerando PDF..." : "📥 Baixar PDF"}
          </button>
          <button 
            onClick={handleDownloadDocx}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            📥 Baixar DOCX
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
        <div className="h-full">
          <textarea
            className="w-full h-full p-4 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 font-mono text-sm resize-none text-gray-800 shadow-sm"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Escreva em Markdown..."
          />
        </div>
        
        <div className="h-full overflow-y-auto border-2 border-gray-300 rounded-lg bg-white p-6 shadow-sm">
          <div 
            id="preview-content"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#000000",
              backgroundColor: "#ffffff",
              padding: "20px",
            }}
          >
            <ReactMarkdown 
              components={{
                h1: ({node, ...props}) => <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#000000", borderBottom: "1px solid #ccc", paddingBottom: "8px" }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", marginTop: "24px", color: "#000000" }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", marginTop: "16px", color: "#000000" }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: "12px", color: "#000000", textAlign: "justify" }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginBottom: "12px", marginLeft: "24px", color: "#000000" }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ marginBottom: "12px", marginLeft: "24px", color: "#000000" }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: "4px", color: "#000000" }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ fontWeight: "bold", color: "#000000" }} {...props} />,
                em: ({node, ...props}) => <em style={{ fontStyle: "italic", color: "#000000" }} {...props} />,
                code: ({node, ...props}) => <code style={{ backgroundColor: "#f0f0f0", padding: "2px 6px", borderRadius: "3px", color: "#000000", fontFamily: "monospace", fontSize: "12px" }} {...props} />,
                blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: "4px solid #ccc", paddingLeft: "16px", fontStyle: "italic", color: "#666", margin: "16px 0" }} {...props} />,
                hr: ({node, ...props}) => <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "16px 0" }} {...props} />,
                table: ({node, ...props}) => <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }} {...props} />,
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}