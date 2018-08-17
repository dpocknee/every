The <i>Every</i> Composer App
_____________________________

Hi, I'm David Pocknee and this is an app I created in 2018 to help me finish composing my guitar piece <i>Every</i>, which I started in 2013.  <i>Every</i> is around 10 minutes in length and is "a compendium of    almost every playable guitar chord of 1-6 notes solely containing the note E and consisting only of fingered pitches or natural harmonics (up to the 5th partial)".

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
- The percentage of notes in the chord that are harmonics.</li>
- A histogram showing how the sounding pitches in each chord are distributed over the five possible octaves.</li>
- The chord represented in tablature and standard guitar notation.

You can see which statistic you are looking at by hovering your mouse over it.

As well as being a tool for me, the composer, I also thought that it could be used by performers of the work to make fine-tuning adjustments to the order of chords in the piece in order to aid playability, 
and personalize and shape the work according to the idiosyncracies of their playing and instrument.

Additionally, by making this code available online, I hope that it might be useful in helping other composers and performers to build similar interfaces to help with their musical projects.

dp - August 2018

----------------------------------------------

DIAGRAM OF THE MAIN COMPONENTS (I haven't bothered including layout components

      index.html (main page)
      + timing.js (JSON formatted list of all timings of chords - loaded into window.timing variable)
      + chords.js (JSON formatted list of all chords with notation and all stats - loaded into window.chords variable)
      + a window.mainArray variable which contains the current order of chords
        and can be read and written to by both React and webaudio 
 ____________________________________________________|___________________________________ 
 |                      |
 V                      V
App.js                     webaudio.js 
 |                    (handles all audio playback
 V                    using webaudio)
Grid.js       <------ Page.js
(The entire grid)     (Monitors movement of blocks) 
 |_________________________________________________________
 V        |        |
GridSquare.js       V        V
(This controls the drag   Slider.js   Lilypond.js
and drop for each grid square)  (The playback slider) (checks and updates arrays for conversion into lilypond.)
 |                 |
 V                 V
Square.js         lilypondgenerator.php
(The visual component loaded      (converts arrays into lilypond format) 
into each GridSquare)


Block.js (The block that can be moved around)

------------------------------------
NOTE: In order to have React and webaudio work together without using some type of intermediary state management framework, 
they are kept completely separate and have no idea what each other is doing.  The only variables they both have access to are:
window.mainArray
window.timing
window.chords 
and
webaudio.js is able to get the value of the playback slider to know where to start
using a document.getElementById('playback').value command