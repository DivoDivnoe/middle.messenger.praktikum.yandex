import HTTPTransport from '@/utils/components/HTTPTransport';

abstract class BaseAPI {
  protected _http: HTTPTransport;

  protected constructor(endpoint: string) {
    this._http = new HTTPTransport(endpoint);
  }

  public create?(data: unknown): Promise<unknown>;
  public read?(identifier: string): Promise<unknown>;
  public update?(identifier: string, data: unknown): Promise<unknown>;
  public delete?(identifier: string | number): Promise<unknown>;
}

export default BaseAPI;
