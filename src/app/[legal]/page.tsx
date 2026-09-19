import { notFound } from 'next/navigation';
import { copy,legalPages } from '@/content/site';
import { PageHeader } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
type Props={params:Promise<{legal:string}>};
export const dynamicParams=false;
export const generateStaticParams=()=>legalPages.map(page=>({legal:page.slug}));
export async function generateMetadata({params}:Props){const {legal}=await params;const page=legalPages.find(p=>p.slug===legal);return page?pageMetadata(page.name,copy.legalPreview,`/${legal}`):{};}
export default async function Legal({params}:Props){const {legal}=await params;const page=legalPages.find(p=>p.slug===legal);if(!page)notFound();return <main><PageHeader label={copy.legalPreview} title={page.name} intro={copy.legalNotice}/><div className="container legal-body">{page.sections.map(section=><section key={section.name}><h2 className="display">{section.name}</h2><p>{section.text}</p></section>)}</div></main>;}
