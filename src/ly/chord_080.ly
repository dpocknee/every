\version "2.12"
\paper{
indent=0\mm
line-width=120\mm
oddFooterMarkup=##f
oddHeaderMarkup=##f
bookTitleMarkup = ##f
scoreTitleMarkup = ##f
}
guitarmusic = {
\time 4/4
<e''\harmonic\1 e\harmonic\6 >1 |
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
\guitarmusic
}
\new Staff {
\clef "treble_8"
\guitarmusic
}
>>
}
