// classes
 
function Converter()
{
	// static class
}

{
	/*Converter.AsciiCharacters =
		"â€â˜ºâ˜»â™¥â™¦â™£â™ â€¢â—˜â—‹â—™â™‚â™€â™ªâ™«â˜¼â–º" // 0-16
		+ "â—„â†•â€¼Â¶Â§â–¬â†¨â†‘â†“â†’â†âˆŸâ†”â–²â–¼â " // 17-32
		+ "!\"#$%&'()*+,-./0" // 33-48
		+ "123456789:;<=>?@" // 49-64
		+ "ABCDEFGHIJKLMNOP" // 65-80
		+ "QRSTUVWXYZ[\\]^_`" // 81-96
		+ "abcdefghijklmnop" // 97-112
		+ "qrstuvwxyz{|}~âŒ‚Ã‡" // 113-128
		+ "Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨Ã¯Ã®Ã¬Ã„Ã…Ã‰" // 129-144
		+ "Ã¦Ã†Ã´Ã¶Ã²Ã»Ã¹Ã¿Ã–ÃœÂ¢Â£Â¥â‚§Æ’Ã¡" // 145-160
		+ "Ã³ÃºÃ±Ã‘ÂªÂºÂ¿âŒÂ¬Â½Â¼Â¡Â«Â»â–‘â–’" // 161-176
		+ "â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””" // 177-192
		+ "â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨" // 193-208
		+ "â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜Ã‡â–ˆâ–„â–Œâ–â–€Î±" // 209-224
		+ "ÃŸÎ“Ï€Î£ÏƒÂµÏ„Î¦Î˜Î©Î´âˆžÏ†Îµâˆ©â‰¡" // 225-240
		+ "Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â– â½"; //241-255Â */
		
		Converter.AsciiCharacters = "________________"
    + "__âŽ€__â¡__âŒ¥__â›â†’â†â†‘â†“"
    + "_!\"#$%&'()*+,-./"
    + "0123456789:;<=>?"
    + "@ABCDEFGHIJKLMNO"
    + "PQRSTUVWXYZ[\\]^_"
    + "`abcdefghijklmno"
    + "pqrstuvwxyz{|}~â¡"
    + "Ã‡Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨Ã¯Ã®Ã¬Ã„Ã…"
    + "Ã‰Ã¦Ã†Ã´Ã¶Ã²Ã»Ã¹Ã¿Ã–ÃœÂ¢Â£Â¥â‚§Æ’"
    + "Ã¡Ã­Ã³ÃºÃ±Ã‘ÂªÂºÂ¿âŒÂ¬Â½Â¼Â¡Â«Â»"
    + "ÃƒÃ£Ä¨Ä©Ã•ÃµÅ°Å±Ä²Ä³Â¾âˆ½â—Šâ€°Â¶Â§"
    + "________________"
    + "________________"
    + "Î±ÃŸÎ“Ï€Î£ÏƒÂµÏ„Î¦Î˜Î©Î´âˆžâŒ€âˆˆâˆ©"
    + "â‰¡Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â– â‡’"
 
	Converter.bytesToStringASCII = function(bytes)
	{
		var returnValue = "";
 
		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			var byteAsCharASCII = String.fromCharCode(Converter.AsciiCharacters.codePointAt(byte)); 
			returnValue += byteAsCharASCII;
		}
 
		return returnValue;
	}
 
	Converter.bytesToStringHexadecimal = function(bytes)
	{
		var returnValue = "";
 
		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			var byteAsStringHexadecimal = 
				byte.toString(16).padLeft(2, '0');
 
			returnValue += byteAsStringHexadecimal;
		}
 
		return returnValue;
	}
 
	Converter.stringHexadecimalToBytes = function(stringHexadecimal)
	{
		var returnValues = [];
 
		var nibblesForByteCurrent = [];
 
		for (i = 0; i < stringHexadecimal.length; i++)
		{
			var charForNibble = stringHexadecimal[i];
			var nibbleAsInt = parseInt(charForNibble, 16);
			if (isNaN(nibbleAsInt) == false)
			{
				nibblesForByteCurrent.push(nibbleAsInt);
				if (nibblesForByteCurrent.length == 2)
				{
					var byte = 
						(nibblesForByteCurrent[0] << 4) 
						+ nibblesForByteCurrent[1];
					returnValues.push(byte);
					nibblesForByteCurrent.length = 0;
				}
			}		   
		}
 
		return returnValues;
	}   
}
