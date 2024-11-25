
""
import LanguageChanger from '@/component/ChangeLang';
import initTranslations from '../i18n';
import Test from './Test';

const i18nNamespaces = ['dashboard'];

export default async function Home({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <main>
      <h1>{t('header')}</h1>
      <Test />
      <LanguageChanger />
    </main>
  );
}
