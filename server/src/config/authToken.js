import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '../config/env.js';

const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

const isProd = process.env.NODE_ENV === 'production';

// If your frontend is on a different site/domain, you’ll likely need: sameSite: 'none' + secure: true
const sameSite = isProd ? 'lax' : 'lax';

const accessCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite,
  path: '/',
  maxAge: 15 * 60 * 1000, // 15 min
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite,
  // restrict refresh cookie to refresh endpoint only
  path: '/api/auth/refresh',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

const signAccessToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_ACCESS_KEY, { expiresIn: ACCESS_EXPIRES_IN });
};

const signRefreshToken = (userId, jti) => {
  return jwt.sign({ id: userId, jti }, JWT_REFRESH_KEY, { expiresIn: REFRESH_EXPIRES_IN });
};


export const issueTokens = async (user) => {
  const userId = user._id.toString();
  const jti = crypto.randomUUID();

  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId, jti);

  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();

  return { accessToken, refreshToken };
};

export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie('accessToken', accessToken, accessCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
};

export const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', { ...accessCookieOptions, maxAge: undefined });
  res.clearCookie('refreshToken', { ...refreshCookieOptions, maxAge: undefined });
};