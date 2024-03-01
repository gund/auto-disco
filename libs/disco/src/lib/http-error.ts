export class HttpError extends Error {
  override name = 'HttpError';

  constructor(
    public req: Request,
    public res: Response,
  ) {
    super(
      `HTTP request failed ${req.method} ${req.url} - ${res.status} ${res.statusText}`,
    );
  }
}
