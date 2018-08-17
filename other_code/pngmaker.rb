#Ruby 

#encoding: string no, fingered pitch name and octave number, sounding octave, harmonic or not

def stripper (input) 
	input.gsub!('&lt','<')
	input.gsub!('&gt','>')
	input.gsub!('",',"")
	input.gsub!('"',"")
	input.gsub!('\\\\', '\\')
	if(input.include? "X") 
		input.gsub!("X","1")
	else 
		input += "1"
	end
	return input
end

#Create png files
@inputdatabase = IO.readlines("chords2.js")

line = 9
for i in 1..319
	newfile = "ly/chord_%03d.ly" % [i]
	@f = File.new(newfile,"w")
	guitar = @inputdatabase[line].split(":")[1]
	tab = @inputdatabase[line+1].split(":")[1]


	@f.puts '\version "2.12"'
	@f.puts '\paper{'
	@f.puts 'indent=0\mm'
	@f.puts 'line-width=120\mm'
	@f.puts 'oddFooterMarkup=##f'
	@f.puts 'oddHeaderMarkup=##f'
	@f.puts  'bookTitleMarkup = ##f'
	@f.puts 'scoreTitleMarkup = ##f'
	@f.puts '}'

	@f.puts 'thirdnote = {'
	@f.puts  '\once \override NoteHead.X-offset = #4.0'
	@f.puts '\once \override Stem.transparent = ##t'
	@f.puts '\set fingeringOrientations = #\'(down)'
	@f.puts '\set stringNumberOrientations = #\'(down)'
	@f.puts '\set strokeFingerOrientations = #\'(down)'
	@f.puts '}'

	@f.puts 'guitarmusic = {'
	@f.puts '\time 4/4'
	@f.puts "#{stripper(guitar)} |"
	@f.puts '}'

	@f.puts 'tabmusic = {'
	@f.puts '\time 4/4'
	@f.puts "#{stripper(tab)} |"
	@f.puts '}'

	@f.puts '\score {'
	@f.puts '\new PianoStaff \with {'
	@f.puts '\override Score.BarNumber.break-visibility = ##(#f #f #f)'
	@f.puts '\override Clef.stencil = ##f'
	@f.puts '\override ClefModifier.stencil = ##f'
	@f.puts '\override KeySignature.stencil = ##f'
	@f.puts '\override TimeSignature.stencil = ##f'
	@f.puts '\override SystemStartBrace.stencil = ##f'
	@f.puts '\override SystemStartLine.stencil = ##f'
	@f.puts '}<<'
	@f.puts '\new TabStaff {'
	@f.puts '\override Staff.Clef.stencil = ##f'
	@f.puts '\tabmusic'
	@f.puts '}'
	@f.puts '\new Staff {'
	@f.puts '\clef "treble_8"'
	@f.puts '\guitarmusic'
	@f.puts '}'
	@f.puts '>>'
	@f.puts '}'

	@f.close

	line += 13
end
