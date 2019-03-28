import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: '/Users/eivenlour/Desktop/one/walk-and-talk/walkandtalk/android/app/build/outputs/apk/debug/app-debug.apk', // insert you absolute path here
  automationName: 'UiAutomator2'
};

const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(2000); // wait for app to load
})

test('login screen renders', async () => {
  expect(await driver.hasElementByAccessibilityId('login')).toBe(true);

});

test('form renders', async () => {
  expect(await driver.hasElementByAccessibilityId('form')).toBe(true);

});




