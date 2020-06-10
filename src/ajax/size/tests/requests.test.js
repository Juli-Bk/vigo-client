import sizesRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('sizesRequests has methods for all operations', () => {
  it('getAllSizes', () => {
    expect(sizesRequests).toHaveProperty('getAllSizes');
  });
  it('getSizeById', () => {
    expect(sizesRequests).toHaveProperty('getSizeById');
  });
  it('addSize', () => {
    expect(sizesRequests).toHaveProperty('addSize');
  });
  it('updateSizeById', () => {
    expect(sizesRequests).toHaveProperty('updateSizeById');
  });
  it('deleteSizeById', () => {
    expect(sizesRequests).toHaveProperty('deleteSizeById');
  });
  it('deleteAllSizes', () => {
    expect(sizesRequests).toHaveProperty('deleteAllSizes');
  });
});

describe('all sizesRequests methods return Promise', () => {
  it('getAllSizes', () => {
    const rez = sizesRequests.getAllSizes();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getSizeById', () => {
    const rez = sizesRequests.getSizeById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addSize', () => {
    const rez = sizesRequests.addSize('size', 'type');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateSizeById', () => {
    const rez = sizesRequests.updateSizeById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteSizeById', () => {
    const rez = sizesRequests.deleteSizeById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllSizes', () => {
    const rez = sizesRequests.deleteAllSizes();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('sizesRequests methods throws errors ', () => {
  describe('getSizeById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        sizesRequests.getSizeById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateSizeById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        sizesRequests.updateSizeById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        sizesRequests.updateSizeById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addSize ', () => {
    it('throws an error when name is not specified', () => {
      function testCheck () {
        sizesRequests.addSize('', 'typesize');
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when type is not specified', () => {
      function testCheck () {
        sizesRequests.addSize('name', '');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateSizeById ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        sizesRequests.updateSizeById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteSizeById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        sizesRequests.deleteSizeById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
