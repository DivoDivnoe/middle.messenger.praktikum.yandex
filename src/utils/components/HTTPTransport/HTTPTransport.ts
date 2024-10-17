export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface OptionsProps {
  method?: Method;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
  headers?: Record<string, string>;
}

type RequestType = <Response>(path: string, options?: OptionsProps) => Promise<Response>;
type RequestTypeRequiredOptions = <Response>(
  path: string,
  options: OptionsProps,
) => Promise<Response>;

function queryStringify(data: Record<string, string>) {
  const strData = Object.entries(data).map(([key, value]) => `${key}=${String(value)}`);

  return `?${strData.join('&')}`;
}

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: RequestType = (path, options = {}) => {
    const data = options.data ? queryStringify(options.data as Record<string, string>) : '';

    return this._request(`${path}${data}`, { ...options, method: Method.GET });
  };

  public post: RequestType = (path, options = {}) => {
    return this._request(path, { ...options, method: Method.POST });
  };

  public put: RequestType = (path, options = {}) => {
    return this._request(path, { ...options, method: Method.PUT });
  };

  public delete: RequestType = (path, options = {}) => {
    return this._request(path, { ...options, method: Method.DELETE });
  };

  private _request: RequestTypeRequiredOptions = (path, options) => {
    const url = `${this._endpoint}${path}`;

    return HTTPTransport.request(url, options);
  };

  public static request: RequestTypeRequiredOptions = (url, options) => {
    const DEFAULT_TIMEOUT = 5000;

    const { headers = {}, method = Method.GET, data, timeout = DEFAULT_TIMEOUT } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Method.GET;
      const isFormData = data instanceof FormData;

      xhr.open(method, url);

      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.timeout = timeout;

      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.ontimeout = () => reject({ reason: 'timeout' });
      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });

      if (isGet || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export const myFetch = (path: string, options: OptionsProps) =>
  HTTPTransport.request(path, options);

export const fetchWithRetry = (
  endpoint: string,
  path: string,
  options = {} as OptionsProps & { tries?: number },
): Promise<unknown> => {
  const { tries = 1 } = options;

  const onError = (err: Error) => {
    const triesLeft = tries - 1;

    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(endpoint, path, { ...options, tries: triesLeft });
  };

  return myFetch(path, options as OptionsProps).catch(onError);
};

export default HTTPTransport;
