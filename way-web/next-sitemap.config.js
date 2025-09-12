/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');


const getBlogSlugs = () => {

  return [
    'historical-facts-of-the-atropatene-state',
    'historical-research-and-future-perspectives',
    'the-historical-mission-of-the-young-ambassadors',
    'history-in-the-context-of-international-relations',
    'the-fundamental-structure-of-azerbaijani-statehood',
  ];
};

module.exports = {
  siteUrl: 'https://worldazeyouth.az',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  
 
  async additionalPaths(config) {
    const slugs = getBlogSlugs();

    return slugs.map(slug => ({
      loc: `/blogs/${slug}`,       
      lastmod: new Date().toISOString(), 
    }));
  },
};
