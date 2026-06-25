export async function GET() {
    const content = `# PrintPalash

PrintPalash is a premium online printing and branding company in Lagos, Nigeria.

Website: https://printpalash.com

## Services

- Flyer printing in Lagos
- Business card printing in Lagos
- Packaging printing in Lagos
- Paper bag production in Lagos
- T-shirt printing in Lagos
- Banner printing and large format printing
- Souvenir printing and promotional branding
- Corporate branding services
- Sticker printing
- Brochure printing
- Event branding and signage

## About

PrintPalash helps businesses, brands, schools, churches, fashion companies, restaurants, startups, event planners, and corporate organizations print high-quality branded materials with professional finishing and fast delivery.

## Important Pages

- Homepage: https://printpalash.com
- Products: https://printpalash.com/products
- Blog: https://printpalash.com/blog
- Get a Quote: https://printpalash.com/get-a-quote
- Contact: https://printpalash.com/contact

## Location

Shomolu, Lagos, Nigeria.

## Contact

Phone: +2347035017359
`;
    return new Response(content, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}