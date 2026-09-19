import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { brand } from '@/config/brand';
import { copy } from '@/content/site';
import { siteRoutes } from '@/content/routes';
export const runtime='nodejs';
export const dynamic='force-static';
export const dynamicParams=false;
export const generateStaticParams=()=>siteRoutes.map(route=>({slug:route.slug}));
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const route=siteRoutes.find(item=>item.slug===slug);if(!route)return new Response('Not found',{status:404});
 const [display,mono]=await Promise.all([readFile(join(process.cwd(),'src/app/fonts/og-display.woff')),readFile(join(process.cwd(),'src/app/fonts/og-mono.woff'))]);
 // Exact locked Clinical Paper tokens; ImageResponse cannot resolve the site CSS variables.
 return new ImageResponse(<div style={{display:'flex',background:'#F4F5F3',color:'#101314',width:'100%',height:'100%',padding:40}}><div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',border:'1px solid #DDE2E0',padding:48}}><div style={{fontFamily:'Display',fontSize:40}}>{brand.tradingName}</div><div style={{fontFamily:'Display',fontSize:72,maxWidth:950,lineHeight:1.05}}>{route.name}</div><div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #DDE2E0',paddingTop:24,fontFamily:'Mono',fontSize:14,color:'#4E565A'}}><span>{copy.location}</span><span>{copy.pending}</span></div></div></div>,{width:1200,height:630,fonts:[{name:'Display',data:display,weight:400,style:'normal'},{name:'Mono',data:mono,weight:400,style:'normal'}]});
}
