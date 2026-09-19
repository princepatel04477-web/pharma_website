import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { getCategories } from "@/content";
import { copy } from "@/content/site";
import { PageHeader, CategoryIcon } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata(copy.categoriesLabel, copy.productsIntro, "/products");
export default function Products() {
  const categories = getCategories();
  return (
    <main>
      <PageHeader
        label={copy.categoriesLabel}
        title={copy.productsTitle}
        intro={copy.productsIntro}
      >
        <div className="page-stats meta">
          <span>
            {categories.length} {copy.categoriesLabel}
          </span>
          <span>
            {new Set(categories.flatMap((c) => c.dosageForms)).size}{" "}
            {copy.forms}
          </span>
          <span>{copy.enquiryOnly}</span>
        </div>
      </PageHeader>
      <section className="container products-layout">
        <div>
          {categories.map((category, i) => (
            <Link
              href={`/products/${category.slug}`}
              className="category-row"
              key={category.slug}
            >
              <div>
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <CategoryIcon name={category.icon} />
                <h2>{category.name}</h2>
              </div>
              <div>
                <p>{category.scope}</p>
                <div className="country-chips">
                  {category.subGroups.map((group) => (
                    <span key={group}>{group}</span>
                  ))}
                </div>
                <div className="category-row-bottom">
                  <span className="meta">
                    {category.dosageForms.length} {copy.formLabel}
                  </span>
                  {category.importLicenceRequired && (
                    <span className="licence-badge">{copy.licence}</span>
                  )}
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <aside className="catalogue-aside">
          <FileText size={24} strokeWidth={1.5} />
          <span className="meta">{copy.catalogueContents}</span>
          <h2 className="display">{copy.catalogueTitle}</h2>
          <p>{copy.cataloguePricing}</p>
          <Link href="/catalogue" className="button">
            {copy.catalogue}
            <ArrowUpRight size={20} />
          </Link>
        </aside>
      </section>
    </main>
  );
}
