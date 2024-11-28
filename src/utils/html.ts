import fs from 'fs';
import path from 'path';

export function renderHtml(fileName: string, data: Record<string, any> = {}) {
  const filePath = path.join(__dirname, '..', 'views', fileName);
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  return htmlContent.replace(/{{([^{}]*)}}/g, (_, key) => {
    return data[key.trim()];
  });
}
