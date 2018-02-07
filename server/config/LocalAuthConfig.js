const config = {
  secret: process.env.LOCAL_AUTH_SECRET,
  refreshSecret: process.env.LOCAL_AUTH_REFRESH_SECRET,
  expireTime: process.env.LOCAL_AUTH_EXPIRE_TIME,
  refreshExpireTime: process.env.LOCAL_AUTH_REFRESH_EXPIRE_TIME,
}

export default config;
