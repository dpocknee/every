\version "2.12"
\paper {
     system-system-spacing #'basic-distance = #25
     score-system-spacing =
       #'((basic-distance . 25)
          (minimum-distance . 25)
          (padding . 15)
          (stretchability . 2))
}

inv =
#(define-music-function
	(parser location note)
	(ly:music?)
#{
	\once \override NoteHead.transparent = ##t
	\once \override TabNoteHead.transparent = ##t
	#note
#})

lbeam = {
  \set stemLeftBeamCount = #1 
}

rbeam = {
  \set stemRightBeamCount = #1 
}

thirdnote = {
  \once \override NoteHead.X-offset = #2.0
  \once \override Stem.transparent = ##t
  \set fingeringOrientations = #'(down)
  \set stringNumberOrientations = #'(down)
  \set strokeFingerOrientations = #'(down)
}
