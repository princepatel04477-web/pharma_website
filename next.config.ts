import type { NextConfig } from 'next';
const release=process.env.VERCEL_ENV==='production';
const development=process.env.NODE_ENV==='development';
const nextConfig: NextConfig = {
 poweredByHeader:false,experimental:{cpus:2},allowedDevOrigins:['*.e2b.app'],devIndicators:false,
 distDir:development?'.next-dev':'.next',images:{remotePatterns:[]},
 async headers(){return [{source:'/(.*)',headers:[
 {key:'Strict-Transport-Security',value:'max-age=63072000; includeSubDomains'},
 {key:'X-Content-Type-Options',value:'nosniff'},
 {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
 {key:'X-Robots-Tag',value:'noindex, nofollow'},
 ...(!development?[{key:'Content-Security-Policy',value:`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';${release?" frame-ancestors 'none';":''}`}]:[]),
 ]}];},
};
export default nextConfig;
