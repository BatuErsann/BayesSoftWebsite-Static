import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Turkish pages
        main: resolve(__dirname, 'src/tr/index.html'),
        services: resolve(__dirname, 'src/tr/services.html'),
        sectors: resolve(__dirname, 'src/tr/sectors.html'),
        projects: resolve(__dirname, 'src/tr/projects.html'),
        about: resolve(__dirname, 'src/tr/about.html'),
        contact: resolve(__dirname, 'src/tr/contact.html'),
        // English pages
        'en-main': resolve(__dirname, 'src/en/index.html'),
        'en-services': resolve(__dirname, 'src/en/services.html'),
        'en-sectors': resolve(__dirname, 'src/en/sectors.html'),
        'en-projects': resolve(__dirname, 'src/en/projects.html'),
        'en-about': resolve(__dirname, 'src/en/about.html'),
        'en-contact': resolve(__dirname, 'src/en/contact.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components'),
      context: {
        siteName: 'Bayes Digital',
        siteTagline: 'Özel Dijital Sistemler ve Uçtan Uca Otomasyon',
        companyEmail: 'info@bayesdigital.com',
        companyPhone: '+90 212 555 0100',
        companyAddress: 'Maslak, Sarıyer, İstanbul, Türkiye',
        currentYear: new Date().getFullYear(),
      },
    }),
  ],
  server: {
    open: '/tr/index.html',
  },
});
