import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 20000 });

// Scroll through the whole page to trigger all whileInView animations
await page.evaluate(async () => {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  for (let y = 0; y <= document.body.scrollHeight; y += 300) {
    window.scrollTo(0, y);
    await delay(80);
  }
  window.scrollTo(0, 0);
  await delay(600);
});

const artifactDir = '/Users/germangonzalez/.gemini/antigravity/brain/5b53af55-8864-4bf9-962d-3e60def7dc6c';

// Hero
await page.screenshot({ path: `${artifactDir}/screenshot_hero.png`, fullPage: false });
console.log('✅ Hero');

// About
await page.evaluate(() => document.getElementById('el-programa')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: `${artifactDir}/screenshot_about.png`, fullPage: false });
console.log('✅ About');

// Featured Video
await page.evaluate(() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: `${artifactDir}/screenshot_video.png`, fullPage: false });
console.log('✅ Featured Video');

// Services
await page.evaluate(() => document.getElementById('preguntas')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: `${artifactDir}/screenshot_services.png`, fullPage: false });
console.log('✅ Services');

// FAQ (scroll past services)
await page.evaluate(() => {
  const el = document.getElementById('preguntas');
  if (el) window.scrollBy(0, el.offsetHeight + 200);
});
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: `${artifactDir}/screenshot_faq.png`, fullPage: false });
console.log('✅ FAQ');

// CTA Final
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1200));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: `${artifactDir}/screenshot_cta.png`, fullPage: false });
console.log('✅ CTA Final');

// Full page
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: `${artifactDir}/screenshot_full.png`, fullPage: true });
console.log('✅ Full page');

await browser.close();
