import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices, getCategory } from "@/content";
import { copy, engagementModels } from "@/content/site";
import {
  PageHeader,
  Label,
  ClosingCTA,
  Checklist,
  CategoryIcon,
} from "@/components/ui";
import { Reveal } from "@/components/motion";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata("Services", copy.servicesPageIntro, "/services");
export default function Services() {
  return (
    <main>
      <PageHeader
        label={copy.servicesLabel}
        title={copy.servicesPageTitle}
        intro={copy.servicesPageIntro}
      />
      {getServices().map((service, i) => (
        <section
          className={`section service-detail service-detail-${i % 2}`}
          id={service.slug}
          key={service.slug}
        >
          <div className="container editorial-grid">
            <Reveal>
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <CategoryIcon name={service.icon} />
              <h2 className="display section-title mt-6">{service.name}</h2>
              <p className="section-description">{service.detail}</p>
              <Link
                href={`/products/${service.category}`}
                className="text-link"
              >
                {getCategory(service.category)?.name}
                <ArrowUpRight size={20} />
              </Link>
            </Reveal>
            <div className="service-deliverables">
              <span className="meta">{copy.deliverables}</span>
              <Checklist items={service.deliverables} />
            </div>
          </div>
        </section>
      ))}
      <section className="section">
        <div className="container">
          <Label>{copy.engagementTitle}</Label>
          <h2 className="display section-title mb-14">
            {copy.engagementTitle}
          </h2>
          <div className="three-grid">
            {engagementModels.map((model) => (
              <article className="editorial-card" key={model.name}>
                <h3>{model.name}</h3>
                <p>{model.fit}</p>
                <ul className="engagement-meta">
                  {[model.moq, model.lead, model.scope].map((line) => (
                    <li className="meta" key={line}>
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
