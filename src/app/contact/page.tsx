import { FAQSchema } from "@/components/site-schema";
import { ArrowUpRight, MapPin } from "lucide-react";
import { copy, contactChannels } from "@/content/site";
import { formCopy } from "@/content/forms";
import { getFAQs } from "@/content";
import { brand, isVerified } from "@/config/brand";
import { PageHeader, Label } from "@/components/ui";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { FAQList } from "@/components/interactive";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata("Contact", copy.contactIntro, "/contact");
export default function Contact() {
  return (
    <main>
      <FAQSchema items={getFAQs().slice(6)} />
      <PageHeader
        label={copy.closingLabel}
        title={copy.contactTitle}
        intro={copy.contactIntro}
      />
      <section className="section border-t border-rule">
        <div className="container">
          <div className="three-grid contact-channels">
            {contactChannels.map((channel) => (
              <article className="editorial-card" key={channel.key}>
                <h2>{channel.name}</h2>
                <p>{channel.detail}</p>
                {isVerified(brand.email[channel.key]) ? (
                  <a
                    className="text-link"
                    href={`mailto:${brand.email[channel.key]}`}
                  >
                    {brand.email[channel.key]}
                    <ArrowUpRight size={20} />
                  </a>
                ) : (
                  <span className="meta">{copy.contactPending}</span>
                )}
                {isVerified(brand.whatsapp) && (
                  <a
                    className="text-link"
                    href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`}
                  >
                    {brand.whatsapp}
                    <ArrowUpRight size={20} />
                  </a>
                )}
              </article>
            ))}
          </div>
          <div className="form-layout">
            <aside>
              <Label>{copy.addressTitle}</Label>
              <MapPin size={24} strokeWidth={1.5} />
              <h2 className="display section-title mt-8">
                {brand.hq.city},<br />
                {brand.hq.state}.
              </h2>
              <p className="section-description">{brand.hq.country}</p>
              <p>{copy.addressNote}</p>
              <a
                className="text-link mt-6"
                href="https://www.google.com/maps/search/?api=1&query=Surat%2CGujarat%2CIndia"
                target="_blank"
                rel="noopener noreferrer"
              >
                {formCopy.map}
                <ArrowUpRight size={20} />
              </a>
            </aside>
            <div className="form-panel">
              <h2 className="form-title">{copy.contactForm}</h2>
              <EnquiryForm type="contact" />
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="faqs">
        <div className="container editorial-grid">
          <div>
            <Label>{copy.faqLabel}</Label>
            <h2 className="display section-title">{copy.faqTitle}</h2>
          </div>
          <FAQList items={getFAQs().slice(6)} />
        </div>
      </section>
    </main>
  );
}
