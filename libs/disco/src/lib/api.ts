import { DiscoAuth } from './auth';
import { HttpError } from './http-error';

export interface DiscoApiConfig {
  auth: DiscoAuth;
  extraHeaders?: Record<string, string>;
  fetch?: typeof fetch;
}

export class DiscoApi {
  readonly #auth;
  protected readonly extraHeaders;
  protected readonly fetch;

  constructor(config: DiscoApiConfig) {
    this.#auth = config.auth;
    this.extraHeaders = new Headers({
      'Content-Type': 'application/json',
      Host: 'discord.com',
      Origin: 'https://discord.com',
      'Alt-Used': 'discord.com',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
      ...config.extraHeaders,
    });
    this.fetch = config.fetch ?? fetch;
  }

  async send(...args: Parameters<typeof fetch>) {
    const req = this.#auth.authorize(new Request(...args));

    this.extraHeaders.forEach((value, key) => req.headers.set(key, value));

    const res = await this.fetch(req);

    if (!res.ok) {
      throw new HttpError(req, res);
    }

    return res;
  }

  intoBody(data: Record<string, unknown>) {
    return JSON.stringify({
      nonce: this.genNonce(),
      mobile_network_type: 'unknown',
      tts: false,
      flags: 0,
      ...data,
    });
  }

  genNonce() {
    return `${Math.floor(Math.random() * 1000000000)}`;
  }
}
