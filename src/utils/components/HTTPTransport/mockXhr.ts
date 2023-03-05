const mockXhr = (status: number, response: Record<string, string>) => {
  const xhrMockObj = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    status,
    response: JSON.stringify(response),
  };

  const xhrMockClass = () => xhrMockObj;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    xhrMockObj['onload']();
  }, 0);
};

export default mockXhr;
