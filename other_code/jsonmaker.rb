#Ruby
#encoding: string no, fingered pitch name and octave number, sounding octave, harmonic or not

@strings = {
#String 6
"e,\\6" => ["string-6_e1_octave-1",0],
"e\\6" => ["string-6_e2_octave-2",1],
"e\\harmonic\\6" => ["string-6_e2_octave-2_harmonic",2],
"a,\\harmonic\\6" => ["string-6_a1_octave-3_harmonic",3],
# String 5
"e\\5" => ["string-5_e2_octave-2",4],
"e'\\5" => ["string-5_e3_octave-3",5],
"e\\harmonic\\5" => ["string-5_e2_octave-3_harmonic",6],
"e'\\harmonic\\5" => ["string-5_e3_octave-3_harmonic",7],
# String 4
"e\\4" => ["string-4_e2_octave-2",8],
"e'\\4" => ["string-4_e3_octave-3",9],
#String 3
"e'\\3" => ["string-3_e3_octave-3",10],
#String 2
"e'\\2" => ["string-2_e3_octave-3",11],
"e''\\2" => ["string-2_e4_octave-4",12],
#String 1
"e'\\1" => ["string-1_e3_octave-3",13],
"e''\\1" => ["string-1_e4_octave-4",14],
"e''\\harmonic\\1" => ["string-1_e4_octave-4_harmonic",15],
"a'\\harmonic\\1" => ["string-1_e3_octave-5_harmonic",16]
}

#Create png files
@inputdatabase = IO.readlines("2018-08-09_chord-databasev3.txt")
@notationdatabase = IO.readlines("2018-08-09_chord-database-notation.txt")

def json()
	@outputdb.puts '{"chords":['
	for i in 1..319
		line = @inputdatabase[i].split
		notationline = @notationdatabase[i]

		chordname = "chord_%03d" % [line[0]]
		octaves = line[5,5].map{|x| x.to_i}
		octavehistogram = [0,0,0,0,0]
		octaves.each{|x| octavehistogram[x.to_i-1] += 1 if x!=0 }
		
		guitarfiles = []
		fileref = []
		line[10..-1].each do |x| 
			guitarfiles.push(@strings[x][0]) 
			fileref.push(@strings[x][1])
		end


		@outputdb.puts "\t{"
		@outputdb.puts "\t\t\"name\" : \"#{chordname}\", "
		@outputdb.puts "\t\t\"difficulty\" : #{line[1]},"
		@outputdb.puts "\t\t\"notes\" : #{line[2]},"
		@outputdb.puts "\t\t\"harmonics\" : #{line[3]},"
		@outputdb.puts "\t\t\"harmonic_ratio\" : #{line[4]},"
		@outputdb.puts "\t\t\"octaves\" : #{octaves},"
		@outputdb.puts "\t\t\"octavehistogram\" : #{octavehistogram},"
		@outputdb.puts "\t\t\"notation\" : #{notationline},"
		@outputdb.puts "\t\t\"files\" : #{guitarfiles},"
		@outputdb.puts "\t\t\"buffer_reference\" : #{fileref}"
		if (i<319)
			@outputdb.puts "\t},"  
		else
			@outputdb.puts "\t}" 
		end
	end
	@outputdb.puts ']}'
end

json()