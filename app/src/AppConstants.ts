import 'dotenv/config';          // ES module style
// or: require('dotenv').config();    // CommonJS

export const AppConstants = {
  APP_ID: process.env.APP_ID,
  REGION: process.env.REGION,
  AUTH_KEY: process.env.AUTH_KEY,
};