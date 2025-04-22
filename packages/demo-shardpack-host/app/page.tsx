import { lazy } from 'react';
import { loadRemote } from 'shardpack';

const Header = lazy(() => loadRemote('demo-mfe-nav/Header'));
const Footer = lazy(() => loadRemote('demo-mfe-nav/Footer'));
const Product = lazy(() => loadRemote('demo-mfe-product/Product'));

export default function Page() {
  return (
    <>
      <Header />
      <Product />
      <Footer />
    </>
  )
}
