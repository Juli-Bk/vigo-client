import requestPaths, {baseUrl} from '../paths';

describe('ajax paths config', () => {
  describe('returns right path for products requests', () => {
    it('plain', () => {
      expect(requestPaths.products).toEqual(`${baseUrl}/products`);
    });
    it('filter', () => {
      expect(requestPaths.productsFilter).toEqual(`${baseUrl}/products/filter?`);
    });
    it('search', () => {
      expect(requestPaths.productsSearch).toEqual(`${baseUrl}/products/search`);
    });
  });

  describe('returns right path for users requests', () => {
    it('plain', () => {
      expect(requestPaths.users).toEqual(`${baseUrl}/users`);
    });
    it('customer', () => {
      expect(requestPaths.customer).toEqual(`${baseUrl}/users/customer`);
    });
    it('register', () => {
      expect(requestPaths.register).toEqual(`${baseUrl}/users/register`);
    });
    it('password', () => {
      expect(requestPaths.password).toEqual(`${baseUrl}/users/password`);
    });
    it('login', () => {
      expect(requestPaths.login).toEqual(`${baseUrl}/users/login`);
    });
  });

  describe('returns right path for subscribers requests', () => {
    it('plain', () => {
      expect(requestPaths.subscribers).toEqual(`${baseUrl}/subscribers`);
    });
    it('subscribe', () => {
      expect(requestPaths.subscribe).toEqual(`${baseUrl}/subscribers/subscribe`);
    });
    it('unsubscribe', () => {
      expect(requestPaths.unsubscribe).toEqual(`${baseUrl}/subscribers/unsubscribe`);
    });
  });

  describe('returns right path for categories requests', () => {
    it('plain', () => {
      expect(requestPaths.categories).toEqual(`${baseUrl}/categories`);
    });
  });

  describe('returns right path for wishlist requests', () => {
    it('plain', () => {
      expect(requestPaths.wishlist).toEqual(`${baseUrl}/wishlist`);
    });
  });

  describe('returns right path for colors requests', () => {
    it('plain', () => {
      expect(requestPaths.colors).toEqual(`${baseUrl}/colors`);
    });
  });
  describe('returns right path for sizes requests', () => {
    it('plain', () => {
      expect(requestPaths.sizes).toEqual(`${baseUrl}/sizes`);
    });
  });
});
