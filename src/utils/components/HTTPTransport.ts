export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface OptionsProps {
  method?: Method;
  data?: Record<string, unknown>;
  timeout?: number;
  headers?: Record<string, string>;
}

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

  get = <Response>(path: string, options = {} as OptionsProps): Promise<Response> => {
    const data = queryStringify(options.data as Record<string, string>);

    return this._request(`${path}${data}`, { ...options, method: Method.GET });
  };
  post = <Response>(path: string, options = {} as OptionsProps): Promise<Response> => {
    return this._request(path, { ...options, method: Method.POST });
  };
  put = <Response>(path: string, options = {} as OptionsProps): Promise<Response> => {
    return this._request(path, { ...options, method: Method.PUT });
  };
  delete = <Response>(path: string, options = {} as OptionsProps): Promise<Response> => {
    return this._request(path, { ...options, method: Method.DELETE });
  };

  _request = <Response>(pathName: string, options: OptionsProps): Promise<Response> => {
    const url = `${this._endpoint}${pathName}`;

    return HTTPTransport.request<Response>(url, options);
  };

  static request = <Response>(url: string, options: OptionsProps): Promise<Response> => {
    const DEFAULT_TIMEOUT = 5000;

    const { headers = {}, method = Method.GET, data, timeout = DEFAULT_TIMEOUT } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Method.GET;

      xhr.open(method, url);

      if (!(data instanceof FormData)) {
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

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (isGet || !data) {
        xhr.send();
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
