\version "2.12"
\paper{
indent=0\mm
line-width=120\mm
oddFooterMarkup=##f
oddHeaderMarkup=##f
bookTitleMarkup = ##f
scoreTitleMarkup = ##f
}
thirdnote = {
\once \override NoteHead.X-offset = #4.0
\once \override Stem.transparent = ##t
\set fingeringOrientations = #'(down)
\set stringNumberOrientations = #'(down)
\set strokeFingerOrientations = #'(down)
}
guitarmusic = {
\time 4/4
 <e''\1 e''\2  >
1 |
}
tabmusic = {
\time 4/4
  <e''\1 e''\2  >
1 |
}
\score {
\new PianoStaff \with {
\override Score.BarNumber.break-visibility = ##(#f #f #f)
\override Clef.stencil = ##f
\override ClefModifier.stencil = ##f
\override KeySignature.stencil = ##f
\override TimeSignature.stencil = ##f
\override SystemStartBrace.stencil = ##f
\override SystemStartLine.stencil = ##f
}<<
\new TabStaff {
\override Staff.Clef.stencil = ##f
\tabmusic
}
\new Staff {
\clef "treble_8"
\guitarmusic
}
>>
}
