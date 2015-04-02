'use strict';

jest.dontMock('../boldize');

describe('boldize', () => {
  let boldize;

  beforeEach(() => {
    boldize = require('../boldize');
  });

  it('wraps text between *s in <span class="bold"></span>', () => {
    let text = "I *should* be bold.";

    expect(boldize(text)).toEqual(`I <span class="bold">should</span> be bold.`);
  });
});
