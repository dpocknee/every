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

tabmusic = {
%BAR 1
\time 3/8   \tuplet 3/2 {\inv g'16 Z16^"N" \inv g'16\startTextSpan} \inv g'8  \inv g'8 | 
\time 5/4  R1*5/4   | 
\time 5/8   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 5/4  R1*5/4   | 
\time 5/8  \inv g'4 \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/4  R1*5/4   | 
\time 5/8  \inv g'4 \inv g'8 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 5/4  R1*5/4   | 
\time 3/8   \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/4  R1*5/4   | 
% BAR 11
\time 9/8   \tuplet 8/9 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 4/4   \tuplet 9/8 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 9/8   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16} \inv g'8 \tuplet 5/6 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/8   \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 3/8   \inv g'8 \inv g'8 \tuplet 3/2 {\inv g'16\stopTextSpan \inv g'16 Z16^"SP"}  | 
\time 3/4   \inv g'4\startTextSpan \inv g'8 Z8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/8   \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\inv g'16 Z16 \inv g'16 \inv g'16 \tuplet 5/3 {Z8 \inv g'8 Z8 \inv g'8 Z8}  | 
\time 3/8   \inv g'16 Z16 \inv g'16 \rbeam Z16 \lbeam \tuplet 3/2 { \inv g'16\stopTextSpan Z16 \inv g'16^"XSP"}  | 
   Z8 \startTextSpan \tuplet 3/2 {Z16 \inv g'16 Z16} \tuplet 3/2 {\inv g'16 Z16 \inv g'16}  | \pageBreak
% BAR 21
\time 11/8
\tuplet 4/5 {
  Z16 
  Z16  
  Z16 
  Z16
  }
  Z16 
  Z16 
  Z16 
  Z16 
\tuplet 5/4 {
  Z16
  Z16 
  Z16 
  Z16 
  Z16 
  }
  Z16 
  Z16
  Z16 
  Z16 
\tuplet 4/5 {
  Z16 \stopTextSpan 
  Z16 
  Z16^"SP" 
  Z16}
   | 

\time 3/8 \tuplet 3/2 {Z8 \startTextSpan Z8  Z8} \tuplet 3/2 {Z16 \inv g'16 Z16}  | 
\time 9/8   \tuplet 5/4 {\inv g'16 Z16 \inv g'16 Z16 \rbeam \inv g'16 \stopTextSpan} \lbeam \tuplet 5/4 {Z16^"N" \inv g'16 Z16 \startTextSpan \inv g'16 \inv g'16} Z8 Z8 \tuplet 3/2 {Z8 \inv g'8 Z8} \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 2/4   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'8 Z8  | 
\time 3/8   \inv g'8 Z8 \inv g'8  | 
\time 5/4   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'8 \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} Z4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/8   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 4/4   \inv g'4 \inv g'8 \stopTextSpan \tuplet 6/5 {\inv g'8 Z8^"ST" \inv g'8 \inv g'8 \startTextSpan \inv g'8 \inv g'8}  | 
\time 3/4   \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 5/4   \inv g'4 \tuplet 9/8 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
% BAR 31
\time 3/8   \inv g'8 Z8 \inv g'8   | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\inv g'4 \inv g'4 \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \inv g'4 \inv g'4 \inv g'4  \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
  R1*5/4   | 
\time 3/8   \tuplet 5/4 {\inv g'16 Z16 \inv g'16 \inv g'16 \inv g'16} \inv g'8  | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \inv g'4 \inv g'4 \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
   \inv g'4 \inv g'4 \inv g'4 \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 41
\time 4/4   \inv g'4 \inv g'4 \inv g'4  \inv g'8 Z8  | \pageBreak
\time 3/4   \inv g'4 \inv g'4 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
   \inv g'4 \inv g'4 \inv g'8 Z8  | 
\time 2/4   \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \stopTextSpan \inv g'8 Z8^"XST" \inv g'8} \inv g'8 \startTextSpan \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} Z8 \tuplet 3/2 {\inv g'16 \inv g'16 Z16} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \tuplet 5/3 {\inv g'8 Z8 \inv g'8 Z8 \inv g'8}  | 
\time 3/8   Z8 \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'16 Z16  | 
\time 5/8   \tuplet 3/2 {\inv g'16 \inv g'16 Z16} \inv g'8 \tuplet 5/4 {Z16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'16 Z16  | 
\time 3/8   \tuplet 5/4 {\inv g'16 \stopTextSpan \inv g'16 Z16^"N" \inv g'16 \inv g'16 \startTextSpan } \tuplet 3/2 {\inv g'16 Z16 \inv g'16}  | 
\time 5/4   \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16} \tuplet 3/2 {\inv g'8 Z8 \inv g'8} \inv g'16 Z16 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
% BAR 51
\time 3/8   \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 4/4   \inv g'8 \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\time 5/4   \inv g'4 \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 7/8   \inv g'4 \inv g'4 \inv g'4 Z16 \inv g'16  | 
\inv g'4 \inv g'4 \inv g'8 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 4/4  \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \stopTextSpan \inv g'8 Z8^"SP"}  | 
\inv g'4 \inv g'4 \startTextSpan \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
   \inv g'4 \inv g'4 \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
   \tuplet 5/6 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \inv g'16 \inv g'16 \inv g'16 Z16  | 
   \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 61
