
\header {
	title = \markup { \fontsize #1 \typewriter "Every" }
	subtitle = \markup { \fontsize #1 \typewriter "for guitar"}
	composer = \markup { \fontsize #1 \typewriter "David Pocknee (2018)"}
	tagline = ""  % removed 
}


\score {
\new PianoStaff \with {
	instrumentName = #"Guitar"
	\override StaffGrouper.	staffgroup-staff-spacing.basic-distance = #34
	}
	<<
	\new TabStaff \with {
		  \override StaffSymbol.staff-space = #1.1
  			\override TextScript.font-family = #'typewriter
			\override TextScript.font-shape = #'italic
			\override TextScript.font-series = #'bold
			\override TextScript.font-size = #2
  			\override TupletNumber.font-family = #'typewriter
		}{
			\numericTimeSignature
			\tabFullNotation
			\tempo 4=60
			\override TupletNumber.text = #tuplet-number::calc-fraction-text
			\override TupletBracket.bracket-visibility = ##t
			\override Stem.direction = #up
			\override Beam.positions = #'(5 . 5)
			\override TextSpanner.positions = #'(15 . 15)
			\override TextSpanner.bound-padding = #1.0
			\override TextSpanner.style = #'dashed-line
			\override TextSpanner.bound-details.right.padding = #0.6
			\override DynamicText.style = #'dashed-line 
			\tabmusic 
	}
	\new Staff {
		\clef "treble_8"
		\numericTimeSignature
		\override TupletNumber.text = #tuplet-number::calc-fraction-text
		\override TupletBracket.bracket-visibility = ##t
		\override TupletNumber.font-family = #'typewriter
		\override Stem.direction = #up
		\override Beam.positions = #'(8 . 8)
		\set fingeringOrientations = #'(down)
		\set stringNumberOrientations = #'(down)
		\set strokeFingerOrientations = #'(down)
		\override DynamicTextSpanner.style = #'dashed-line 
		\guitarmusic
	}	
>>
\layout {
	#(set-default-paper-size "a4" 'portrait)
	 #(layout-set-staff-size 14)
	\context {
		\Score 
		\override Score.Tuplet.font-family = #"Computer Modern"
		\override Staff.TimeSignature.font-name = #"Computer Modern"
		}
	}
}