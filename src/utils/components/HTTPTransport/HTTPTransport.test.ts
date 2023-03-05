import HTTPTransport from './HTTPTransport';
import mockXhr from './mockXhr';

describe('HTTPTransport', () => {
  describe('request method', () => {
    it('handles get request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(200, mockRes);

      await expect(HTTPTransport.request('/', {})).resolves.toEqual(JSON.stringify(mockRes));
    });

    it('rejects get request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(400, mockRes);

      await expect(HTTPTransport.request('/', {})).rejects.toEqual(JSON.stringify(mockRes));
    });
  });

  describe('get method', () => {
    it('handles request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(200, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.get('/', {})).resolves.toEqual(JSON.stringify(mockRes));
    });

    it('rejects request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(404, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.get('/', {})).rejects.toEqual(JSON.stringify(mockRes));
    });
  });

  describe('post method', () => {
    it('handles request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(200, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.post('/', {})).resolves.toEqual(JSON.stringify(mockRes));
    });

    it('rejects request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(404, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.post('/', {})).rejects.toEqual(JSON.stringify(mockRes));
    });
  });

  describe('put method', () => {
    it('handles request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(200, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.put('/', {})).resolves.toEqual(JSON.stringify(mockRes));
    });

    it('rejects request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(404, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.put('/', {})).rejects.toEqual(JSON.stringify(mockRes));
    });
  });

  describe('delete method', () => {
    it('handles request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(200, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.delete('/', {})).resolves.toEqual(JSON.stringify(mockRes));
    });

    it('rejects request correctly', async () => {
      const mockRes = { userId: 'abce456sf' };
      mockXhr(404, mockRes);

      const http = new HTTPTransport('/some/endpoint');

      await expect(http.delete('/', {})).rejects.toEqual(JSON.stringify(mockRes));
    });
  });
});