\time 7/8   \inv g'4 \inv g'4 \inv g'4  Z8  | 
\time 3/4   \inv g'4 \inv g'4 \inv g'8 Z8  | 
\time 9/8   \inv g'4 \inv g'4 \tuplet 6/5 {Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 2/4   \inv g'4 \tuplet 5/4 {\inv g'16 Z16 \inv g'16 \inv g'16 \inv g'16}  | \pageBreak
\time 4/4   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16 \stopTextSpan\inv g'16 Z16^"XSP" \tuplet 3/2 {\inv g'8 \inv g'8 \startTextSpan Z8}  | 
\time 9/8   \inv g'8 Z8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 Z8 \inv g'8 Z8} \inv g'8 Z8  | 
   \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16} \inv g'8 \tuplet 5/4 {Z8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 3/8   \inv g'8 \inv g'16 \inv g'16 \stopTextSpan \inv g'16 Z16^"N"  | 
\time 2/4   \inv g'8 \tuplet 5/3 {\inv g'8 \startTextSpan \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \inv g'4 Z4 \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 71
   \inv g'4 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
   \inv g'8 \stopTextSpan \tuplet 8/9 {\inv g'8 Z8^"ST" \inv g'8 \inv g'8 \startTextSpan \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 7/8   \inv g'8 \tuplet 5/6 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8}  | 
   \inv g'8 \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \stopTextSpan \inv g'16 Z16^"XST" \inv g'16}  | 
