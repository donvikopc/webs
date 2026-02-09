import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords, image, url, schema }) => {
  const siteTitle = 'Donvik Tech (OPC) Private Limited';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentUrl = url || window.location.href;
  const defaultImage = `${window.location.origin}/logo.jpg`;
  const metaImage = image || defaultImage;

  const defaultKeywords = 'Donvik, Donvik OPC, Donvik Tech, donvikopc, donvikopctech, Donvik Official, software development, web development, mobile app development, IT consulting';
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Donvik Tech (OPC) Private Limited - Your trusted technology partner for innovative solutions and digital transformation.'} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={currentUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default Meta;
