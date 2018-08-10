#Ruby 

#Create png files
@inputdatabase = IO.readlines("2018-08-09_chord-databasev3.txt")
@outputdb = File.new("outputdb.json","w")

def json()
	@outputdb.puts '{"chords":['
	for i in 1..319
		line = @inputdatabase[i].split
		notation = "<"
		line[10..-1].map{|x| notation << '#{x} '}
		notation << ">"

		chordname = "chord_%03d" % [line[0]]
		octaves = line[5,5].map{|x| x.to_i}
		octavehistogram = [0,0,0,0,0]
		octaves.each{|x| octavehistogram[x.to_i-1] += 1 if x!=0 }

		@outputdb.puts "\t{"
		@outputdb.puts "\t\t\"name\" : \"#{chordname}\", "
		@outputdb.puts "\t\t\"difficulty\" : #{line[1]},"
		@outputdb.puts "\t\t\"notes\" : #{line[2]},"
		@outputdb.puts "\t\t\"harmonics\" : #{line[3]},"
		@outputdb.puts "\t\t\"harmonic_ratio\" : #{line[4]},"
		@outputdb.puts "\t\t\"octaves\" : #{octaves},"
		@outputdb.puts "\t\t\"octavehistogram\" : #{octavehistogram},"
		@outputdb.puts "\t\t\"notation\" : #{line[10..-1]}"
		if (i<319)
			@outputdb.puts "\t},"  
		else
			@outputdb.puts "\t}" 
		end
	end
	@outputdb.puts ']}'
end

json()

def lilypond()
	for i in 1..319
		newfile = "ly/chord_%03d.ly" % [i]
		@f = File.new(newfile,"w")
		line = inputdatabase[i].split
		notation = ""
		line[10..-1].map{|x| notation << "#{x} "}

		@f.puts '\version "2.12"'
		@f.puts '\paper{'
		@f.puts 'indent=0\mm'
		@f.puts 'line-width=120\mm'
		@f.puts 'oddFooterMarkup=##f'
		@f.puts 'oddHeaderMarkup=##f'
		@f.puts  'bookTitleMarkup = ##f'
		@f.puts 'scoreTitleMarkup = ##f'
		@f.puts '}'

		@f.puts 'guitarmusic = {'
		@f.puts '\time 4/4'
		@f.puts "<#{notation}>1 |"
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
		@f.puts '\guitarmusic'
		@f.puts '}'
		@f.puts '\new Staff {'
		@f.puts '\clef "treble_8"'
		@f.puts '\guitarmusic'
		@f.puts '}'
		@f.puts '>>'
		@f.puts '}'

		@f.close
	end
end