\time 5/8   \inv g'4 \startTextSpan \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 3/4   \inv g'4 \inv g'16 Z16 \inv g'16 \inv g'16 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 9/8   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'8 \stopTextSpan \tuplet 5/4 {\inv g'16 Z16^"ST" \inv g'16 \inv g'16 \startTextSpan \inv g'16} \inv g'16 Z16  | 
\time 3/8   \inv g'8 \inv g'16 Z16 \inv g'16 \inv g'16  | 
\time 5/4   \tuplet 3/2 {\inv g'8 Z8 \inv g'8}  \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16 \stopTextSpan } \inv g'4 \tuplet 5/4 {Z8^"N" \inv g'8 \inv g'8 \startTextSpan \inv g'8 Z8}  | 
% BAR 81
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8} \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/8   \inv g'4 \inv g'4  \stopTextSpan Z8^"SP"  | 
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \startTextSpan \inv g'8 \inv g'8 \inv g'8} \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\inv g'4 \tuplet 4/5 {Z8 \inv g'8 \inv g'8 \inv g'8} \inv g'8 Z8 | \pageBreak
\inv g'4 \inv g'4 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 3/8   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'8  | 
\time 5/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \stopTextSpan } \tuplet 4/5 {\inv g'8 \inv g'8 Z8^"XSP" \inv g'8} \inv g'16 \startTextSpan Z16  | 
\time 5/8   \inv g'4 \tuplet 5/3 {Z8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 4/4   \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 Z8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 }  | 
\time 5/4   \inv g'4 \stopTextSpan Z4^"SP" \inv g'8 \tuplet 3/2 {\inv g'8 \startTextSpan Z8 \inv g'8} \inv g'8 \inv g'4  | 
% BAR 91
\time 3/4   Z8 \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/8   \inv g'4. \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \stopTextSpan \inv g'16 Z16^"N"}  | 
\time 3/4   \tuplet 5/4 {\inv g'8 \inv g'8 \startTextSpan \inv g'8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 5/8   \inv g'4 \inv g'4 \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 3/4   \inv g'8 \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \stopTextSpan} \tuplet 5/4 {\inv g'8 \inv g'8 Z8^"ST" \inv g'8 \inv g'8 \startTextSpan} \inv g'16 Z16  | 
\time 7/8   \inv g'4 Z4 \tuplet 5/3 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 2/4   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 5/3 {\inv g'8 \inv g'8 \stopTextSpan \inv g'8 \inv g'8 Z8^"XST"}  | 
\time 4/4   \tuplet 5/4 {\inv g'8 \startTextSpan \inv g'8 \inv g'8 \inv g'8 Z8} \inv g'4 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
% BAR 101
\time 9/8   \inv g'4 \inv g'4 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 3/8   \inv g'8  \stopTextSpan Z8^"ST" \inv g'8 \startTextSpan  | 
\time 4/4   \inv g'4 \inv g'8  \tuplet 6/5 {Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'4 \inv g'16 Z16 \inv g'16 \inv g'16 \stopTextSpan \tuplet 3/2 {\inv g'8 \inv g'8 Z8^"N"} \inv g'4 Z8 \startTextSpan  | 
   \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \inv g'8 \tuplet 4/5 {\inv g'8 Z8 \inv g'8 \inv g'8}  | \pageBreak
\time 3/8   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'4  | 
\time 4/4   \inv g'8 \stopTextSpan \tuplet 6/5 {\inv g'8 Z8^"SP" \inv g'8 \inv g'8 \startTextSpan \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\time 9/8   \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \inv g'16 Z16  | 
\time 5/4   \inv g'8 \tuplet 4/5 {\inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 3/2 {\inv g'8 Z8 \inv g'8} \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 3/8   \inv g'8 \stopTextSpan \inv g'16 \inv g'16 \inv g'16 Z16^"XSP"  | 
% BAR 111
\time 4/4   \inv g'4 \startTextSpan \inv g'8 Z8 \inv g'4 \inv g'16 \inv g'16 Z16 \inv g'16  | 
\time 5/8   \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 4/4   \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 3/8   \inv g'8 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 7/8   \inv g'4 \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \inv g'16 Z16  | 
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} Z4. \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/8   \inv g'4. \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 5/4   \tuplet 5/4 {\inv g'8 \stopTextSpan \inv g'8 \inv g'8 \inv g'8 Z8^"SP"} \inv g'4 \inv g'16 \startTextSpan Z16 \inv g'16 \inv g'16 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 4/4   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 121
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} Z4. \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/8   \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 7/8   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \inv g'8 \tuplet 5/4 {\inv g'16 Z16 \inv g'16 \inv g'16 \inv g'16}  | 
\time 4/4   \tuplet 4/5 {\inv g'8 \stopTextSpan \inv g'8 Z8^"N" \inv g'8} \tuplet 5/3 {\inv g'8 \startTextSpan \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 2/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | \pageBreak
   \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \inv g'8 \tuplet 4/5 {\inv g'8 Z8 \inv g'8 \inv g'8}  | 
  \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 6/7 {\inv g'8 \stopTextSpan \inv g'8 \inv g'8 Z8^"ST" \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \startTextSpan \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\time 3/8   \inv g'8 \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 4/4   \inv g'4 \inv g'8 \tuplet 4/5 {Z8 \inv g'8 \inv g'8 Z8}  | 
% BAR 131
\time 2/4   \inv g'4 \inv g'8 Z8  | 
   \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 7/8   \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 4/4   \tuplet 6/7 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \stopTextSpan} \tuplet 4/5 {Z8^"XST" \inv g'8 \inv g'8 Z8 \startTextSpan}  | 
