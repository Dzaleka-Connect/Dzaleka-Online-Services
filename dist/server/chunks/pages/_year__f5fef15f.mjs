/* empty css                            */import { k as createAstro, f as createComponent, i as renderTemplate, j as renderComponent, m as maybeRenderHead, l as addAttribute } from '../astro_80255e7d.mjs';
import { g as getCollection, $ as $$Layout } from './__fa3eb426.mjs';
import { format } from 'date-fns';

const $$Astro = createAstro();
async function getStaticPaths() {
  const photos = await getCollection("photos");
  const years = [...new Set(photos.map(
    (photo) => new Date(photo.data.date).getFullYear()
  ))];
  return years.map((year) => ({
    params: { year: year.toString() },
    props: { year }
  }));
}
const $$year = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$year;
  const { year } = Astro2.params;
  const photos = await getCollection("photos");
  const yearPhotos = photos.filter((photo) => new Date(photo.data.date).getFullYear() === parseInt(year)).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  const allYears = [...new Set(photos.map(
    (photo) => new Date(photo.data.date).getFullYear()
  ))].sort((a, b) => b - a);
  const currentYearIndex = allYears.indexOf(parseInt(year));
  const prevYear = currentYearIndex < allYears.length - 1 ? allYears[currentYearIndex + 1] : null;
  const nextYear = currentYearIndex > 0 ? allYears[currentYearIndex - 1] : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${year} Photos | Dzaleka Heritage` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-12"> <div class="max-w-7xl mx-auto"> <!-- Breadcrumb --> <nav class="flex items-center gap-2 text-sm text-gray-600 mb-8"> <a href="/photos" class="hover:text-primary-600">Gallery</a> <span>/</span> <span class="text-gray-900">${year}</span> </nav> <div class="flex items-center justify-between mb-8"> <h1 class="text-4xl font-bold text-gray-900"> ${year} Photos
<span class="text-lg text-gray-500 font-normal ml-2">
(${yearPhotos.length} photos)
</span> </h1> <!-- Year Navigation --> <div class="flex items-center gap-4"> ${prevYear && renderTemplate`<a${addAttribute(`/photos/${prevYear}`, "href")} class="px-4 py-2 text-gray-600 hover:text-primary-600 flex items-center gap-2 group"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> ${prevYear} </a>`} ${nextYear && renderTemplate`<a${addAttribute(`/photos/${nextYear}`, "href")} class="px-4 py-2 text-gray-600 hover:text-primary-600 flex items-center gap-2 group"> ${nextYear} <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a>`} </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${yearPhotos.map((photo) => renderTemplate`<a${addAttribute(`/photos/${photo.slug}`, "href")} class="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> <div class="aspect-w-4 aspect-h-3 bg-gray-100"> <img${addAttribute(photo.data.image, "src")}${addAttribute(photo.data.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> </div> <div class="p-4"> <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors"> ${photo.data.title} </h3> <div class="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600"> <span>${format(new Date(photo.data.date), "MMMM d, yyyy")}</span> ${photo.data.photographer && renderTemplate`<span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> ${typeof photo.data.photographer === "string" ? photo.data.photographer : photo.data.photographer.name} </span>`} </div> <p class="mt-2 text-sm text-gray-600 line-clamp-2"> ${photo.data.description} </p> ${photo.data.tags && renderTemplate`<div class="mt-3 flex flex-wrap gap-2"> ${photo.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"> ${tag} </span>`)} </div>`} </div> </a>`)} </div> ${yearPhotos.length === 0 && renderTemplate`<div class="text-center py-16"> <h2 class="text-2xl font-semibold text-gray-900 mb-2">No Photos Found</h2> <p class="text-gray-600">There are no photos available for ${year}.</p> <a href="/photos" class="inline-flex items-center px-6 py-3 mt-6 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
Back to Gallery
</a> </div>`} </div> </main> ` })}`;
}, "/Users/bakari/Downloads/dzaleka heritage archive/src/pages/photos/[year].astro", void 0);

const $$file = "/Users/bakari/Downloads/dzaleka heritage archive/src/pages/photos/[year].astro";
const $$url = "/photos/[year]";

export { $$year as default, $$file as file, getStaticPaths, $$url as url };