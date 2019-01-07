<!DOCTYPE html>
<?php 

    function separateTheNumber($numberin) {
    	$character1 = substr($numberin,0,1);
    	$character2 = substr($numberin,1,1);
    	switch($character2) {
    		case "1":
    		case "2":
    		case "3":
    		case "4":
    		case "5":
    		case "6":
    		case "7":
    		case "8":
    		case "9":
    		case "0":
    			$output_number = $numberin;
    			break;
			default: 
				$output_number = $character1;
			}
			return $output_number;
    	}

    function findNext($stringin, $character,$replacearray,$guitarortab) {
 		$output_string = '';
 		$place_in_string = 0;
 		for($x =0; $x < count($replacearray); $x++) {
 			$replacement_string = $replacearray[$x];
	 		$place_to_replace = strpos($stringin,$character,$place_in_string);
	 		$first_part_of_string = substr($stringin,$place_in_string,($place_to_replace-$place_in_string));		
	 		$duration = separateTheNumber(substr($stringin,($place_to_replace+1),2));		
			if(strpbrk($replacement_string,'X') == FALSE) {
	    		$second_part_of_string = $replacement_string . $duration;			
				$place_in_string = $place_to_replace + 1 + strlen($duration);
			} else {
				//This is if it is a special chord where 3-note are the same, hence an extra voice is needed
				if($guitarortab === 'guitar') {
					$second_part_of_string = str_replace('X',$duration,$replacement_string);
				} else {	
					//This is if it is for the tab, therefore we need to remove all the special voice stuff:
					$second_part_of_string = str_replace("&lt&lt { \\voiceOne","",$replacement_string);
					$second_part_of_string = str_replace("&gtX}","",$second_part_of_string);
					$second_part_of_string = str_replace("&gtX }","",$second_part_of_string);
					$second_part_of_string = str_replace("\\new Voice","",$second_part_of_string);
					$second_part_of_string = str_replace("{\\voiceTwo \\thirdnote &lt","",$second_part_of_string);
					$second_part_of_string = str_replace("&gt&gt","&gt".$duration,$second_part_of_string);
				};
				$place_in_string = $place_to_replace + 1 + strlen($duration);
			};
		echo $first_part_of_string . $second_part_of_string;
	 	};
	 	echo substr($stringin,$place_in_string);
	}

	?>

	<?php	
	echo nl2br("% This is the lilypond notation file.\n %Copy all of this code into a text editor and save as a .ly file.  Then render it using lilypond.\n % Below is your reference array.  You can re-enter this back into the app if you want to change anything:\n");
	echo nl2br("% [" . htmlspecialchars($_POST["phpArray"]) . "] \n\n");
	
	echo nl2br(file_get_contents('lilypondhead.ly'));

	$inputnotation = htmlspecialchars($_POST["phpNotation"]);

	//The guitar music staff
	$load_in_tab_file = nl2br(file_get_contents('tabmusic.ly'));
	echo nl2br("\n\n");
	$load_in_guitar_file = nl2br(file_get_contents('guitarmusic.ly'));
	$inputarray = array();
	$token = strtok($inputnotation, "J");

	while ($token !== false)
	{	
		array_push($inputarray,html_entity_decode($token));
		$token = strtok("J");
	}

	array_pop($inputarray);

	findNext($load_in_tab_file,'Z',$inputarray,'tab');
	findNext($load_in_guitar_file, 'Z',$inputarray,'guitar');


	echo nl2br(file_get_contents('lilypondfooter.ly'));
	?>
