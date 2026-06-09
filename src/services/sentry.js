import * as Sentry from '@sentry/react-native';
import { ENV } from '../config/env';

export function initSentry() {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    sendDefaultPii: true,
    enableLogs: true,
    enabled: !ENV.IS_DEV,
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.mobileReplayIntegration({
        maskAllText: true,
        maskAllImages: true,
      }),
    ],
  });
}

export function setSentryUser(user) {
  Sentry.setUser({ id: user._id, email: user.email });
}

export function clearSentryUser() {
  Sentry.setUser(null);
}

export function captureError(error, context = {}) {
  Sentry.captureException(error, { extra: context });
}
