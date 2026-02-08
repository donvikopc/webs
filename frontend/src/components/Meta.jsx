import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords, image, url, schema }) => {
  const siteTitle = 'Donvik Private Limited';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentUrl = url || window.location.href;
  const defaultImage = `${window.location.origin}/logo.jpeg`;
  const metaImage = image || defaultImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Donvik Private Limited - Your trusted technology partner for innovative solutions and digital transformation.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      
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
