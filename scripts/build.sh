# Module Federation Demos

(cd ../packages/demo-module-federation-mfe-nav || exit; npm run build)
(cd ../packages/demo-module-federation-mfe-product || exit; npm run build)
(cd ../packages/demo-module-federation-host-ssr || exit; npm run build)
(cd ../packages/demo-module-federation-host-csr || exit; npm run build)

# Shardpack Demos

(cd ../packages/demo-shardpack-mfe-nav || exit; npm run build)
(cd ../packages/demo-shardpack-mfe-product || exit; npm run build)

(cd ../packages/shardpack || exit; npm run build)

(cd ../packages/demo-shardpack-host-rsc || exit; npm run build)
(cd ../packages/demo-shardpack-host-ssr || exit; npm run build)
(cd ../packages/demo-shardpack-host-csr || exit; npm run build)
