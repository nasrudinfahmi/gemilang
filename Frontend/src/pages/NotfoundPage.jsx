import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

function NotfoundPage() {
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

      <div className="bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-9xl font-bold text-purple-400">404</h1>
              <h1 className="text-6xl font-medium py-8">Halaman tidak ditemukan</h1>
              <p className="text-2xl pb-8 px-12 font-medium">Halaman yang Anda cari tidak ada. Mungkin telah dipindahkan atau dihapus.</p>
              <Link to="/" aria-label="ke beranda" title="Beranda" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                BERANDA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotfoundPage