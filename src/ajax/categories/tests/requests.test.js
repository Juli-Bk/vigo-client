import categoriesRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('categoriesRequests has methods for all operations', () => {
  it('getAllCategories', () => {
    expect(categoriesRequests).toHaveProperty('getAllCategories');
  });
  it('getCategoryById', () => {
    expect(categoriesRequests).toHaveProperty('getCategoryById');
  });
  it('addCategory', () => {
    expect(categoriesRequests).toHaveProperty('addCategory');
  });
  it('updateCategoryById', () => {
    expect(categoriesRequests).toHaveProperty('updateCategoryById');
  });
  it('deleteCategoryById', () => {
    expect(categoriesRequests).toHaveProperty('deleteCategoryById');
  });
  it('deleteAllCategories', () => {
    expect(categoriesRequests).toHaveProperty('deleteAllCategories');
  });
});

describe('all categoriesRequests methods return Promise', () => {
  it('getAllCategories', () => {
    const rez = categoriesRequests.getAllCategories();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getCategoryById', () => {
    const rez = categoriesRequests.getCategoryById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addCategory', () => {
    const rez = categoriesRequests.addCategory({});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateCategoryById', () => {
    const rez = categoriesRequests.updateCategoryById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteCategoryById', () => {
    const rez = categoriesRequests.deleteCategoryById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllCategories', () => {
    const rez = categoriesRequests.deleteAllCategories();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('categoriesRequests methods throws errors ', () => {
  describe('getCategoryById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        categoriesRequests.getCategoryById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addCategory ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        categoriesRequests.addCategory();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateCategoryById ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        categoriesRequests.updateCategoryById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });

    it('throws an error when id is not specified', () => {
      function testCheck () {
        categoriesRequests.updateCategoryById(undefined);
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
