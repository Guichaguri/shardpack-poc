import { ResolvedRemote } from './types';

export class RuntimeGenerator {
  constructor(
    private readonly remotes: ResolvedRemote[],
    private readonly metadata: any,
    private readonly strictTypes: boolean = true,
  ) {}

  public generateTypescriptDefinition(): string {
    const lines: string[] = [];

    const remotes = this.remotes.map(r => JSON.stringify(r.name.toString()));

    if (!this.strictTypes) {
      // In case the strict mode isn't enabled, we'll allow any string
      // but still provide auto-completion for the known modules
      remotes.push('string');
    }

    lines.push('export type RemoteName = ' + remotes.join(' | '));

    lines.push(`export function loadRemote<T = any>(name: RemoteName): Promise<T>;`);

    if (this.metadata !== undefined && this.metadata !== null) {
      lines.push(`export const metadata: ${JSON.stringify(this.metadata, null, 2)};`);
    } else {
      lines.push(`export const metadata: any;`)
    }

    return lines.join('\n');
  }

  public generateJavascript(): string {
    const lines: string[] = [];

    lines.push(`const remotes = {`);

    for (const remote of this.remotes) {
      lines.push(`  "${remote.name}": () => import("${remote.path}"),`);
    }

    lines.push(`};`);

    lines.push(`export async function loadRemote(name) {`);
    lines.push(`  const loader = remotes[name];`);
    lines.push(`  if (loader) return await loader();`);
    lines.push(`  throw new Error("Remote not found");`);
    lines.push(`}`);

    if (this.metadata !== undefined && this.metadata !== null) {
      lines.push(`export const metadata = ${JSON.stringify(this.metadata, null, 2)};`);
    } else {
      lines.push(`export const metadata = undefined;`);
    }

    return lines.join('\n');
  }

}

