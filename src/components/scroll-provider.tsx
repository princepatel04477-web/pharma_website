'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
export function ScrollProvider(){useEffect(()=>{const query=window.matchMedia('(min-width:1024px) and (prefers-reduced-motion:no-preference)');let lenis:Lenis|undefined;const update=()=>{lenis?.destroy();lenis=undefined;if(query.matches)lenis=new Lenis({lerp:0.09,autoRaf:true,anchors:true});};update();query.addEventListener('change',update);return ()=>{lenis?.destroy();query.removeEventListener('change',update);};},[]);return <span hidden aria-hidden="true"/>;}
