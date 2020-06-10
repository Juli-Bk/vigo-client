import colorRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('colorRequests has methods for all operations', () => {
  it('getAllColors', () => {
    expect(colorRequests).toHaveProperty('getAllColors');
  });
  it('getColorById', () => {
    expect(colorRequests).toHaveProperty('getColorById');
  });
  it('addColor', () => {
    expect(colorRequests).toHaveProperty('addColor');
  });
  it('updateColorById', () => {
    expect(colorRequests).toHaveProperty('updateColorById');
  });
  it('deleteColorById', () => {
    expect(colorRequests).toHaveProperty('deleteColorById');
  });
  it('deleteAllColors', () => {
    expect(colorRequests).toHaveProperty('deleteAllColors');
  });
});

describe('all colorRequests methods return Promise', () => {
  it('getAllColors', () => {
    const rez = colorRequests.getAllColors();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getColorById', () => {
    const rez = colorRequests.getColorById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addColor', () => {
    const rez = colorRequests.addColor('name', 'baseName');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateColorById', () => {
    const rez = colorRequests.updateColorById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteColorById', () => {
    const rez = colorRequests.deleteColorById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllColors', () => {
    const rez = colorRequests.deleteAllColors();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('colorRequests methods throws errors ', () => {
  describe('getColorById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        colorRequests.getColorById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateColorById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        colorRequests.updateColorById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        colorRequests.updateColorById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addColor ', () => {
    it('throws an error when name is not specified', () => {
      function testCheck () {
        colorRequests.addColor('', 'baseColorName');
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when baseColorName is not specified', () => {
      function testCheck () {
        colorRequests.addColor('name', '');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateColorById ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        colorRequests.updateColorById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteColorById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        colorRequests.deleteColorById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
