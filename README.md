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

Additionally, by making this code available online, I hope that it might be useful in helping other composers and performers to build similar interfaces for their musical projects.

dp - August 2018

----------------------------------------------
