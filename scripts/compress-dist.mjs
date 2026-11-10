// 빌드 결과(dist)의 이미지만 다시 압축한다. 원본 이미지 파일은 건드리지 않는다.
// 배포 용량을 줄여 GitHub Pages 배포가 시간 초과로 실패하지 않게 하고, 페이지도 더 빨리 뜬다.
// - JPG: mozjpeg 품질 85 (눈으로 차이가 거의 없는 수준)
// - PNG: 무손실 재압축 (화질 변화 없음)
// 다시 압축한 결과가 더 크면 원래 파일을 그대로 둔다.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const JPEG_QUALITY = 85;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const encoders = {
  '.jpg': (image) => image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }),
  '.jpeg': (image) => image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }),
  '.png': (image) => image.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }),
};

let before = 0;
let after = 0;
const files = [];
for await (const path of walk(decodeURIComponent(DIST))) {
  if (encoders[extname(path).toLowerCase()]) files.push(path);
}

// 동시에 몇 개씩만 처리
const CONCURRENCY = 4;
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (next < files.length) {
    const path = files[next++];
    const input = await readFile(path);
    const output = await encoders[extname(path).toLowerCase()](sharp(input)).toBuffer();
    before += input.length;
    if (output.length < input.length) {
      await writeFile(path, output);
      after += output.length;
    } else {
      after += input.length;
    }
  }
}));

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(`images: ${files.length} files, ${mb(before)}MB -> ${mb(after)}MB`);
