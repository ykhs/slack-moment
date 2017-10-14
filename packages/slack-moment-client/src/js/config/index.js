const env = process.env.NODE_ENV || 'development';

const defaults = {
  env: env,
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  }
};

export default defaults;
