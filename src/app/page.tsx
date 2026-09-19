import { pageMetadata } from '@/lib/metadata';
import { siteRoutes } from '@/content/routes';
import { FAQSchema } from '@/components/site-schema';
import { getFAQs } from '@/content';
import { Hero } from '@/components/hero';
import { HomeBody } from '@/components/home-body';
export const generateMetadata=()=>pageMetadata(siteRoutes[0]?.name??'',siteRoutes[0]?.description??'','/');
export default function Home(){return <main><FAQSchema items={getFAQs().slice(0,6)}/><Hero/><HomeBody/></main>;}
