import { DiscoApi } from './api';
import { DiscoServer } from './server';

export interface DiscoConfig {
  api: DiscoApi;
}

export class Disco {
  protected readonly api;

  constructor(config: DiscoConfig) {
    this.api = config.api;
  }

  openServer(id: string) {
    return new DiscoServer({ id, api: this.api });
  }
}
