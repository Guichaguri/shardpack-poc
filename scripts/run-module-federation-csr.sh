(trap 'kill 0' SIGINT;

  (cd ../packages/demo-module-federation-mfe-nav || exit; npm run start) &
  (cd ../packages/demo-module-federation-mfe-product || exit; npm run start) &
  (cd ../packages/demo-module-federation-host-csr || exit; npm run start)

)
