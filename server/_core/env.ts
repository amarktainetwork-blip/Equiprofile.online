// Feature flags (default to false for plug-and-play deployment)
const enableStripe = process.env.ENABLE_STRIPE === 'true';
const enableUploads = process.env.ENABLE_UPLOADS === 'true';

// Production startup validation
if (process.env.NODE_ENV === 'production') {
  // Core required vars (always needed)
  const coreRequiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'ADMIN_UNLOCK_PASSWORD',
  ];
  
  const missing = coreRequiredVars.filter(v => !process.env[v]);
  
  // Conditionally require Stripe vars if enabled
  if (enableStripe) {
    const stripeVars = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
    missing.push(...stripeVars.filter(v => !process.env[v]));
  }
  
  // Conditionally require upload/storage vars if enabled
  if (enableUploads) {
    const uploadVars = ['BUILT_IN_FORGE_API_URL', 'BUILT_IN_FORGE_API_KEY'];
    missing.push(...uploadVars.filter(v => !process.env[v]));
  }
  
  if (missing.length > 0) {
    console.error(`❌ PRODUCTION ERROR: Missing required environment variables: ${missing.join(', ')}`);
    console.error('Application cannot start. Please configure all required environment variables.');
    console.error(`Feature flags: ENABLE_STRIPE=${enableStripe}, ENABLE_UPLOADS=${enableUploads}`);
    process.exit(1);
  }
  
  // Validate no hardcoded fallbacks in production
  if (process.env.ADMIN_UNLOCK_PASSWORD === 'ashmor12@') {
    console.error('❌ PRODUCTION ERROR: ADMIN_UNLOCK_PASSWORD is still set to default value!');
    console.error('You MUST change this to a secure password before running in production.');
    process.exit(1);
  }
}

export const ENV = {
  // Feature flags
  enableStripe,
  enableUploads,
  
  // App config
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  
  // Admin unlock
  adminUnlockPassword: process.env.ADMIN_UNLOCK_PASSWORD ?? "ashmor12@",
  
  // Security
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  cookieDomain: process.env.COOKIE_DOMAIN ?? undefined,
  cookieSecure: process.env.COOKIE_SECURE === "true",
  
  // Stripe (only used if enableStripe is true)
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  
  // AWS S3 (legacy - kept for backward compatibility)
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  awsRegion: process.env.AWS_REGION ?? "eu-west-2",
  awsS3Bucket: process.env.AWS_S3_BUCKET ?? "",
  
  // OpenAI
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
};
