import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "eu.greenstem.aktivan",
  appName: "aktiVan",
  webDir: "build",
  android: {
    useLegacyBridge: true,
  },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
