import { DiscoApi } from './api';
import { DiscoServer } from './server';

export interface DiscoChannelConfig {
  id: string;
  server: DiscoServer;
  api: DiscoApi;
}

export class DiscoChannel {
  readonly id: string;
  readonly server: DiscoServer;
  protected readonly api;

  constructor(config: DiscoChannelConfig) {
    this.id = config.id;
    this.server = config.server;
    this.api = config.api;
  }

  async sendMessage(content: string) {
    return this.api.send(
      `https://discord.com/api/v9/channels/${this.id}/messages`,
      {
        method: 'POST',
        body: this.api.intoBody({ content }),
        referrer: `https://discord.com/channels/${this.server.id}/${this.id}`,
      },
    );
  }
}
