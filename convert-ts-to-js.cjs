const fs = require('fs');
const path = require('path');
const ts = require('./node_modules/typescript');
const root = path.join(process.cwd(), 'src');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      files.push(full);
    }
  }
}
walk(root);
files.push(path.join(process.cwd(), 'vite.config.ts'));
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const result = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.Preserve,
      allowJs: true,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Preserve,
    },
    fileName: file,
  });
  const ext = path.extname(file);
  const out = file.slice(0, -ext.length) + (ext === '.tsx' ? '.jsx' : '.js');
  fs.writeFileSync(out, result.outputText, 'utf8');
  fs.unlinkSync(file);
  console.log('converted', file, '->', out);
}
console.log('done');
