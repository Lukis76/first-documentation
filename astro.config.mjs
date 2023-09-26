import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkCodeTitles from "remark-code-titles";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [[rehypeExternalLinks, {
      target: "_blank",
      rel: ["noreferrer noopener"],
      content: {
        type: "text",
        value: "↗"
      }
    }], rehypeSlug
    // [
    //   rehypeAutolinkHeadings,
    //   {
    //     properties: {
    //       class: "heading-link heading-link--hidden---effects",
    //       "data-heading-link": true,
    //     },
    //     behavior: "wrap",
    //   },
    // ],
    ],

    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: "material-theme-darker",
      wrap: true
    }
  },
  integrations: [mdx(), sitemap(), tailwind(), react()]
});