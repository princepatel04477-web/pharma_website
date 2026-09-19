import { loadEnvConfig } from '@next/env';
import { readFile } from 'node:fs/promises';
import { filesWithin,inspectRendered,scanSources,type Violation } from './compliance';
loadEnvConfig(process.cwd());
const release=process.env.VERCEL_ENV==='production'||process.argv.includes('--release');
const rendered=process.argv.includes('rendered');
async function main(){let violations:Violation[]=[];
 if(rendered){if(release){const files=(await filesWithin('.next/server/app')).filter(file=>/\.(html|rsc|body)$/.test(file));if(!files.length)throw new Error('No rendered output found; cannot verify production safety.');for(const file of files)violations.push(...inspectRendered(await readFile(file,'utf8'),file));}}
 else{violations=await scanSources(process.cwd(),release);if(release){for(const name of ['RESEND_API_KEY','ENQUIRY_TO_SALES','ENQUIRY_TO_REGULATORY','ENQUIRY_FROM','NEXT_PUBLIC_SITE_URL'])if(!process.env[name]||process.env[name]?.includes('example.invalid'))violations.push({file:'.env / deployment environment',line:1,reason:`Required production value missing: ${name}`});}}
 if(violations.length){for(const violation of violations)console.error(`${violation.file}:${violation.line} — ${violation.reason}`);console.error(`Compliance guard FAILED (${violations.length} findings). No production release is permitted.`);process.exitCode=1;}else process.stdout.write(`Compliance guard: ${rendered?'rendered output':'source'} passed (${release?'production enforcement':'non-launch preview; declared tokens permitted'}).\n`);
}
main().catch(error=>{console.error('Compliance guard could not complete',error);process.exitCode=1;});