\time 3/4   \inv g'8  \tuplet 4/5 {\inv g'8 Z8 \inv g'8 \inv g'8}  | 
\time 9/8   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 6/7 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \stopTextSpan \inv g'8} \inv g'16 Z16^"ST"  | 
\time 4/4   \inv g'4 \startTextSpan \inv g'8 Z8 \inv g'4 \inv g'16 \inv g'16 Z16 \inv g'16  | 
   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8} \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \stopTextSpan \inv g'8 Z8^"N"}  | 
\time 7/8   \inv g'4 \startTextSpan  \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
% BAR 141
\time 9/8   \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} Z8  | 
\time 3/8   \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 2/4   \inv g'4 \inv g'16 \inv g'16 \stopTextSpan \inv g'16 Z16^"SP"  | 
\time 5/8   \inv g'4 \inv g'8 \startTextSpan \tuplet 3/2 {\inv g'8 Z8 \inv g'8}  | 
\time 2/4   \inv g'4 \tuplet 3/2 {\inv g'8 Z8 \inv g'8}  | 
\time 7/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 2/4   \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 4/4   \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8} \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \stopTextSpan \inv g'8 Z8^"XSP"}  | \pageBreak
   \inv g'4 \startTextSpan \tuplet 4/5 {\inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 Z16 \inv g'16}  | 
   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8} \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 151
\time 2/4   \inv g'4 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 4/4   \inv g'4 \inv g'8 Z8 \inv g'4 \inv g'8 Z8  | 
\time 3/8   R1*3/8  |
    \override Stem.transparent = ##t
\time 2/4   Z2 |
Z2  \stopTextSpan | 
Z2^"SP" | 
Z2  \startTextSpan | 
Z2 |
Z2 | 
Z2  | 
Z2 | 
Z2 | 
Z2 | 
Z2  | 
Z2 \stopTextSpan | 
Z2^"N"  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2 | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  \bar "|." 
}


guitarmusic = {
%BAR 1
\time 3/8   \tuplet 3/2 {\inv g'16 Z16\mf \inv g'16\decresc} \inv g'8  \inv g'8 | 
\time 5/4  R1*5/4   | 
\time 5/8   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 5/4  R1*5/4   | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/4  R1*5/4   | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 5/4  R1*5/4   | 
\time 3/8   \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/4  R1*5/4   | 
% BAR 11
\time 9/8   \tuplet 8/9 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 4/4   \tuplet 9/8 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 9/8   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16} \inv g'8 \tuplet 5/6 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/8   \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 3/8   \inv g'8 \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z16\p\decresc}  | 
\time 3/4   \inv g'4 \inv g'8 Z8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/8   \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\inv g'16 Z16 \inv g'16 \inv g'16 \tuplet 5/3 {Z8 \inv g'8 Z8 \inv g'8 Z8}  | 
\time 3/8   \inv g'16 Z16 \inv g'16 \rbeam Z16 \lbeam \tuplet 3/2 {\inv g'16 Z16\pp\decresc \inv g'16}  | 
 Z8 
 \tuplet 3/2 {Z16 \inv g'16 
Z 
} 
 \tuplet 3/2 { \inv g'16 Z16 \inv g'16} |   

% BAR 21
\time 11/8
\tuplet 4/5 {
  Z16 
  Z16  
  Z16 \ppp\cresc
  Z16
  }
  Z16 
  Z16 
  Z16 
  Z16 
\tuplet 5/4 {
  Z16
  Z16 
  Z16 
  Z16 
  Z16 
  }
  Z16 
  Z16
  Z16 
  Z16 
\tuplet 4/5 {
  Z16  
  Z16 
  Z16
  Z16}
   | 
