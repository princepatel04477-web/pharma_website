import { getMarkets } from "@/content";
import { copy } from "@/content/site";
import { PageHeader, Label, ClosingCTA } from "@/components/ui";
import { RegionNav } from "@/components/region-nav";
import { Reveal } from "@/components/motion";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata("Markets", copy.marketsPageIntro, "/markets");
export default function Markets() {
  const markets = getMarkets();
  return (
    <main>
      <PageHeader
        label={copy.marketsLabel}
        title={copy.marketsPageTitle}
        intro={copy.marketsPageIntro}
      >
        <div className="page-stats meta">
          <span>
            {markets.length} {copy.regionsLabel}
          </span>
          <span>
            {markets.reduce((sum, m) => sum + m.countries.length, 0)}{" "}
            {copy.countries}
          </span>
          <span>{copy.marketsNote}</span>
        </div>
      </PageHeader>
      <div className="container region-nav-host">
        <RegionNav
          items={markets.map(({ slug, region }) => ({ slug, region }))}
        />
      </div>
      {markets.map((market, i) => (
        <section className="section" id={market.slug} key={market.slug}>
          <div className="container editorial-grid">
            <Reveal>
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <h2 className="display section-title">{market.region}</h2>
              <p className="section-description">
                {market.registrationSupport}
              </p>
              <p className="meta">{market.notes}</p>
            </Reveal>
            <div className="market-country-grid">
              {market.countries.map((country) => (
                <div key={country.iso2}>
                  <span className="meta">{country.iso2}</span>
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="section">
        <div className="container editorial-grid">
          <Label>{copy.registrationTitle}</Label>
          <div>
            <h2 className="display section-title">{copy.registrationTitle}</h2>
            <p className="section-description">{copy.registrationText}</p>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
