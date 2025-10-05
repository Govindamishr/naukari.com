import path from 'path';
import { test } from '@playwright/test';
import { NaukriProfilePage } from '../pages/NaukriProfilePage.js';

test('Update Naukri resume automatically', async ({ page }) => {
  const profile = new NaukriProfilePage(page);

  // Resolve resume path from project folder
  const resumePath = path.resolve('E:\\naukari.com\\resume\\TestResume(4).pdf');

  // Login first
  await profile.login(process.env.NAUKRI_USER, process.env.NAUKRI_PASS);

  // Update resume
  await profile.updateResume(resumePath);
});
