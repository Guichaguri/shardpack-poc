
export type RemoteName = string;

export async function loadRemote<T = any>(name: RemoteName): Promise<T> {
  throw new Error('Runtime has not been built yet.');
}

export const metadata: any = undefined;
