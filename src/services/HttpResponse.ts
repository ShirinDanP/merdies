import { ErrorResponse, Errors } from './errors';

class HttpResponse<T> {
  private result: T;

  private error: Errors | ErrorResponse | undefined;

  public constructor(result: T, error?: Errors | ErrorResponse) {
    this.result = result;
    if (error) {
      this.error = error;
    }
  }
}

export default HttpResponse;