\time 3/8   \tuplet 3/2 {Z8 Z8  Z8} \tuplet 3/2 {Z16\fff\decresc \inv g'16 Z16}  | 
\time 9/8   \tuplet 5/4 {\inv g'16 Z16 \inv g'16 Z16 \rbeam \inv g'16} \lbeam \tuplet 5/4 {Z16 \inv g'16 Z16 \inv g'16 \inv g'16} Z8 Z8 \tuplet 3/2 {Z8 \inv g'8 Z8} \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 2/4   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'8 Z8  | 
\time 3/8   \inv g'8 Z8 \inv g'8  | 
\time 5/4   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'8 \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} Z4\mf\cresc \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/8   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 4/4   \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 3/4   \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 5/4   \inv g'4 \tuplet 9/8 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
% BAR 31
\time 3/8   \inv g'8 Z8 \inv g'8   | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\inv g'4 \inv g'4 \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \inv g'4 \inv g'4 \inv g'4 \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
  R1*5/4   | 
\time 3/8   \tuplet 5/4 {\inv g'16 Z16\fff\decresc \inv g'16 \inv g'16 \inv g'16} \inv g'8  | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \inv g'4 \inv g'4 \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
   \inv g'4 \inv g'4 \inv g'4 \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 41
\time 4/4   \inv g'4 \inv g'4 \inv g'4  \inv g'8 Z8  | 
\time 3/4   \inv g'4 \inv g'4 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
  \inv g'4 \inv g'4 \inv g'8 Z8  | 
\time 2/4   \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \inv g'8 \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} Z8\f\cresc \tuplet 3/2 {\inv g'16 \inv g'16 Z16} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \tuplet 5/3 {\inv g'8 Z8 \inv g'8 Z8 \inv g'8}  | 
\time 3/8   Z8 \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'16 Z16  | 
\time 5/8   \tuplet 3/2 {\inv g'16 \inv g'16 Z16} \inv g'8 \tuplet 5/4 {Z16\ff\decresc \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'16 Z16  | 
\time 3/8   \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16} \tuplet 3/2 {\inv g'16 Z16 \inv g'16}  | 
\time 5/4   \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16} \tuplet 3/2 {\inv g'8 Z8 \inv g'8} \inv g'16 Z16 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
% BAR 51
\time 3/8   \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 4/4   \inv g'8 \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16\f\cresc \inv g'16 \inv g'16}  | 
\time 5/4   \inv g'4 \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 7/8   \inv g'4 \inv g'4 \inv g'4 Z16 \inv g'16  | 
\inv g'4 \inv g'4 \inv g'8 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 4/4   \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
  \inv g'4 \inv g'4 \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8\ff\decresc}  | 
   \inv g'4 \inv g'4 \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
   \tuplet 5/6 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \inv g'16 \inv g'16 \inv g'16 Z16  | 
   \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 61
\time 7/8   \inv g'4 \inv g'4 \inv g'4  Z8  | 
\time 3/4   \inv g'4 \inv g'4 \inv g'8 Z8  | 
\time 9/8   \inv g'4 \inv g'4 \tuplet 6/5 {Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 2/4   \inv g'4 \tuplet 5/4 {\inv g'16 Z16 \inv g'16 \inv g'16 \inv g'16}  | 
\time 4/4   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'16 \inv g'16 \inv g'16 Z16\p\cresc \inv g'16 \inv g'16 \inv g'16 Z16 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'8 Z8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 Z8 \inv g'8 Z8} \inv g'8 Z8  | 
   \tuplet 5/4 {\inv g'16 \inv g'16 Z16\ff\decresc \inv g'16 \inv g'16} \inv g'8 \tuplet 5/4 {Z8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 3/8   \inv g'8 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 2/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \inv g'4 Z4 \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 71
\inv g'4 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8\pp\cresc \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\inv g'8 \tuplet 8/9 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 7/8   \inv g'8 \tuplet 5/6 {\inv g'8 \inv g'8 \inv g'8 \inv g'8  Z } | % Z8}  | 
\time 9/8   \inv g'8 \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8}  | 
   \inv g'8 \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 5/8   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z  \inv g'8}  | 
