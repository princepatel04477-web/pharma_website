import { copy, suratPoints } from "@/content/site";
import { brand } from "@/config/brand";
import { PageHeader, Label, ClosingCTA } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata("About", copy.aboutIntro, "/about");
export default function About() {
  return (
    <main>
      <PageHeader
        label={brand.tradingName}
        title={copy.aboutTitle}
        intro={copy.aboutIntro}
      />
      <section className="section border-t border-rule">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.positioningLabel}</Label>
            <h2 className="display section-title">{copy.operatingTitle}</h2>
          </div>
          <Reveal>
            <div className="editorial-copy">
              <p className="lead">{copy.operating1}</p>
              <p>{copy.operating2}</p>
              <p>{copy.operating3}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Label>{copy.location}</Label>
          <h2 className="display section-title mb-14">{copy.suratTitle}</h2>
          <div className="three-grid">
            {suratPoints.map((point, i) => (
              <article className="editorial-card" key={point.name}>
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <h3>{point.name}</h3>
                <p>{point.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.historyTitle}</Label>
            <h2 className="display section-title">{copy.historyTitle}</h2>
          </div>
          <p className="notice-panel">{copy.historyNote}</p>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.leadershipTitle}</Label>
            <h2 className="display section-title">{copy.leadershipTitle}</h2>
          </div>
          <p className="notice-panel">{copy.leadershipNote}</p>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
