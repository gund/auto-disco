export interface DiscoAuthConfig {
  token: string;
  superProperties?: string;
}

export class DiscoAuth {
  readonly #headers;

  constructor(config: DiscoAuthConfig) {
    this.#headers = new Headers({
      Authorization: config.token,
      ...(config.superProperties
        ? { 'X-Super-Properties': config.superProperties }
        : {}),
    });
  }

  authorize(req: Request): Request {
    this.#headers.forEach((value, key) => req.headers.set(key, value));
    return req;
  }
}
