import path from 'node:path';
import fs from 'node:fs/promises';
import { ExternalModule, ResolvedRemote } from './types';
import { downloadAndExtractModule } from './external-fetcher';
import { RuntimeGenerator } from './runtime-generator';

const modulesPath = 'modules';

async function fetchAndResolveModules(modules: ExternalModule[], distDir: string): Promise<ResolvedRemote[]> {
  const resolvedModules: ResolvedRemote[] = [];

  for (const module of modules) {
    console.log(`Fetching ${module.name}...`);

    const dir = path.join(distDir, module.name);
    await downloadAndExtractModule(module.url, dir);

    for (const remote of module.remotes) {
      resolvedModules.push({
        name: path.posix.join(module.name, remote.remote),
        path: './' + path.posix.join(modulesPath, module.name, remote.file),
      });
    }
  }

  return resolvedModules;
}

async function createRuntime(distDir: string, packages: ResolvedRemote[], metadata?: any): Promise<void> {
  const generator = new RuntimeGenerator(packages, metadata);

  await fs.mkdir(distDir, { recursive: true });
  await fs.writeFile(path.join(distDir, 'runtime.js'), generator.generateJavascript());
  await fs.writeFile(path.join(distDir, 'runtime.d.ts'), generator.generateTypescriptDefinition());
}

async function copyPackageJson(modulifyDir: string): Promise<void> {
  await fs.copyFile(path.join(import.meta.dirname, '../../package.json'), path.join(modulifyDir, 'package.json'));
}

async function build(cwd: string, modules: ExternalModule[], metadata?: any): Promise<void> {
  const modulifyDir = path.join(cwd, 'node_modules/shardpack');
  const modulifyDist = path.join(modulifyDir, 'lib');
  const modulifyModules = path.join(modulifyDist, modulesPath);

  console.log('Deleting module cache...');
  await fs.mkdir(modulifyModules, { recursive: true });
  await fs.rm(modulifyModules, { recursive: true });

  const resolvedModules = await fetchAndResolveModules(modules, modulifyModules);

  console.log('Updating runtime files...');
  await createRuntime(modulifyDist, resolvedModules, metadata);
  await copyPackageJson(modulifyDir);
}

async function run() {
  const modules: ExternalModule[] = [
    {
      name: 'demo-mfe-nav',
      url: 'file://' + path.join(import.meta.dirname, '../../../demo-shardpack-mfe-nav/dist'),
      remotes: [
        {
          remote: './Header',
          file: './Header.js',
        },
        {
          remote: './Footer',
          file: './Footer.js',
        },
      ],
    },
    {
      name: 'demo-mfe-product',
      url: 'file://' + path.join(import.meta.dirname, '../../../demo-shardpack-mfe-product/dist'),
      remotes: [
        {
          remote: './Product',
          file: './Product.js',
        },
      ],
    },
  ];

  await build(path.join(import.meta.dirname, '../../../demo-shardpack-host-rsc'), modules);
  await build(path.join(import.meta.dirname, '../../../demo-shardpack-host-ssr'), modules);
  await build(path.join(import.meta.dirname, '../../../demo-shardpack-host-csr'), modules);
}

run().catch(error => console.error(error));
