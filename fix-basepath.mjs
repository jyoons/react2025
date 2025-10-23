// fix-basepath.mjs
import { promises as fs } from 'fs';
import path from 'path';

const BASE = '/react2025'; // repo 이름
const ROOT = path.resolve('out');
const files = [];

async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (/\.(html|css|js)$/.test(p)) files.push(p);
  }
}

// 모든 절대경로 / → /react2025/ 로
function rewrite(s) {
  // img, script, link src/href
  s = s.replace(/(\bsrc\s*=\s*["'])\/(?!react2025\/|_next\/|https?:)/g, `$1${BASE}/`);
  s = s.replace(/(\bhref\s*=\s*["'])\/(?!react2025\/|_next\/|https?:)/g, `$1${BASE}/`);

  // CSS url(/...) → url(/react2025/...)
  s = s.replace(/url\(\s*\/(?!react2025\/|_next\/)/g, `url(${BASE}/`);

  // 중복 방지
  s = s.replace(new RegExp(`${BASE}${BASE}`, 'g'), BASE);
  return s;
}

(async () => {
  await walk(ROOT);
  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, 'utf8');
      const out = rewrite(content);
      if (out !== content) await fs.writeFile(file, out, 'utf8');
    })
  );
  console.log(`✅ Fixed base paths for ${files.length} files`);
})();