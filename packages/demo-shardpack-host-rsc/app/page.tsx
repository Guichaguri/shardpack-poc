import { lazy } from 'react';
import { loadRemote } from 'shardpack';

const mfes = {
  header: lazy(() => loadRemote('demo-mfe-nav/Header')),
  footer: lazy(() => loadRemote('demo-mfe-nav/Footer')),
  product: lazy(() => loadRemote('demo-mfe-product/Product')),
};

const pageComponents = ['header', 'product', 'footer'];

// Essa propriedade é necessária para garantir que o Next.js não faça static rendering
export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <>
      {pageComponents.map((name, i) => {
        const Component = mfes[name];

        return <Component key={i} />;
      })}
    </>
  )
}
