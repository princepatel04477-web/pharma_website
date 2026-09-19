import type { MetadataRoute } from 'next';
import { brand } from '@/config/brand';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/dev/','/api/']},sitemap:new URL('/sitemap.xml',brand.siteUrl).toString()};}
