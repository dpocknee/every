const { uniq } = require('lodash');

export const arrayInputTest = (arrayToTest, maximumChords, startingNumber) => {
  // Tests if the array is a valid javascript array and features valid chord numbers.
  // maximum variable is the maximum value a chord can have, normally this is 319.
  const arrayErrors = [];
  let inputArray = [];

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
        if (chordNumber < startingNumber || chordNumber >= startingNumber + maximumChords) arrayErrors.push(`ERROR: ${chordNumber} is not a valid chord number.`);
      });
      if (parsedChordArray.length !== maximumChords) {
        arrayErrors.push(
          `ERROR: There are ${parsedChordArray.length} chords in this array, not ${maximumChords}.`,
        );
      }
      if (uniq(parsedChordArray).length !== parsedChordArray.length) arrayErrors.push('ERROR: Duplicate chords not allowed.');
      inputArray = [...parsedChordArray];
    }
  }
  const isError = arrayErrors.length > 0;
  return { isError, errorString: arrayErrors.join('  '), inputArray };
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

export const colourInterpolator = (startingColor, endingColor, value) => {
  // Interpolates between two colours according to a value between 0 and 1.
  // Colors should be entered as an array of 3 RGB values.
  const red = (endingColor[0] - startingColor[0]) * value + startingColor[0];
  const green = (endingColor[1] - startingColor[1]) * value + startingColor[1];
  const blue = (endingColor[2] - startingColor[2]) * value + startingColor[2];
  return `rgb('${red}', '${green}', '${blue}')`;
};
