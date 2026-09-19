import { getCategories } from '@/content';
import { legalPages } from '@/content/site';
export const siteRoutes=[
 {path:'/',slug:'home',name:'Pharmaceutical sourcing',description:'An evidence-led pharmaceutical sourcing preview for professional importers, distributors and institutional procurement teams.'},
 {path:'/about',slug:'about',name:'About',description:'The proposed Surat-based sourcing model, documentation approach and company facts awaiting verification.'},
 {path:'/products',slug:'products',name:'Product lines',description:'Explore six pharmaceutical and healthcare sourcing categories. Availability and destination eligibility require confirmation.'},
 {path:'/services',slug:'services',name:'Services',description:'Six areas of discussion: dossier planning, manufacturing briefs, institutional procurement, logistics and quality review.'},
 {path:'/quality',slug:'quality',name:'Quality & compliance',description:'Review the evidence required for pharmaceutical procurement. Credential values remain explicitly unverified in this preview.'},
 {path:'/markets',slug:'markets',name:'Markets',description:'Explore destination-specific enquiry groups across Africa, Central Asia, South and Southeast Asia, and Latin America.'},
 {path:'/catalogue',slug:'catalogue',name:'Product catalogue',description:'Prepare a catalogue enquiry with your business details and product interests. The verified catalogue is awaiting completion.'},
 {path:'/trade-account',slug:'trade-account',name:'Trade account',description:'Prepare a business procurement application with company, regulatory and trade-profile details. Account approval is subject to review.'},
 {path:'/contact',slug:'contact',name:'Contact',description:'Describe your product requirements, quantity and destination to prepare a pharmaceutical sourcing enquiry.'},
 ...getCategories().map(c=>({path:`/products/${c.slug}`,slug:c.slug,name:c.name,description:c.scope})),
 ...legalPages.map(p=>({path:`/${p.slug}`,slug:p.slug,name:p.name,description:`${p.name} for this non-launch preview. Entity-specific policy approval is required before commercial use.`})),
];
