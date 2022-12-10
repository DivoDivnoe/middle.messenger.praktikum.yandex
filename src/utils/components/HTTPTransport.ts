enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface OptionsProps {
  method: Method;
  data: Record<string, unknown>;
  timeout: number;
  headers: Record<string, string>;
}

function queryStringify(data: Record<string, string>) {
  const strData = Object.entries(data).map(([key, value]) => `${key}=${String(value)}`);

  return `?${strData.join('&')}`;
}

class HTTPTransport {
  get = (url: string, options = {} as OptionsProps) => {
    const data = queryStringify(options.data as Record<string, string>);
    const getUrl = `${url}${data}`;

    return this.request(getUrl, { ...options, method: Method.GET }, options.timeout);
  };
  post = (url: string, options = {} as OptionsProps) => {
    return this.request(url, { ...options, method: Method.POST }, options.timeout);
  };
  put = (url: string, options = {} as OptionsProps) => {
    return this.request(url, { ...options, method: Method.PUT }, options.timeout);
  };
  delete = (url: string, options = {} as OptionsProps) => {
    return this.request(url, { ...options, method: Method.DELETE }, options.timeout);
  };

  request = (url: string, options: OptionsProps, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Method.GET;

      if (headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.timeout = timeout;

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.open(method, url);

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export const myFetch = (url: string, options: OptionsProps) =>
  new HTTPTransport().request(url, options);

export const fetchWithRetry = (
  url: string,
  options = {} as OptionsProps & { tries?: number },
): Promise<unknown> => {
  const { tries = 1 } = options;

  const onError = (err: Error) => {
    const triesLeft = tries - 1;

    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  };

  return myFetch(url, options as OptionsProps).catch(onError);
};

export default HTTPTransport;
