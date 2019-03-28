// Front end test for AuthScreen.js
// Working for Android only for now

import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: 'android/app/build/outputs/apk/debug/app-debug.apk', // insert you absolute path here
  automationName: 'UiAutomator2',
  noReset: true
};

const driver = wd.promiseChainRemote('localhost', PORT);

describe('ViewEventScreen', () => {

  beforeAll(async () => {
    try {
      await driver.init(config);
      await driver.setImplicitWaitTimeout(5000); // wait for app to load
    } catch(err) {
      console.log(err);
    }
  });


  // Buttons/Links
  test('View Event Back button', async () => {
    expect(await driver.hasElementByAccessibilityId('viewEventBackButton')).toBe(true);
    await driver.elementByAccessibilityId('viewEventBackButton')
      .click()
  });

});

