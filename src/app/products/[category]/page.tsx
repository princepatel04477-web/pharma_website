import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldAlert } from "lucide-react";
import { getCategories, getCategory, getServices } from "@/content";
import { copy } from "@/content/site";
import { PageHeader, Checklist, CategoryIcon, Label } from "@/components/ui";
import { GradualBlur } from "@/components/reactbits/basic";
import { StructuredData } from "@/components/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { brand } from "@/config/brand";
type Props = { params: Promise<{ category: string }> };
export const dynamicParams = false;
export const generateStaticParams = () =>
  getCategories().map((c) => ({ category: c.slug }));
export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  return category
    ? pageMetadata(category.name, category.scope, `/products/${slug}`)
    : {};
}
export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categories = getCategories();
  const index = categories.findIndex((c) => c.slug === slug);
  const previous =
    categories[(index - 1 + categories.length) % categories.length];
  const next = categories[(index + 1) % categories.length];
  return (
    <main>
      <StructuredData
        data={{
          "@type": "ItemList",
          name: category.name,
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: category.name,
              description: copy.indicative,
            },
          ],
        }}
      />
      <StructuredData
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: copy.categoriesLabel,
              item: `${brand.siteUrl}/products`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `${brand.siteUrl}/products/${slug}`,
            },
          ],
        }}
      />
      <div className="container breadcrumb meta">
        <Link href="/products">{copy.categoriesLabel}</Link>
        <span aria-hidden="true">/</span>
        <span>{category.name}</span>
      </div>
      <PageHeader
        label={copy.categoryLabel}
        title={category.name}
        intro={category.scope}
      >
        {category.rxClassified && (
          <div className="rx-notice">
            <ShieldAlert size={24} strokeWidth={1.5} />
            <div>
              <strong>{copy.rxNotice}</strong>
              <p>{copy.disclaimer}</p>
            </div>
          </div>
        )}
      </PageHeader>
      <section className="section border-t border-rule">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.supply}</Label>
            <CategoryIcon name={category.icon} />
          </div>
          <div>
            <p className="text-lg">{category.description}</p>
            <div className="country-chips mt-8">
              {category.subGroups.map((group) => (
                <span key={group}>{group}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Label>{copy.representative}</Label>
          <h2 className="display section-title">{copy.representative}</h2>
          <p className="meta my-8">{copy.indicative}</p>
          {category.representativeMolecules.length > 0 ? (
            <GradualBlur>
              <table className="molecule-table">
                <thead>
                  <tr>
                    <th scope="col">{copy.molecule}</th>
                    <th scope="col">{copy.strengths}</th>
                    <th scope="col">{copy.forms}</th>
                    <th scope="col">{copy.categoryLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {category.representativeMolecules.map((molecule) => (
                    <tr key={molecule.name}>
                      <th scope="row">{molecule.name}</th>
                      <td>{molecule.strengths.join(" / ")}</td>
                      <td>{molecule.forms.join(", ")}</td>
                      <td>{category.shortName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GradualBlur>
          ) : (
            <p className="notice-panel">{copy.nonMolecule}</p>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.packaging}</Label>
            <h2 className="display section-title">{copy.packaging}</h2>
          </div>
          <dl className="spec-list">
            <div>
              <dt>{copy.forms}</dt>
              <dd>{category.dosageForms.join(", ")}</dd>
            </div>
            <div>
              <dt>{copy.packaging}</dt>
              <dd>{category.packagingOptions.join("; ")}</dd>
            </div>
            {category.specifications.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.documentation}</Label>
            <h2 className="display section-title">{copy.documentation}</h2>
          </div>
          <Checklist items={category.documentationProvided} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Label>{copy.related}</Label>
          <div className="related-grid">
            {getServices()
              .filter((s) => category.relatedServices.includes(s.slug))
              .map((service) => (
                <Link
                  href={`/services#${service.slug}`}
                  className="related-card"
                  key={service.slug}
                >
                  <CategoryIcon name={service.icon} />
                  <h2>{service.name}</h2>
                  <p>{service.summary}</p>
                  <ArrowUpRight size={20} />
                </Link>
              ))}
          </div>
          <div className="category-enquiry">
            <div>
              <span className="meta">{copy.categoryEnquiry}</span>
              <h2 className="display">{category.name}</h2>
              <p>{copy.categoryEnquiryNote}</p>
            </div>
            <Link
              className="button primary"
              href={`/contact?category=${category.slug}`}
            >
              {copy.categoryEnquiry}
              <ArrowUpRight size={20} />
            </Link>
          </div>
          <nav
            className="category-neighbours"
            aria-label={copy.categoriesLabel}
          >
            {previous && (
              <Link href={`/products/${previous.slug}`}>
                <ArrowLeft size={20} />
                <span>
                  <span className="meta">{copy.previous}</span>
                  {previous.name}
                </span>
              </Link>
            )}
            {next && (
              <Link href={`/products/${next.slug}`}>
                <span>
                  <span className="meta">{copy.next}</span>
                  {next.name}
                </span>
                <ArrowRight size={20} />
              </Link>
            )}
          </nav>
        </div>
      </section>
    </main>
  );
}
