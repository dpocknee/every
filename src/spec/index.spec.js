/* eslint no-undef: 0 */
const { expect } = require('chai');
const { arrayInputFeedback, arrayInputTest } = require('../utils/utils');
const { uniq } = require('lodash');

describe('arrayInputTest: checks array validation works ', () => {
  it('returns no error if the input is an array', () => {
    const expected = { error: false, errorString: '' };
    expect(arrayInputTest('[1]', 1)).to.eql(expected);
  });
  it('returns an error if the input is a string', () => {
    const expected = { error: true, errorString: 'ERROR: This is not a valid array.' };
    expect(arrayInputTest('hahah', 3)).to.eql(expected);
  });
  it('returns an error if the input is a number', () => {
    const expected = { error: true, errorString: 'ERROR: This is not a valid array.' };
    expect(arrayInputTest('5', 3)).to.eql(expected);
  });
  it('returns an error if the input is a object', () => {
    const expected = { error: true, errorString: 'ERROR: This is not a valid array.' };
    expect(arrayInputTest("{ hello: 'home' }", 3)).to.eql(expected);
  });
  it('returns no error if the input is an array whose length matches the second argument.', () => {
    const expected = { error: false, errorString: '' };
    expect(arrayInputTest('[1, 3, 2, 5, 4]', 5)).to.eql(expected);
  });
  it('returns an error if the input is an array whose length is more than the second argument.', () => {
    const expected = {
      error: true,
      errorString:
        'ERROR: 5 is not a valid chord number.  ERROR: There are 5 chords in this array, not 4.',
    };
    expect(arrayInputTest('[1, 3, 2, 5, 4]', 4)).to.eql(expected);
  });
  it('returns an error if the input is an array whose length does not match the second argument.', () => {
    const expected = {
      error: true,
      errorString: 'ERROR: There are 4 chords in this array, not 5.',
    };
    expect(arrayInputTest('[1, 3, 2, 5]', 5)).to.eql(expected);
  });
  it('returns an error if the input contains an element which is not a number.', () => {
    const expected = {
      error: true,
      errorString: 'ERROR: ha is not a number.',
    };
    expect(arrayInputTest('[1, 3, "ha"]', 3)).to.eql(expected);
  });
  it('returns an error if the input contains chord numbers above the number of chords.', () => {
    const expected = {
      error: true,
      errorString: 'ERROR: 4 is not a valid chord number.',
    };
    expect(arrayInputTest('[1, 3, 4]', 3)).to.eql(expected);
  });
  it('returns an error if the input contains chord numbers below the number of chords.', () => {
    const expected = {
      error: true,
      errorString: 'ERROR: -4 is not a valid chord number.',
    };
    expect(arrayInputTest('[1, 3, -4]', 3)).to.eql(expected);
  });
  it('returns an error if there are duplicate inputs.', () => {
    const expected = {
      error: true,
      errorString: 'ERROR: Duplicated chords not allowed.',
    };
    const actual = arrayInputTest('[1, 3, 1]', 3);
    expect(actual).to.eql(expected);
  });
});
