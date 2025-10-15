"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { FileCode, Copy, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (value: string | undefined) => void;
}

export function CodeEditor({
  code,
  language = "typescript",
  readOnly = true,
  onChange,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generated-code.${language === "typescript" ? "ts" : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <Card className="p-4 h-full flex items-center justify-center">
        <div className="text-slate-400">Cargando editor...</div>
      </Card>
    );
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 rounded-t-lg border border-slate-700">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">
            Código Generado
          </span>
          <span className="text-xs text-slate-500 px-2 py-1 bg-slate-700 rounded">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copiado" : "Copiar"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8"
          >
            <Download className="w-4 h-4" />
            Descargar
          </Button>
        </div>
      </div>
      <div className="flex-1 rounded-b-lg overflow-hidden border border-slate-700 border-t-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={onChange}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}
