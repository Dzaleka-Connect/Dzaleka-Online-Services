import { f as createComponent, i as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_80255e7d.mjs';
import 'clsx';

const html = "<h2 id=\"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm21-21l-6-6m2-5a7-7-0-11-14-0-7-7-0-0114-0z-svg-finding-services\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\"></path></svg> Finding Services</h2>\n<p>Our services directory helps you find the support you need. Here’s how to use it effectively:</p>\n<div class=\"feature-grid\">\n  <div class=\"feature-card\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\"></path>\n    </svg>\n    <h4>Search</h4>\n    <p>Use keywords to find specific services</p>\n  </div>\n  <div class=\"feature-card\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z\"></path>\n    </svg>\n    <h4>Filter</h4>\n    <p>Narrow results by category, location, or availability</p>\n  </div>\n  <div class=\"feature-card\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z\"></path>\n    </svg>\n    <h4>Favorites</h4>\n    <p>Save services for quick access later</p>\n  </div>\n</div>\n<h2 id=\"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm19-11h5m14-0a2-2-0-012-2v6a2-2-0-01-2-2h5a2-2-0-01-2-2v-6a2-2-0-012-2m14-0v9a2-2-0-00-2-2m5-11v9a2-2-0-012-2m0-0v5a2-2-0-012-2h6a2-2-0-012-2v2m7-7h10-svg-service-categories\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10\"></path></svg> Service Categories</h2>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-6\">\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\"></path>\n      </svg>\n      Healthcare\n    </h3>\n    <ul>\n      <li>Medical clinics</li>\n      <li>Mental health support</li>\n      <li>Maternal care</li>\n      <li>Vaccination services</li>\n    </ul>\n  </div>\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\"></path>\n      </svg>\n      Education\n    </h3>\n    <ul>\n      <li>Primary schools</li>\n      <li>Secondary schools</li>\n      <li>Vocational training</li>\n      <li>Language classes</li>\n    </ul>\n  </div>\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\"></path>\n      </svg>\n      Legal Support\n    </h3>\n    <ul>\n      <li>Documentation assistance</li>\n      <li>Legal counseling</li>\n      <li>Rights advocacy</li>\n      <li>Dispute resolution</li>\n    </ul>\n  </div>\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\"></path>\n      </svg>\n      Business Support\n    </h3>\n    <ul>\n      <li>Entrepreneurship training</li>\n      <li>Business planning</li>\n      <li>Financial literacy</li>\n      <li>Market access</li>\n    </ul>\n  </div>\n</div>\n<h2 id=\"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm4318-6318a45-45-0-000-6364l12-20364l7682-7682a45-45-0-00-6364-6364l12-7636l-1318-1318a45-45-0-00-6364-0z-svg-service-stats\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\"></path></svg> Service Stats</h2>\n<div class=\"stats-grid\">\n  <div class=\"stat-card\">\n    <div class=\"stat-number\">50+</div>\n    <div class=\"stat-label\">Active Services</div>\n  </div>\n  <div class=\"stat-card\">\n    <div class=\"stat-number\">20+</div>\n    <div class=\"stat-label\">Service Providers</div>\n  </div>\n  <div class=\"stat-card\">\n    <div class=\"stat-number\">1000+</div>\n    <div class=\"stat-label\">Monthly Users</div>\n  </div>\n</div>\n<h2 id=\"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm13-16h-1v-4h-1m1-4h01m21-12a9-9-0-11-18-0-9-9-0-0118-0z-svg-using-the-directory\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg> Using the Directory</h2>\n<div class=\"steps-list\">\n  <div class=\"step-item\">\n    <div class=\"step-number\">1</div>\n    <div class=\"step-content\">\n      <h4>Browse or Search</h4>\n      <p>Use the search bar or browse through categories to find services.</p>\n    </div>\n  </div>\n  <div class=\"step-item\">\n    <div class=\"step-number\">2</div>\n    <div class=\"step-content\">\n      <h4>View Details</h4>\n      <p>Click on a service to see full details, including:</p>\n      <ul>\n        <li>Service description</li>\n        <li>Location and hours</li>\n        <li>Contact information</li>\n        <li>Requirements</li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"step-item\">\n    <div class=\"step-number\">3</div>\n    <div class=\"step-content\">\n      <h4>Contact Provider</h4>\n      <p>Reach out to the service provider through their preferred contact method.</p>\n    </div>\n  </div>\n</div>\n<div class=\"bg-primary-50 rounded-lg p-6 mt-8\">\n  <div class=\"flex items-start gap-4\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 text-primary-600 mt-1\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"></path>\n    </svg>\n    <div>\n      <h4 class=\"text-lg font-medium text-gray-900\">Need to list your service?</h4>\n      <p class=\"mt-1 text-sm text-gray-600\">If you're a service provider, you can register your service in our directory.</p>\n      <a href=\"/services/register\" class=\"inline-flex items-center mt-4 text-sm font-medium text-primary-600 hover:text-primary-700\">\n        Register Your Service\n        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ml-1 h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 7l5 5m0 0l-5 5m5-5H6\"></path>\n        </svg>\n      </a>\n    </div>\n  </div>\n</div>";

				const frontmatter = {"title":"Services Directory","description":"Find and access services in the Dzaleka community"};
				const file = "/Users/bakari/Downloads/dzaleka heritage archive/src/content/docs/services-directory.md";
				const url = undefined;
				function rawContent() {
					return "\n## <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\" /></svg> Finding Services\n\nOur services directory helps you find the support you need. Here's how to use it effectively:\n\n<div class=\"feature-grid\">\n  <div class=\"feature-card\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\" />\n    </svg>\n    <h4>Search</h4>\n    <p>Use keywords to find specific services</p>\n  </div>\n  <div class=\"feature-card\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z\" />\n    </svg>\n    <h4>Filter</h4>\n    <p>Narrow results by category, location, or availability</p>\n  </div>\n  <div class=\"feature-card\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z\" />\n    </svg>\n    <h4>Favorites</h4>\n    <p>Save services for quick access later</p>\n  </div>\n</div>\n\n## <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10\" /></svg> Service Categories\n\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-6\">\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\" />\n      </svg>\n      Healthcare\n    </h3>\n    <ul>\n      <li>Medical clinics</li>\n      <li>Mental health support</li>\n      <li>Maternal care</li>\n      <li>Vaccination services</li>\n    </ul>\n  </div>\n  \n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\" />\n      </svg>\n      Education\n    </h3>\n    <ul>\n      <li>Primary schools</li>\n      <li>Secondary schools</li>\n      <li>Vocational training</li>\n      <li>Language classes</li>\n    </ul>\n  </div>\n\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\" />\n      </svg>\n      Legal Support\n    </h3>\n    <ul>\n      <li>Documentation assistance</li>\n      <li>Legal counseling</li>\n      <li>Rights advocacy</li>\n      <li>Dispute resolution</li>\n    </ul>\n  </div>\n\n  <div class=\"service-category\">\n    <h3>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"inline-block h-5 w-5 mr-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\" />\n      </svg>\n      Business Support\n    </h3>\n    <ul>\n      <li>Entrepreneurship training</li>\n      <li>Business planning</li>\n      <li>Financial literacy</li>\n      <li>Market access</li>\n    </ul>\n  </div>\n</div>\n\n## <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\" /></svg> Service Stats\n\n<div class=\"stats-grid\">\n  <div class=\"stat-card\">\n    <div class=\"stat-number\">50+</div>\n    <div class=\"stat-label\">Active Services</div>\n  </div>\n  <div class=\"stat-card\">\n    <div class=\"stat-number\">20+</div>\n    <div class=\"stat-label\">Service Providers</div>\n  </div>\n  <div class=\"stat-card\">\n    <div class=\"stat-number\">1000+</div>\n    <div class=\"stat-label\">Monthly Users</div>\n  </div>\n</div>\n\n## <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg> Using the Directory\n\n<div class=\"steps-list\">\n  <div class=\"step-item\">\n    <div class=\"step-number\">1</div>\n    <div class=\"step-content\">\n      <h4>Browse or Search</h4>\n      <p>Use the search bar or browse through categories to find services.</p>\n    </div>\n  </div>\n  <div class=\"step-item\">\n    <div class=\"step-number\">2</div>\n    <div class=\"step-content\">\n      <h4>View Details</h4>\n      <p>Click on a service to see full details, including:</p>\n      <ul>\n        <li>Service description</li>\n        <li>Location and hours</li>\n        <li>Contact information</li>\n        <li>Requirements</li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"step-item\">\n    <div class=\"step-number\">3</div>\n    <div class=\"step-content\">\n      <h4>Contact Provider</h4>\n      <p>Reach out to the service provider through their preferred contact method.</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"bg-primary-50 rounded-lg p-6 mt-8\">\n  <div class=\"flex items-start gap-4\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 text-primary-600 mt-1\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n    </svg>\n    <div>\n      <h4 class=\"text-lg font-medium text-gray-900\">Need to list your service?</h4>\n      <p class=\"mt-1 text-sm text-gray-600\">If you're a service provider, you can register your service in our directory.</p>\n      <a href=\"/services/register\" class=\"inline-flex items-center mt-4 text-sm font-medium text-primary-600 hover:text-primary-700\">\n        Register Your Service\n        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ml-1 h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 7l5 5m0 0l-5 5m5-5H6\" />\n        </svg>\n      </a>\n    </div>\n  </div>\n</div>\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm21-21l-6-6m2-5a7-7-0-11-14-0-7-7-0-0114-0z-svg-finding-services","text":" Finding Services"},{"depth":2,"slug":"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm19-11h5m14-0a2-2-0-012-2v6a2-2-0-01-2-2h5a2-2-0-01-2-2v-6a2-2-0-012-2m14-0v9a2-2-0-00-2-2m5-11v9a2-2-0-012-2m0-0v5a2-2-0-012-2h6a2-2-0-012-2v2m7-7h10-svg-service-categories","text":" Service Categories"},{"depth":2,"slug":"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm4318-6318a45-45-0-000-6364l12-20364l7682-7682a45-45-0-00-6364-6364l12-7636l-1318-1318a45-45-0-00-6364-0z-svg-service-stats","text":" Service Stats"},{"depth":2,"slug":"svg-xmlnshttpwwww3org2000svg-fillnone-viewbox0-0-24-24-strokecurrentcolorpath-stroke-linecapround-stroke-linejoinround-stroke-width2-dm13-16h-1v-4h-1m1-4h01m21-12a9-9-0-11-18-0-9-9-0-0118-0z-svg-using-the-directory","text":" Using the Directory"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };