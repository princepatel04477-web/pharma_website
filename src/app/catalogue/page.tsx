import { FileText } from 'lucide-react';
import { copy,documentPack } from '@/content/site';
import { PageHeader,Checklist } from '@/components/ui';
import { EnquiryForm } from '@/components/forms/enquiry-form';
import { pageMetadata } from '@/lib/metadata';
export const generateMetadata=()=>pageMetadata('Product catalogue',copy.catalogueIntro,'/catalogue');
export default function Catalogue(){return <main><PageHeader label={copy.catalogueContents} title={copy.catalogueTitle} intro={copy.catalogueIntro}/><section className="section border-t border-rule"><div className="container form-layout"><aside><FileText size={24} strokeWidth={1.5}/><h2 className="display section-title mt-8">{copy.catalogueContents}</h2><Checklist items={[copy.categoriesLabel,copy.representative,copy.packaging,copy.documentation,...documentPack.slice(0,2)]}/><p className="section-description">{copy.cataloguePricing}</p><p className="meta">{copy.revision}</p><p className="notice-panel mt-8">{copy.catalogueUnavailable}</p></aside><div className="form-panel"><h2 className="form-title">{copy.catalogueForm}</h2><EnquiryForm type="catalogue"/></div></div></section></main>;}
