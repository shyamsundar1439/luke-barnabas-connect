
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.88e8f1119bd7477393fdca74580f44ea',
  appName: 'luke-barnabas-connect',
  webDir: 'dist',
  server: {
    url: 'https://88e8f111-9bd7-4773-93fd-ca74580f44ea.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#FFFFFF",
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
