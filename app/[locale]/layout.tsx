/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import TranslationsProvider from '@/component/TranslationsProvider';
import initTranslations from "../i18n";
import i18nConfig from "@/i18nConfig";
import { dir, t } from 'i18next';
import ThemeProv from "@/context/ThemeProv";
import ModeContextProvider from "@/context/modeContext";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { config } from "@/config";

const cairo = Cairo({ weight: ["600", "700", "800"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mountain - ماونتين",
  description: "Mountain Digital Marketing - ماونتن للتسويق الرقمي",
  robots: "index,follow",
  keywords: "",
  openGraph: {
    type: "article",
    authors: ["Mountain", "https://mountain-egy.site"],
    url: "https://mountain-egy.site",
    title: "Mountain - ماونتين",
    description: "",
    images: [
      {
        url: "https://mountain-egy.site/logo.webp",
        width: 1200,
        height: 630,
        alt: "Mountain",
      },
    ],
    siteName: "Mountain",
    section: "Center Mountain",
    publishedTime: "2024-10-1T12:00:00Z", // Publication date of the article
    modifiedTime: "2024-10-10T14:00:00Z", // Last modified time (optional)
  },
  twitter: {
    card: "summary_large_image",
    title: "Mountain - ماونتين",
    description: "Mountain Digital Marketing - ماونتن للتسويق الرقمي",
    images: "https://mountain-egy.site/logo.webp",
  },
  manifest: "/manifest.json",
  authors: {
    name: "Mountain",
    url: "https://mountain-egy.site",
  },
  alternates: {
    canonical: "https://mountain-egy.site", // Canonical URL for SEO purposes
    languages: {
      "ar": "https://mountain-egy.site/ar", // If you have an Arabic language version
      "en": "https://mountain-egy.site/en", // If you have an Arabic language version
    },
  },
  applicationName: "Mountain",
  creator: "mountain",
  category: "",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }))
}

type Props = {
  params: { locale: string };
};

// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   return {
//     title: config.app.name[params.locale],
//   };
// }

const i18nNamespaces = ['website', 'dashboard', 'custom']

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const { resources } = await initTranslations(locale, i18nNamespaces);

  // metadata.title = config.app.name[locale];
  // metadata.description = resources.website.description;

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
       
      </head>
      <body className={cairo.className}>
        <ModeContextProvider>
          <ThemeProv locale={locale}>
            <TranslationsProvider
              namespaces={i18nNamespaces}
              locale={locale}
              resources={resources}
            >
              {children}
            </TranslationsProvider>
          </ThemeProv>
        </ModeContextProvider>
      </body>
    </html>
  );
}

