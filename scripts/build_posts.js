#!/usr/bin/env node
/**
 * posts/*.md をスキャンして posts/posts.json を生成するビルドスクリプト。
 *
 * 使い方: node scripts/build_posts.js
 * 新しい記事 (posts/xxx.md) を追加したら実行してください。
 *
 * 各記事の想定フォーマット:
 *   1行目: # タイトル
 *   2行目: Month-D-YYYY (例: February-1-2025)
 *   以降 : 本文 (<!-- highlight --> があると一覧でハイライト表示)
 */
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUTPUT = path.join(POSTS_DIR, 'posts.json');
const SKIP_FILES = new Set(['post0.md']); // テンプレートは除外

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

function parseDate(line) {
  const m = line.trim().match(/^([A-Za-z]+)-(\d{1,2})-(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[1].toLowerCase()];
  if (!month) return null;
  const day = parseInt(m[2], 10);
  const year = parseInt(m[3], 10);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function firstImage(markdown) {
  const md = markdown.match(/!\[[^\]]*\]\(([^)\s]+)/);
  if (md) return md[1];
  const html = markdown.match(/<img[^>]+src=["']([^"']+)["']/i);
  return html ? html[1] : null;
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')        // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')     // links -> text
    .replace(/<[^>]+>/g, '')                     // html tags
    .replace(/[*_`#>]/g, '')                     // md decorations
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExcerpt(bodyLines) {
  const paragraphs = bodyLines.join('\n').split(/\n\s*\n/);
  for (const para of paragraphs) {
    if (/^\s*#/.test(para)) continue; // 見出しは抜粋にしない
    const cleaned = stripMarkdown(para.replace(/^-{3,}\s*$/m, ''));
    if (cleaned.length > 0) {
      return cleaned.length > 140 ? cleaned.slice(0, 140) + '…' : cleaned;
    }
  }
  return '';
}

const posts = [];
for (const file of fs.readdirSync(POSTS_DIR)) {
  if (!file.endsWith('.md') || SKIP_FILES.has(file)) continue;
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const lines = raw.split('\n');
  const title = (lines[0] || '').trim().replace(/^#\s*/, '');
  const dateISO = parseDate(lines[1] || '');
  if (!title || !dateISO) {
    console.warn(`SKIP ${file}: タイトルまたは日付 (Month-D-YYYY) を解析できません`);
    continue;
  }
  posts.push({
    url: `posts/${file}`,
    title,
    dateISO,
    excerpt: extractExcerpt(lines.slice(2)),
    image: firstImage(raw),
    highlighted: raw.includes('<!-- highlight -->')
  });
}

posts.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2) + '\n');
console.log(`OK: ${posts.length} posts -> ${path.relative(process.cwd(), OUTPUT)}`);