\time 3/4   \inv g'4 \inv g'16 Z16 \inv g'16 \inv g'16 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 9/8   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'8 \tuplet 5/4 {\inv g'16 Z16 \inv g'16 \inv g'16 \inv g'16} \inv g'16 Z16  | 
\time 3/8   \inv g'8 \inv g'16 Z16\pp\cresc \inv g'16 \inv g'16  | 
\time 5/4   \tuplet 3/2 {\inv g'8 Z8 \inv g'8}  \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'4 \tuplet 5/4 {Z8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 81
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8} \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8\ff\decresc}  | 
\time 5/8   \inv g'4 \inv g'4  Z | %Z8  |  
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\inv g'4 \tuplet 4/5 {Z8 \inv g'8 \inv g'8 \inv g'8} \inv g'8 Z8 | 
\inv g'4 \inv g'4 \tuplet 6/5 {\inv g'8 Z8\ppp\cresc \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 3/8   \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16} \inv g'8  | 
\time 5/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 4/5 {\inv g'8 \inv g'8 Z8 \inv g'8} \inv g'16 Z16  | 
\time 5/8   \inv g'4 \tuplet 5/3 {Z8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 4/4   \tuplet 6/5 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8 Z8\ff\decresc} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8}  | 
\time 5/4   \inv g'4 Z4 \inv g'8 \tuplet 3/2 {\inv g'8 Z8 \inv g'8} \inv g'8 \inv g'4  | 
% BAR 91
\time 3/4   Z8 \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8\ppp\cresc}  | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 3/4   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 5/8   \inv g'4 \inv g'4 \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
\time 3/4   \inv g'8 \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 5/4   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \inv g'16 Z16\ff\decresc  | 
\time 7/8   \inv g'4 Z4 \tuplet 5/3 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 2/4   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 4/4   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \ppp\cresc} \inv g'4 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
% BAR 101
\time 9/8   \inv g'4 \inv g'4 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
\time 3/8   \inv g'8 Z8 \inv g'8  | 
\time 4/4   \inv g'4 \inv g'8 \tuplet 6/5 {Z8\f\decresc \inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 9/8   \inv g'4 \inv g'16 Z16 \inv g'16 \inv g'16 \tuplet 3/2 {\inv g'8 \inv g'8 Z8} \inv g'4 Z8  | 
\time 9/8   \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8\ppp\cresc \inv g'8} \inv g'8 \tuplet 4/5 {\inv g'8 Z8 \inv g'8 \inv g'8}  | 
\time 3/8   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \inv g'4  | 
\time 4/4   \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\time 9/8   \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 Z \inv g'8 \inv g'8 \inv g'8 \inv g'8} \inv g'16 Z16\mf\decresc  | 
\time 5/4   \inv g'8 \tuplet 4/5 {\inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 3/2 {\inv g'8 Z8 \inv g'8} \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 3/8   \inv g'8 \inv g'16 \inv g'16 \inv g'16 Z16  | 
% BAR 111
\time 4/4   \inv g'4 \inv g'8 Z8\ppp\cresc \inv g'4 \inv g'16 \inv g'16 Z16 \inv g'16  | 
\time 5/8   \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 4/4   \tuplet 9/8 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8\p\decresc \inv g'8 \inv g'8 \inv g'8 \inv g'8}  | 
   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16}  | 
