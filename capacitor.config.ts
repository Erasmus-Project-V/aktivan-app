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
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabase",
      iosIsEncryption: false,
      androidIsEncryption: false,
    },
    BackgroundRunner: {
      label: "eu.greenstem.aktivan.timer",
      src: "src/lib/runners/timer.ts",
      event: "tick",
      repeat: true,
      interval: 0,
      autoStart: true,
    }
  },
};

export default config;
