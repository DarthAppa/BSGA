// Exporte le logo SVG en PNG transparents (fond transparent et fond sombre) pour Krita et les réseaux.
// Usage : node tools/exporter-logo.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const svg = readFileSync('design/logo/logo-bsga.svg', 'utf8');
const navigateur = await chromium.launch();
const page = await navigateur.newPage({ viewport: { width: 1760, height: 600 } });
for (const [nom, fond] of [
    ['logo-bsga-transparent.png', 'transparent'],
    ['logo-bsga-fond-noir.png', '#0E0D0C'],
]) {
    await page.setContent(
        `<body style="margin:0;background:${fond}"><div style="width:1760px;height:600px">${svg.replace('width="440" height="150"', 'width="1760" height="600"')}</div></body>`,
    );
    await page.screenshot({ path: `design/logo/${nom}`, omitBackground: fond === 'transparent' });
    console.log(`design/logo/${nom}`);
}
await navigateur.close();
