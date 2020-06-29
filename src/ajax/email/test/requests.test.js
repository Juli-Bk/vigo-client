import emailRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

describe('emailRequests has methods for all operations', () => {
  it('sendEmail', () => {
    expect(emailRequests).toHaveProperty('sendEmail');
  });
});

describe('all emailRequests methods return Promise', () => {
  it('sendEmail', () => {
    const rez = emailRequests.sendEmail({
      subject: 'letter subject',
      text: 'letter text',
      to: 'addressToSentEmail@gmail.com',
      from: 'vigo.shop.official@gmail.com'
    });
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('emailRequests methods throws errors ', () => {
  describe('getUser ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        emailRequests.sendEmail();
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when formData is empty object', () => {
      function testCheck () {
        emailRequests.sendEmail({});
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
