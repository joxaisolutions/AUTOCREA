// Nota: esta es una corrección enfocada a la firma de salida para que Next.js acepte el handler.
// Reemplaza el contenido actual de app/api/terminal/execute/route.ts por este.
// Si tu implementación original hacía más cosas (ejecutar comandos o lógica adicional),
// puedo integrarlas aquí manteniendo la firma correcta — pásame el repo y lo hago.

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: Request): Promise<void | Response> {
  // Intentamos parsear el body; si no es JSON, devolvemos 400.
  let payload: any;
  try {
    payload = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const command = typeof payload?.command === "string" ? payload.command.trim() : "";

  if (!command) {
    return new Response(JSON.stringify({ error: "Missing `command` in request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Seguridad: rechazamos comandos potencialmente peligrosos en entornos públicos.
  const forbidden = ["rm ", "reboot", "shutdown", ":(){:|:&};:"];
  for (const term of forbidden) {
    if (command.includes(term)) {
      return new Response(JSON.stringify({ error: "Command not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  try {
    // Ejecuta el comando con timeout corto por seguridad (10s).
    const { stdout, stderr } = await execAsync(command, { timeout: 10_000 });

    // Combinar stdout y stderr para mostrar todo el output
    let output = stdout ?? "";
    if (stderr && stderr.trim()) {
      output += (output ? "\n" : "") + stderr;
    }

    return new Response(
      JSON.stringify({
        success: true,
        output: output || "✅ Comando ejecutado exitosamente (sin output)",
        stdout: stdout ?? "",
        stderr: stderr ?? "",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    // Normalizamos el error para devolver un Response válido
    return new Response(
      JSON.stringify({
        success: false,
        error: String(err?.message ?? err),
        output: `❌ Error: ${String(err?.message ?? err)}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
