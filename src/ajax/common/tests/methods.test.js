import requestMethods from '../methods';

describe('ajax methods config', () => {
  it('returns right config for GET method', () => {
    expect(requestMethods.GET.method).toEqual('GET');
    expect(requestMethods.GET.redirect).toEqual('follow');
  });
  it('returns right config for PUT method', () => {
    expect(requestMethods.PUT.method).toEqual('PUT');
    expect(requestMethods.PUT.redirect).toEqual('follow');
  });
  it('returns right config for POST method', () => {
    expect(requestMethods.POST.method).toEqual('POST');
    expect(requestMethods.POST.redirect).toEqual('follow');
  });
  it('returns right config for DELETE method', () => {
    expect(requestMethods.DELETE.method).toEqual('DELETE');
    expect(requestMethods.DELETE.redirect).toEqual('follow');
  });
});
