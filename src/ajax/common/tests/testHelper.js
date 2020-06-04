const mockWindowProperty = (property, value) => {
  const {[property]: originalProperty} = window;
  delete window[property];

  const {[property]: originalProp} = document;
  delete document[property];

  beforeAll(() => {
    Object.defineProperty(window, property, {
      configurable: true,
      writable: true,
      value
    });

    Object.defineProperty(document, property, {
      configurable: true,
      writable: true,
      value
    });
  });
  afterAll(() => {
    window[property] = originalProperty;
    document[property] = originalProp;
  });
};

export const mock = () => {
  mockWindowProperty('localStorage', {
    setItem: jest.fn((key, value) => window.localStorage[key] = value),
    getItem: jest.fn(key => window.localStorage[key]),
    removeItem: jest.fn(key => window.localStorage[key] = null)
  });
};
