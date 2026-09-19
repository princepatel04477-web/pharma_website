import Link from 'next/link';
import { ArrowUpRight, Pill, Package, Cross, Leaf, Microscope, Droplets, FileCheck2, Building2, Truck, Thermometer, ShieldCheck, Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { copy } from '@/content/site';
import { navigation } from '@/content/navigation';
export function CategoryIcon({name,size=24}:{name:string;size?:20|24}){const icons:Record<string,typeof Pill>={capsule:Pill,box:Package,cross:Cross,leaf:Leaf,surgical:Microscope,bottle:Droplets,file:FileCheck2,building:Building2,truck:Truck,thermometer:Thermometer,shield:ShieldCheck};const Icon=icons[name]??Package;return <Icon size={size} strokeWidth={1.5} aria-hidden="true"/>;}
export function Label({children}:{children:ReactNode}){return <div className="section-label meta"><span>{children}</span><span aria-hidden="true"/></div>;}
export function PageHeader({label,title,intro,children}:{label:string;title:string;intro:string;children?:ReactNode}){return <header className="page-header container"><Label>{label}</Label><h1 className="display">{title}</h1><p>{intro}</p>{children}</header>;}
export function Checklist({items}:{items:string[]}){return <ul className="checklist">{items.map(item=><li key={item}><Check size={20} strokeWidth={1.5}/><span>{item}</span></li>)}</ul>;}
export function ClosingCTA({dark=false}:{dark?:boolean}){return <section className={`closing-cta ${dark?'dark':''}`}><div className="container"><span className="meta">{copy.closingLabel}</span><h2 className="display">{copy.closingTitle}</h2><p>{copy.closingDescription}</p><div className="cta-actions"><Link href="/trade-account" className="button primary">{copy.trade}<ArrowUpRight size={20}/></Link><Link href="/catalogue" className="button">{copy.catalogue}<ArrowUpRight size={20}/></Link></div><p className="meta">{navigation.labels.disclaimer}</p></div></section>;}
