import HTTPTransport from '@/utils/components/HTTPTransport';

abstract class BaseAPI {
  protected _http: HTTPTransport;

  protected constructor(endpoint: string) {
    this._http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;
  public abstract read?(identifier: string): Promise<unknown>;
  public abstract update?(identifier: string, data: unknown): Promise<unknown>;
  public abstract delete?(identifier: string): Promise<unknown>;
}

export default BaseAPI;
