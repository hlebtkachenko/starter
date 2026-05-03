// AppError + envelope shape. See docs/conventions/error-envelope.md.

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export type ErrorEnvelope = {
  error: {
    code: string;
    message: string;
    details?: unknown;
    request_id?: string;
  };
};
