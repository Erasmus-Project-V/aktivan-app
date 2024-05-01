import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.optimuseprime.cap',
  appName: 'capacitor-distance-test',
  webDir: 'build',
  android: {
    useLegacyBridge: true,
  },
};

export default config;
