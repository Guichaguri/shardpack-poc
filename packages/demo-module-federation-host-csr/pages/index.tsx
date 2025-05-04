import { lazy, useEffect, useState } from 'react';
import { loadRemote } from '@module-federation/runtime';

const mfes = {
  header: lazy(() => loadRemote('demo-mfe-nav/Header')),
  footer: lazy(() => loadRemote('demo-mfe-nav/Footer')),
  product: lazy(() => loadRemote('demo-mfe-product/Product')),
};

const pageComponents = ['header', 'product', 'footer'];

export default function Page() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => setInitialized(true), []);

  if (!initialized) {
    return <></>;
  }

  return (
    <>
      {pageComponents.map((name, i) => {
        const Component = mfes[name];

        return <Component key={i} />;
      })}
    </>
  )
}
