export const APP_NAME = 'AUTOCREA';
export const APP_VERSION = '2.0.0';
export const API_VERSION = 'v1';

export const TOKEN_CONVERSION = {
  WORDS_TO_TOKENS_EN: 0.75,
  WORDS_TO_TOKENS_ES: 0.6,
  CHARS_PER_TOKEN: 4,
} as const;

export const GENERATION_LIMITS = {
  MAX_PROMPT_LENGTH: 5000,
  MAX_CODE_LENGTH: 50000,
  MAX_FILES_PER_PROJECT: 100,
  MAX_FILE_SIZE: 1024 * 1024,
  GENERATION_TIMEOUT: 120000,
} as const;

export const RATE_LIMITS = {
  FREE_TIER: {
    requests: 10,
    window: 60 * 60 * 1000,
  },
  CREATOR_TIER: {
    requests: 50,
    window: 60 * 60 * 1000,
  },
  PRO_TIER: {
    requests: 200,
    window: 60 * 60 * 1000,
  },
  BUSINESS_TIER: {
    requests: 1000,
    window: 60 * 60 * 1000,
  },
} as const;

export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  TOKEN_LIMIT_50: 'token_limit_50',
  TOKEN_LIMIT_80: 'token_limit_80',
  TOKEN_LIMIT_100: 'token_limit_100',
  UPGRADE_PROMPT: 'upgrade_prompt',
  SUBSCRIPTION_CONFIRMED: 'subscription_confirmed',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
} as const;

export const ONBOARDING_DAYS = [1, 2, 3, 5, 7] as const;
