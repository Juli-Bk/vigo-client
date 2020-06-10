import sizesTablesRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('sizesTablesRequests has methods for all operations', () => {
  it('getAllSizeTables', () => {
    expect(sizesTablesRequests).toHaveProperty('getAllSizeTables');
  });
  it('getSizeTableByProductId', () => {
    expect(sizesTablesRequests).toHaveProperty('getSizeTableByProductId');
  });
  it('addSizeTable', () => {
    expect(sizesTablesRequests).toHaveProperty('addSizeTable');
  });
  it('updateSizeTableById', () => {
    expect(sizesTablesRequests).toHaveProperty('updateSizeTableById');
  });
  it('deleteSizeTableById', () => {
    expect(sizesTablesRequests).toHaveProperty('deleteSizeTableById');
  });
  it('deleteAllSizeTables', () => {
    expect(sizesTablesRequests).toHaveProperty('deleteAllSizeTables');
  });
});

describe('all sizesTablesRequests methods return Promise', () => {
  it('getAllSizeTables', () => {
    const rez = sizesTablesRequests.getAllSizeTables();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getSizeTableByProductId', () => {
    const rez = sizesTablesRequests.getSizeTableByProductId('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addSizeTable', () => {
    const rez = sizesTablesRequests.addSizeTable('5eb302600b88a114a9daec58',
      '5eb302600b88a114a9daec58', [{bust: {inches: 10, cm: 12 }}]);
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateSizeTableById', () => {
    const rez = sizesTablesRequests.updateSizeTableById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteSizeTableById', () => {
    const rez = sizesTablesRequests.deleteSizeTableById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllSizeTables', () => {
    const rez = sizesTablesRequests.deleteAllSizeTables();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('sizesTablesRequests methods throws errors ', () => {
  describe('getSizeTableByProductId ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        sizesTablesRequests.getSizeTableByProductId();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateSizeTableById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        sizesTablesRequests.updateSizeTableById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        sizesTablesRequests.updateSizeTableById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addSizeTable ', () => {
    it('throws an error when productId is not specified', () => {
      function testCheck () {
        sizesTablesRequests.addSizeTable('', '5eb302600b88a114a9daec58', []);
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when sizeId is not specified', () => {
      function testCheck () {
        sizesTablesRequests.addSizeTable('5eb302600b88a114a9daec58', '');
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when measurements is not specified', () => {
      function testCheck () {
        sizesTablesRequests.addSizeTable('5eb302600b88a114a9daec58',
          '5eb302600b88a114a9daec58', []);
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteSizeTableById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        sizesTablesRequests.deleteSizeTableById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
