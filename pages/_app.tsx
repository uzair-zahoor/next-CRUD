import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
interface AppProps {
  Component: any;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}