\time 3/8   \inv g'8 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 7/8   \inv g'4 \tuplet 5/4 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8} \inv g'16 Z16  | 
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} Z4. \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16\ppp\cresc}  | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 5/4   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8} \inv g'4 \inv g'16 Z16 \inv g'16 \inv g'16 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16\pp\decresc }  | 
\time 4/4   \inv g'4 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
% BAR 121
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} Z4. \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/8   \tuplet 4/5 {\inv g'8 \inv g'8 \inv g'8 Z8 \ppp\cresc}  | 
\time 7/8   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \inv g'8 \tuplet 5/4 {\inv g'16 Z16 \inv g'16 \inv g'16 \inv g'16}  | 
\time 4/4   \tuplet 4/5 {\inv g'8 \inv g'8 Z8 \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8\ppp\decresc \inv g'8}  | 
\time 2/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
   \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/4   \inv g'8 \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8} \inv g'8 \tuplet 4/5 {\inv g'8 Z  \inv g'8 \inv g'8}  | 
   \tuplet 3/2 {\inv g'16 Z16 \ppp\cresc \inv g'16} \tuplet 6/7 {\inv g'8 \inv g'8 \inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 5/4 {\inv g'16 \inv g'16 Z16 \inv g'16 \inv g'16}  | 
\time 3/8   \inv g'8 \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z }  | 
\time 4/4   \inv g'4 \inv g'8 \tuplet 4/5 {Z  \inv g'8 \inv g'8 Z8}  | 
% BAR 131
\time 2/4   \inv g'4 \inv g'8 Z8 \p\cresc   | 
\inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8}  | 
\time 7/8   \tuplet 6/5 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z  \inv g'8} \inv g'8 \tuplet 3/2 {\inv g'16 \inv g'16 Z  }  | 
\time 4/4   \tuplet 6/7 {\inv g'8 \inv g'8 \inv g'8 Z \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 \inv g'16 Z }  | 
\time 9/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} \tuplet 4/5 {Z8 \inv g'8 \inv g'8 Z8} | 
\time 3/4   \inv g'8 \tuplet 4/5 {\inv g'8 Z8\mf\decresc \inv g'8 \inv g'8}  | 
\time 9/8   \tuplet 3/2 {\inv g'16 Z16 \inv g'16} \tuplet 6/7 {\inv g'8 \inv g'8 \inv g'8 Z \inv g'8 \inv g'8} \inv g'16 Z16  | 
\time 4/4   \inv g'4 \inv g'8 Z8 \inv g'4 \inv g'16 \inv g'16 Z16 \inv g'16  | 
   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8\p\cresc} \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 7/8   \inv g'4 \tuplet 5/4 {\inv g'8 Z8\f\decresc \inv g'8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 \inv g'16 Z16}  | 
% BAR 141
\time 9/8   \inv g'4 \inv g'8 \tuplet 6/5 {\inv g'8 Z8 \inv g'8 \inv g'8 \inv g'8 \inv g'8} Z8  | 
\time 3/8   \inv g'8 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 \inv g'16 Z16\mf\cresc}  | 
\time 2/4   \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 5/8   \inv g'4 \inv g'8 \tuplet 3/2 {\inv g'8 Z8 \inv g'8}  | 
\time 2/4   \inv g'4 \tuplet 3/2 {\inv g'8 Z8 \inv g'8}  | 
\time 7/8   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 Z8\f\decresc \inv g'8} \tuplet 5/3 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
\time 2/4   \inv g'4 \inv g'16 \inv g'16 \inv g'16 Z16  | 
\time 4/4   \inv g'4 \tuplet 3/2 {\inv g'8 \inv g'8 Z8\p\cresc} \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8}  | 
   \inv g'4 \tuplet 4/5 {\inv g'8 Z8 \inv g'8 \inv g'8} \tuplet 3/2 {\inv g'16 Z16 \inv g'16}  | 
   \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8} \tuplet 5/4 {\inv g'8 \inv g'8 \inv g'8 \inv g'8 Z8\f\decresc}  | 
% BAR 151
\time 2/4   \inv g'4 \tuplet 5/4 {\inv g'16 \inv g'16 \inv g'16 Z16 \inv g'16}  | 
\time 4/4   \inv g'4 \inv g'8 Z8 \inv g'4 \inv g'8 Z8  | 
\time 3/8   R1*3/8  |
\time 2/4   Z2 |
Z2 \mf | 
Z2 | 
Z2  | 
Z2 |
Z2 | 
Z2  | 
% BAR 161
Z2 | 
Z| 
Z2 | 
Z | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
% BAR 171
Z2  | 
Z2  | 
Z2  | 
Z2 | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
% BAR 181
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  | 
Z2  \bar "|." 
}

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