import { Helmet } from "react-helmet-async"
import HomeFeature from "../features/home/HomeFeature"

function HomePage() {
  const bannerUrl = "/hero-banner.webp";
  const imguUrl = "https://gemilangku.netlify.app" + bannerUrl

  return (
    <>
      <Helmet>
        <title>Gemilang - Platform E-Commerce Terbaik</title>
        <meta
          name="description"
          content="Gemilang adalah platform e-commerce yang menawarkan produk berkualitas dengan harga terjangkau. Temukan berbagai pilihan produk terbaik untuk kebutuhan Anda di Gemilang."
        />
        <meta name="keywords" content="gemilang, gemilangku, projek, nasrudin fahmi" />
        <link rel="canonical" href="https://gemilangku.netlify.app" />
        <meta property="og:title" content="Gemilang - Platform E-Commerce Terbaik" />
        <meta
          property="og:description"
          content="Gemilang adalah platform e-commerce yang menawarkan produk berkualitas dengan harga terjangkau. Temukan berbagai pilihan produk terbaik untuk kebutuhan Anda di Gemilang."
        />
        <meta property="og:image" content={imguUrl} />
        <meta property="og:url" content="https://gemilangku.netlify.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gemilang - E-commerce Terbaik untuk Kebutuhan Anda"
        />
        <meta
          name="twitter:description"
          content="Gemilang adalah platform e-commerce yang menawarkan produk berkualitas dengan harga terjangkau. Temukan berbagai pilihan produk terbaik untuk kebutuhan Anda di Gemilang."
        />
        <meta name="twitter:image" content={imguUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <script type="application/ld+json">
          {`{
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": "Gemilang - E-Commerce Terbaik",
            "description": "Gemilang adalah platform e-commerce yang menawarkan produk berkualitas dengan harga terjangkau. Temukan berbagai pilihan produk terbaik dan nikmati pengalaman belanja online yang mudah dan aman.",
            "url": "https://gemilangku.netlify.app"
          }`}
        </script>
      </Helmet>

      <HomeFeature />
    </>
  )
}

export default HomePage