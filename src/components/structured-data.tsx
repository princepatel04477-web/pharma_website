type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export function StructuredData({ data }: { data: Record<string, JsonValue> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
