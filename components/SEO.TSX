import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image = "/seo-default.png", // fallback image (place one in /public)
  url = "https://www.printpalash.com",
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="PrintPalash" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Structured Data (Schema.org) for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "PrintPalash",
            url: url,
            logo: "/logo.png",
            image: image,
            description: description,
            telephone: "+2347035017359",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Lagos",
              addressLocality: "Lagos",
              addressRegion: "LA",
              addressCountry: "NG",
            },
            openingHours: "Mo-Sa 08:00-20:00",
            sameAs: [
              "https://www.facebook.com/printpalash",
              "https://www.instagram.com/printpalash",
              "https://wa.me/2347035017359",
            ],
          }),
        }}
      />
    </Head>
  );
}
