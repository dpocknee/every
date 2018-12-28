/* eslint no-undef: 0 */
const { expect } = require('chai');
const { arrayInputFeedback, arrayInputTest } = require('../utils/utils');

describe('arrayInputTest: checks array validation works ', () => {
  it('returns no error if the input is an array', () => {
    const expected = { isError: false, errorString: '' };
    expect(arrayInputTest('[1]', 1, 1)).to.include(expected);
  });
  it('returns an error if the input is a string', () => {
    const expected = { isError: true, errorString: 'ERROR: This is not a valid array.' };
    expect(arrayInputTest('hahah', 3, 1)).to.include(expected);
  });
  it('returns an error if the input is a number', () => {
    const expected = { isError: true, errorString: 'ERROR: This is not a valid array.' };
    expect(arrayInputTest('5', 3, 1)).to.include(expected);
  });
  it('returns an error if the input is a object', () => {
    const expected = { isError: true, errorString: 'ERROR: This is not a valid array.' };
    expect(arrayInputTest("{ hello: 'home' }", 3, 1)).to.include(expected);
  });
  it('returns no error if the input is an array whose length matches the second argument.', () => {
    const expected = { isError: false, errorString: '' };
    expect(arrayInputTest('[1, 3, 2, 5, 4]', 5, 1)).to.include(expected);
  });
  it('returns no error if the input is an array whose length matches the second argument (starting at 0).', () => {
    const expected = { isError: false, errorString: '' };
    expect(arrayInputTest('[0, 2, 1, 4, 3]', 5, 0)).to.include(expected);
  });
  it('returns an error if the input is an array whose length is more than the second argument.', () => {
    const expected = {
      isError: true,
      errorString:
        'ERROR: 5 is not a valid chord number.  ERROR: There are 5 chords in this array, not 4.',
    };
    expect(arrayInputTest('[1, 3, 2, 5, 4]', 4, 1)).to.include(expected);
  });
  it('returns an error if the input is an array whose length does not match the second argument.', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: There are 4 chords in this array, not 5.',
    };
    expect(arrayInputTest('[1, 3, 2, 5]', 5, 1)).to.include(expected);
  });
  it('returns an error if the input contains an element which is not a number.', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: ha is not a number.',
    };
    expect(arrayInputTest('[1, 3, "ha"]', 3, 1)).to.include(expected);
  });
  it('returns an error if the input contains chord numbers above the number of chords.', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: 4 is not a valid chord number.',
    };
    expect(arrayInputTest('[1, 3, 4]', 3, 1)).to.include(expected);
  });
  it('returns an error if the input contains chord numbers below the number of chords.', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: -4 is not a valid chord number.',
    };
    expect(arrayInputTest('[1, 3, -4]', 3, 1)).to.include(expected);
  });
  it('returns an error if the input contains chord numbers above the number of chords (starting at 0).', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: 3 is not a valid chord number.',
    };
    expect(arrayInputTest('[0, 2, 3]', 3, 0)).to.include(expected);
  });
  it('returns an error if the input contains chord numbers below the number of chords (starting at 0).', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: -3 is not a valid chord number.',
    };
    expect(arrayInputTest('[0, 2, -3]', 3, 0)).to.include(expected);
  });
  it('returns no error if the output is within the maximum number of chords (starting at 0).', () => {
    const expected = {
      isError: false,
      errorString: '',
    };
    expect(arrayInputTest('[0, 2, 1]', 3, 0)).to.include(expected);
  });
  it('returns an error if there are duplicate inputs.', () => {
    const expected = {
      isError: true,
      errorString: 'ERROR: Duplicate chords not allowed.',
    };
    const actual = arrayInputTest('[1, 3, 1]', 3, 1);
    expect(actual).to.include(expected);
  });
});
