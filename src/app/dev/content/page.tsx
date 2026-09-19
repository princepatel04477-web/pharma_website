import { getCategories,getServices,getCertifications,getMarkets,getFAQs } from '@/content';
import { copy } from '@/content/site';
export const metadata={title:'Content review',robots:{index:false,follow:false}};
export default function ContentReview(){return <main className="container py-16"><h1 className="display text-5xl">{copy.preview}</h1><pre className="mt-12 whitespace-pre-wrap break-words text-sm">{JSON.stringify({categories:getCategories(),services:getServices(),certifications:getCertifications(),markets:getMarkets(),faqs:getFAQs()},null,2)}</pre></main>;}
