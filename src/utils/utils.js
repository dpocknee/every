const { uniq } = require('lodash');

const arrayInputTest = (arrayToTest, maximumChords) => {
  // Tests if the array is a valid javascript array and features valid chord numbers.
  // maximum variable is the maximum value a chord can have, normally this is 319.
  const arrayErrors = [];

  try {
    JSON.parse(arrayToTest);
  } catch (err) {
    arrayErrors.push('ERROR: This is not a valid array.');
  }

  if (arrayErrors.length === 0) {
    const parsedChordArray = JSON.parse(arrayToTest);
    if (!Array.isArray(parsedChordArray)) {
      arrayErrors.push('ERROR: This is not a valid array.');
    } else {
      parsedChordArray.forEach(chordNumber => {
        if (isNaN(chordNumber) === true) arrayErrors.push(`ERROR: ${chordNumber} is not a number.`);
        if (chordNumber < 0 || chordNumber > maximumChords) arrayErrors.push(`ERROR: ${chordNumber} is not a valid chord number.`);
      });
      if (parsedChordArray.length !== maximumChords) {
        arrayErrors.push(
          `ERROR: There are ${parsedChordArray.length} chords in this array, not ${maximumChords}.`,
        );
      }
      if (uniq(parsedChordArray).length !== parsedChordArray.length) arrayErrors.push('ERROR: Duplicated chords not allowed.');
    }
  }
  // duplicates
  const isError = arrayErrors.length > 0;
  return { error: isError, errorString: arrayErrors.join('  ') };
};

const arrayInputFeedback = (errorObj, orderType) => {
  let arrayStatus = '';
  if (errorObj.error) {
    arrayStatus += errorObj.errorString;
  } else {
    arrayStatus += `${orderType} of chords successfully loaded.`;
  }
  return arrayStatus;
};

module.exports = { arrayInputTest, arrayInputFeedback };
