'use strict';

jest.dontMock('../app_actions');

describe('AppActions', () => {
  it('exports an instance of Wegen', () => {
    let AppActions = require('../app_actions');
    let Wegen = require('wegen');

    expect(AppActions instanceof Wegen).toBe(true);
  });
});
