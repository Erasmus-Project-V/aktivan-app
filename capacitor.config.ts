import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "eu.greenstem.aktivan",
  appName: "aktiVan",
  webDir: "build",
  android: {
    useLegacyBridge: true,
  },
};

export default config;
