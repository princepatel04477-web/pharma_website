import { copy } from "@/content/site";
import { PageHeader } from "@/components/ui";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { pageMetadata } from "@/lib/metadata";
export const generateMetadata = () =>
  pageMetadata("Trade account", copy.tradeIntro, "/trade-account");
export default function TradeAccount() {
  return (
    <main>
      <PageHeader
        label={copy.trade}
        title={copy.tradeTitle}
        intro={copy.tradeIntro}
      />
      <section className="section border-t border-rule">
        <div className="container trade-form-container">
          <div className="form-panel">
            <EnquiryForm type="trade" />
          </div>
        </div>
      </section>
    </main>
  );
}
