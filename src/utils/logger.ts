import fs from 'fs';
import path from 'path';

const logDir = 'logs';

// Crear directorio si no existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

type LogLevel = 'info' | 'warn' | 'error';

const colors: Record<LogLevel | 'reset', string> = {
  info: '\x1b[32m', // verde
  warn: '\x1b[33m', // amarillo
  error: '\x1b[31m', // rojo
  reset: '\x1b[0m',
};

function writeToFile(text: string): void {
  const filePath = path.join(logDir, 'app.log');
  fs.appendFile(filePath, text + '\n', () => {});
}

function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

  // Consola con color
  console.log(colors[level] + line + colors.reset);

  // Archivo sin color
  writeToFile(line);
}

export const logger = {
  info: (msg: string) => log('info', msg),
  warn: (msg: string) => log('warn', msg),
  error: (msg: string, error: unknown) => log('error', `${msg} Error: ${error}`),
};
