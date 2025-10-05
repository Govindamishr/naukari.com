import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BasePage } from './BasePage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NaukriProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = '#usernameField';
    this.passwordField = '#passwordField';
    this.loginBtn = 'button[type="submit"]';
    this.updateResumeButton = 'text=Update resume';
    this.fileInputSelector = 'input[type="file"]';
  }

  async login(username, password) {
    await this.open('https://www.naukri.com/nlogin/login');
    await this.type(this.usernameField, username);
    await this.type(this.passwordField, password);
    await this.click(this.loginBtn);
    await this.wait(5);
  }

  async uploadResume() {
    console.log('⏳ Starting resume upload...');

    // 1️⃣ Navigate to Naukri profile page
    await this.open('https://www.naukri.com/mnjuser/profile');
    await this.wait(5);

    // 2️⃣ Get the path to the resume folder
    const resumeDir = path.resolve(__dirname, '../resume');

    // 3️⃣ Find the first .pdf file in that folder
    const files = fs.readdirSync(resumeDir);
    const pdfFile = files.find(file => file.toLowerCase().endsWith('.pdf'));

    if (!pdfFile) {
      throw new Error('❌ No PDF file found inside the resume folder.');
    }

    // 4️⃣ Build the full absolute path
    const resumePath = path.join(resumeDir, pdfFile);
    console.log('📄 Found resume file:', resumePath);

    // 5️⃣ Wait for file input
    const fileInput = await this.page.waitForSelector(this.fileInputSelector, {
      state: 'attached',
      timeout: 15000
    });

    // 6️⃣ Upload the resume
    await fileInput.setInputFiles(resumePath);

    // 7️⃣ Click the Update Resume button
    const updateBtn = await this.page.waitForSelector(this.updateResumeButton, { timeout: 10000 });
    await updateBtn.click();

    // 8️⃣ Wait for completion
    await this.wait(5);
    console.log('✅ Resume uploaded successfully!');
  }
}
