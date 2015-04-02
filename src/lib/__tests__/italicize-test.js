'use strict';

jest.dontMock('../italicize');

describe('italicize', () => {
  let italicize;

  beforeEach(() => {
    italicize = require('../italicize');
  });

  it('wraps text between *s in <span class="italic"></span>', () => {
    let text = "I _should_ be italic.";

    expect(italicize(text)).toEqual(
      `I <span class="italic">should</span> be italic.`
    );
  });
});
