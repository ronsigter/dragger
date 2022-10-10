/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KEYCLOAK_URL: process.env.KEYCLOAK_URL,
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_USERNAME: process.env.KEYCLOAK_USERNAME,
    KEYCLOAK_PASSWORD: process.env.KEYCLOAK_PASSWORD
  }
}

module.exports = nextConfig
