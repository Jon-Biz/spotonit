var sinon = require('sinon');
require('jasmine-sinon');

describe("jasmine-node", function() {
  it("should evalutate this", function() {
    expect(1).toEqual(1);
  });
  it("should include sinon spies and matchers", function() {
  	var spy = sinon.spy();
    expect(spy).not.toHaveBeenCalled();
    spy()
    expect(spy).toHaveBeenCalled();

  });
});