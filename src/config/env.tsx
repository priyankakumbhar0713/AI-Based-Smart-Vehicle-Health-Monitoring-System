import Constants from 'expo-constants';

const manifest = Constants.expoConfig ?? (Constants.manifest as any) ?? {};

export type AppEnv = {
  API_URL: string;
  EXPO_PUBLIC_API_URL?: string;
  FIREBASE_API_KEY?: string;
  FIREBASE_PROJECT_ID?: string;
};

export const Env: AppEnv = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? (manifest.extra?.apiUrl ?? 'https://api.example.com'),
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL ?? manifest.extra?.apiUrl,
  FIREBASE_API_KEY: process.env.EXPO_FIREBASE_API_KEY ?? manifest.extra?.firebaseApiKey,
  FIREBASE_PROJECT_ID: process.env.EXPO_FIREBASE_PROJECT_ID ?? manifest.extra?.firebaseProjectId,
};

export function getEnv<K extends keyof AppEnv>(key: K): AppEnv[K] {
  return Env[key];
}

export default Env;
