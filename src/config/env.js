import {
  SENTRY_DSN,
  POSTHOG_KEY,
  POSTHOG_HOST,
  APP_ENV,
  BASE_URL_DEV,
  BASE_URL_ANDROID_EMULATOR,
  BASE_URL_PROD_ONRENDER,
  BASE_URL_PROD_RAILWAY,
} from '@env';

const getBaseURL = () => {
  if (APP_ENV === 'production-onrender') return BASE_URL_PROD_ONRENDER;
  if (APP_ENV === 'production-railway') return BASE_URL_PROD_RAILWAY;
  if (APP_ENV === 'android-emulator') return BASE_URL_ANDROID_EMULATOR;

  return BASE_URL_DEV;
};

export const ENV = {
  SENTRY_DSN,
  POSTHOG_KEY,
  POSTHOG_HOST: POSTHOG_HOST ?? 'https://us.i.posthog.com',
  APP_ENV: APP_ENV ?? 'development',
  IS_DEV: APP_ENV === 'development',
  BASE_URL: getBaseURL(),
};
