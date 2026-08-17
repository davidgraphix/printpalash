/**
 * Renders a JSON-LD block into the server-rendered HTML.
 *
 * Kept as one component so every structured-data block is serialised the same
 * way and `<` inside string values is escaped — otherwise a stray `</script>`
 * in product copy would break out of the tag.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
