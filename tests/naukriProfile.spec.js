// tests/naukriProfile.spec.js
import { test } from '@playwright/test';
import { NaukriProfilePage } from '../pages/NaukriProfilePage.js';
import { creds } from '../utils/config.js'; // ✅ corrected import

test.describe('Naukri Resume Automation', () => {

  test.setTimeout(60000); // 1-minute timeout

  test('Refresh Naukri profile automatically', async ({ page }) => {
    const naukri = new NaukriProfilePage(page);

    // ✅ use creds.username and creds.password
    const username = creds.username;
    const password = creds.password;

    await naukri.login(username, password);

    if (naukri.closePopups) {
      await naukri.closePopups();
    }

    await naukri.uploadResume();
  });
});
