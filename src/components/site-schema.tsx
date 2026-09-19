import { StructuredData } from './structured-data';
import { brand,isVerified } from '@/config/brand';
import type { FAQ } from '@/content/types';
export function SiteSchema(){return <><StructuredData data={{'@type':'Organization','@id':`${brand.siteUrl}/#organization`,name:brand.tradingName,url:brand.siteUrl,...(isVerified(brand.legalName)?{legalName:brand.legalName}:{}),address:{'@type':'PostalAddress',addressLocality:brand.hq.city,addressRegion:brand.hq.state,addressCountry:'IN'},...(brand.foundedYear?{foundingDate:String(brand.foundedYear)}:{})}}/><StructuredData data={{'@type':'WebSite',name:brand.tradingName,url:brand.siteUrl}}/></>;}
export function FAQSchema({items}:{items:FAQ[]}){return <StructuredData data={{'@type':'FAQPage',mainEntity:items.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))}}/>;}
