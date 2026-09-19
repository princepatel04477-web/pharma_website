import Link from "next/link";
import { copy } from "@/content/site";
import { PageHeader } from "@/components/ui";
export default function NotFound() {
  return (
    <main>
      <PageHeader
        label="404"
        title={copy.notFoundTitle}
        intro={copy.notFoundDescription}
      >
        <Link className="button primary mt-8" href="/">
          {copy.home}
        </Link>
      </PageHeader>
    </main>
  );
}
