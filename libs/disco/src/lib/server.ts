import { DiscoApi } from './api';
import { DiscoChannel } from './channel';

export interface DiscoServerConfig {
  id: string;
  api: DiscoApi;
}

export class DiscoServer {
  readonly id: string;
  protected readonly api;

  constructor(config: DiscoServerConfig) {
    this.id = config.id;
    this.api = config.api;
  }

  openChannel(id: string) {
    return new DiscoChannel({ id, server: this, api: this.api });
  }
}
