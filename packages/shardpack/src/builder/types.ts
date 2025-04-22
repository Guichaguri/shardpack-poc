
export interface ExternalModule {
  name: string;
  remotes: ExternalRemote[];

  /**
   * URL pointing to the zip file containing the module
   */
  url: string;
}

export interface ExternalRemote {
  remote: string;
  file: string;
}

export interface ResolvedRemote {
  name: string;
  path: string;
}
