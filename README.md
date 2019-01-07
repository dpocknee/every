# The **Every** Guitar Piece Composition App

An online composition tool made to aid composition of the guitar piece "Every". By interacting with the browser-based app, a user can easily re-order all 319 chords used in the piece via a drag-n-drop interface, listen to the result and also create the notation in lilypond format.

The app was written using node.js, React, and the webaudio API.

A working version of the app can be found online at [http://www.davidpocknee.com/every](http://www.davidpocknee.com/every).

## More Info

Hi, I'm David Pocknee and this is an app I created in 2018 to help me finish composing my guitar piece **Every**, which I started in 2013. **Every** is around 10 minutes in length and is "a compendium of almost every playable guitar chord of 1-6 notes solely containing the note E and consisting only of fingered pitches or natural harmonics (up to the 5th partial)".

This app was built with ReactJS and the webaudio API, and allows the user to drag and drop all 319 chords in the piece into an order of their choice. A sythesized version of the re-ordered piece (algorithmically spliced together from samples) can then be played back by clicking the play and stop buttons in the bottom right of the window.

The slider in the bottom left of the window can be used to choose the chord from which this playback starts.

After you have decided upon an order of chords that you like, it can be converted into musical notation in the liypond format by using the controls at the bottom of the window.

Each chord is represented by a set of statistics to help aid its ordering:

- A chord reference number (e.g. chord_123).
  - This is color-coded according to the duration before the next chord.
  - long=green, short=red.
- A color-coded rating of how difficult the chord is to play
  - 1=easy/green, 9=very difficult/red).
  - By matching the colors of the chord number and the difficulty, you can ensure that the most difficult chords only occur in parts of the piece where there is a large amount of time for their preparation and execution.
- The number of notes in the chord (also color-coded - the more notes the darker the color).
- The percentage of notes in the chord that are harmonics.
- A histogram showing how the sounding pitches in each chord are distributed over the five possible octaves.
- The chord represented in tablature and standard guitar notation.

You can see which statistic you are looking at by hovering your mouse over it.

As well as being a tool for me, the composer, I also thought that it could be used by performers of the work to make fine-tuning adjustments to the order of chords in the piece in order to aid playability,
and personalize and shape the work according to the idiosyncracies of their playing and instrument.

Additionally, by making this code available online, I hope that it might be useful in helping other composers and performers to build similar interfaces for their musical projects.

dp

- originally finished August 2018, revised January 2019

## Getting Started

To run the React side of the application:

- Firstly, make sure you have `node.js` installed.
- Clone this repo to your hard drive.
- Navigate inside the folder and run `npm install` in the terminal to install any dependencies.
- Run `npm start` in the terminal and local version of the site will be run in a web browser.

### Prerequisites

You will need:

- `node.js` for running the javascript.
- A web browser.
- The music typesetting software [lilypond](http://lilypond.org) for setting the notation after the code for it has been created.
- Some type of local php server (such as [EasyPHP](https://www.easyphp.org)) for running the php code that creates the lilypond notation. In order for this to work locally, the url `http://davidpocknee.ricercata.org/every/lilypond/lilypondgenerator.php` referenced in the form at line 133 `src/components/Lilypond.jsx` should be changed to the address of your php file when running on your local server (e.g. `localhost:3000/lilypondgenerator.php` - this will depend on the way your server is set up).

## Tests

A small amount of testing was done for a form validation function held in `src/utils/utils.js`. This was written using `mocha` and `chai`.

## Deployment

The terminal command `npm build` can be used to create a production version of the app that can then be placed online. Again, the url to the php file in `src/components/Lilypond.jsx`, mentioned above will need to be changed to the location this file is found on the public server.

## Built With

- node.js
- React
- webaudio
- react-dnd
- mocha, chai

## Authors

- **David Pocknee**

## License

Anti-copyright
