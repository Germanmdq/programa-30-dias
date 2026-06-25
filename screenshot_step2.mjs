import puppeteer from 'puppeteer';

const artifactDir = '/Users/germangonzalez/.gemini/antigravity/brain/5b53af55-8864-4bf9-962d-3e60def7dc6c';

async function capture() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  
  // Create page
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/formulario', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1000));
  
  // Fill Step 1
  console.log('Filling Step 1...');
  await page.type('input[placeholder="Ej. Juan Pérez"]', 'Germán Gonzalez');
  await page.type('input[placeholder="Ej. juan@correo.com"]', 'germangonzalezmdq@gmail.com');
  
  // Type phone into the international phone input
  await page.type('input[type="tel"]', '2236151152');
  
  const textareas1 = await page.$$('textarea');
  if (textareas1.length > 0) {
    await textareas1[0].type('Soy una persona buscando crecer y cambiar en todas las áreas de mi vida.');
  }
  
  // Click Continuar
  console.log('Clicking "Continuar"...');
  const buttons = await page.$$('button');
  let continuarBtn = null;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Continuar')) {
      continuarBtn = btn;
      break;
    }
  }
  
  if (continuarBtn) {
    await continuarBtn.click();
    console.log('Waiting for Step 2 to animate...');
    await new Promise(r => setTimeout(r, 1200));
    
    // Fill the required Step 2 field (the first textarea on Step 2)
    const textareas2 = await page.$$('textarea');
    if (textareas2.length > 0) {
      await textareas2[0].type('Me gustaría ser alguien con absoluta confianza, paz mental y seguridad en mis capacidades.');
    }
    
    // Choose some times to trigger the converted display
    console.log('Selecting some meeting times...');
    const timeInputs = await page.$$('input[type="time"]');
    if (timeInputs.length >= 4) {
      await timeInputs[0].type('0830'); // 08:30
      await timeInputs[1].type('1300'); // 13:00
      await timeInputs[2].type('1800'); // 18:00
      await timeInputs[3].type('2200'); // 22:00
    }
    
    await new Promise(r => setTimeout(r, 500));
    
    // Screenshot Desktop Step 2
    await page.screenshot({ path: `${artifactDir}/screenshot_formulario_desktop.png` });
    console.log('✅ Captured desktop step 2 screenshot.');
    
    // Change to Mobile Viewport
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `${artifactDir}/screenshot_formulario_mobile.png` });
    console.log('✅ Captured mobile step 2 screenshot.');
  } else {
    console.error('Could not find Continuar button!');
  }
  
  await browser.close();
}

capture();
