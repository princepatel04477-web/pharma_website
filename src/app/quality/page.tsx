import Link from "next/link";
import { ArrowUpRight, FileCheck2, ShieldCheck } from "lucide-react";
import { getCertifications } from "@/content";
import {
  copy,
  qualityPillars,
  documentPack,
  facilityStandards,
} from "@/content/site";
import { brand, isVerified } from "@/config/brand";
import { PageHeader, Label, ClosingCTA } from "@/components/ui";
import { Lanyard } from "@/components/reactbits/lanyard";
import { Masonry, AnimatedContent } from "@/components/reactbits/basic";
import { Wordmark } from "@/components/shell";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata("Quality & compliance", copy.qualityIntro, "/quality");
export default function Quality() {
  return (
    <main>
      <PageHeader
        label={copy.credentials}
        title={copy.qualityTitle}
        intro={copy.qualityIntro}
      >
        <p className="quality-disclaimer">{copy.disclaimer}</p>
      </PageHeader>
      <section className="section border-t border-rule">
        <div className="container">
          <Label>{copy.credentials}</Label>
          <div className="credential-grid">
            {getCertifications().map((cert) => (
              <article className="credential-card" key={cert.code}>
                <div className="credential-top">
                  <span className="meta">{cert.code}</span>
                  <FileCheck2 size={24} strokeWidth={1.5} />
                </div>
                <h2>{cert.name}</h2>
                <p className="credential-authority">{cert.issuingBody}</p>
                <p>{cert.scope}</p>
                <div className="credential-value">
                  <span className="meta">{copy.pending}</span>
                  <code>{brand.registrations[cert.valueKey]}</code>
                </div>
                {cert.documentUrl &&
                  isVerified(brand.registrations[cert.valueKey]) && (
                    <a href={cert.documentUrl} className="text-link">
                      {cert.name}
                      <ArrowUpRight size={20} />
                    </a>
                  )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.licenceTitle}</Label>
            <h2 className="display section-title">{copy.licenceDescription}</h2>
            <p className="section-description">{copy.qualityIntro}</p>
          </div>
          <Lanyard>
            <Wordmark />
            <div className="licence-content">
              <span className="meta">{copy.pending}</span>
              <h3>{copy.licenceTitle}</h3>
              <code>{brand.registrations.cdscoLicence}</code>
              <dl className="spec-list">
                <div>
                  <dt>{copy.authority}</dt>
                  <dd>{brand.licenceAuthority}</dd>
                </div>
                <div>
                  <dt>{copy.validity}</dt>
                  <dd>{brand.licenceValidity ?? copy.unconfirmed}</dd>
                </div>
              </dl>
            </div>
          </Lanyard>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Label>{copy.qualitySystem}</Label>
          <h2 className="display section-title mb-14">{copy.qualitySystem}</h2>
          <div className="quality-pillars">
            {qualityPillars.map((pillar, i) => (
              <AnimatedContent key={pillar.name} delay={(i % 2) * 0.06}>
                <article>
                  <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                  <ShieldCheck size={24} strokeWidth={1.5} />
                  <h3>{pillar.name}</h3>
                  <p>{pillar.detail}</p>
                </article>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Label>{copy.documentPack}</Label>
          <div className="document-list">
            {documentPack.map((doc, i) => (
              <div key={doc}>
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <span>{doc}</span>
                <FileCheck2 size={20} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Label>{copy.facilityStandards}</Label>
          <h2 className="display section-title mb-14">
            {copy.facilityStandards}
          </h2>
          {/* Replace these evidence-review cards with authorised facility photography only when real assets and descriptions are supplied. */}
          <Masonry>
            {facilityStandards.map((standard, i) => (
              <article
                className={`standard-card standard-${i % 3}`}
                key={standard.name}
              >
                <span className="meta">
                  {String(i + 1).padStart(2, "0")} / {copy.pending}
                </span>
                <h3 className="display">{standard.name}</h3>
                <p>{standard.detail}</p>
              </article>
            ))}
          </Masonry>
          <div className="recall-block">
            <ShieldCheck size={24} strokeWidth={1.5} />
            <h2 className="display">{copy.recallTitle}</h2>
            <p>{copy.recallDescription}</p>
            <Link href="/contact" className="text-link">
              {copy.contactForm}
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
