var headerBytes = [];

function Session(bytes)
{
	this.bytes = bytes;
	this.headerBytes = headerBytes;
	
	this.finalNibble = "";
}
{
	// dom

	Session.prototype.domElementUpdate = function()
	{
		var nibblesPerRow = 32;
		var bytesPerRow = nibblesPerRow / 2;

		if (this.domElement == null)
		{
			var d = document;

			var divSession = d.createElement("div");
			
			var divHeader = d.createElement("div");
			this.divHeader = divHeader;
			
			var divHeaderLabel = d.createElement("label");
			divHeaderLabel.innerHTML = "Header:";
			//console.log(divHeaderLabel)
			this.divHeaderLabel = divHeaderLabel;
			divHeader.appendChild(divHeaderLabel);

			var divHeaderValue = d.createElement("input");
			//divHeaderValue.disabled = true;
			divHeaderValue.style.width = "200px";
			divHeaderValue.style.color = "magenta";
			divHeaderValue.style.background = "black";
			divHeaderValue.maxLength = 14;
			divHeaderValue.oninput = function(){
			 
			  //session.headerBytes = divHeaderValue.value.split
			  session.headerBytes[0] = parseInt(divHeaderValue.value.substr(0,2),16);
			  session.headerBytes[1] = parseInt(divHeaderValue.value.substr(2,2),16);
			  session.headerBytes[2] = parseInt(divHeaderValue.value.substr(4,2),16);
			  session.headerBytes[3] = parseInt(divHeaderValue.value.substr(6,2),16);
			  session.headerBytes[4] = parseInt(divHeaderValue.value.substr(8,2),16);
			  session.headerBytes[5] = parseInt(divHeaderValue.value.substr(10,2),16);
			  session.headerBytes[6] = parseInt(divHeaderValue.value.substr(12,2),16);
			  console.log(session.headerBytes);
			}
			this.divHeaderValue = divHeaderValue;
			
			divHeader.appendChild(divHeaderValue);
			
			divSession.appendChild(divHeader);
			
			var divScrollable = d.createElement("div");
			
			divScrollable.style.height = '400px';
			divScrollable.style.width = '700px';
			divScrollable.style.overflow = 'auto';
			
			var rowCount = 0xFFF;

			var textareaOffsets = d.createElement("textarea")
			textareaOffsets.cols = 5;
			textareaOffsets.rows = rowCount;
			textareaOffsets.disabled = true;
			textareaOffsets.style.resize = "none";
			textareaOffsets.style.color = "magenta";
			textareaOffsets.style.background = "black";
			textareaOffsets.style.border = 0;
			//textareaOffsets.style.fontFamily = "MSX";
			textareaOffsets.style.textAlign = "right";
			textareaOffsets.spellcheck = false;
			this.textareaOffsets = textareaOffsets;
			divScrollable.appendChild(textareaOffsets);

			var textareaHexadecimal = d.createElement("textarea");
			textareaHexadecimal.rows = rowCount;
			textareaHexadecimal.onkeyup = this.textareaHexadecimal_KeyUp.bind(this);
			textareaHexadecimal.oninput = this.textareaHexadecimal_Changed.bind(this);
			textareaHexadecimal.style.color = "lawngreen";
			textareaHexadecimal.style.background = "black";
			textareaHexadecimal.style.resize = "none";
			textareaHexadecimal.spellcheck = false;
			//textareaHexadecimal.style.fontFamily = "MSX";
			this.textareaHexadecimal = textareaHexadecimal;
			divScrollable.appendChild(textareaHexadecimal);

			var textareaASCII = d.createElement("textarea");
			textareaASCII.cols = bytesPerRow * 2; // Not sure why -1 is needed.
			textareaASCII.rows = rowCount;
			textareaASCII.disabled = true;
			textareaASCII.style.resize = "none";
			textareaASCII.style.color = "magenta";
			textareaASCII.style.background = "black";
			textareaASCII.spellcheck = false;
			textareaASCII.style.overflow = "hidden";
			textareaASCII.style.position = "relative"
			textareaASCII.style.top = "-21px";
			textareaASCII.style.fontFamily = "Monospace"
			textareaASCII.style.border = 0;
			textareaASCII.style.float = "top";
		  textareaASCII.width = "`200%";
			this.textareaASCII = textareaASCII;
			divScrollable.appendChild(textareaASCII);
      
      divSession.appendChild(divScrollable);
      
			var divFileOperations = d.createElement("div");

			var buttonSave = d.createElement("button");
			buttonSave.innerHTML = "Save";
			buttonSave.onclick = this.buttonSave_Clicked.bind(this);
			divFileOperations.appendChild(buttonSave);

			var inputFileToLoad = d.createElement("input");
			inputFileToLoad.type = "file";
			inputFileToLoad.onchange = this.inputFileToLoad_Changed.bind(this);
			divFileOperations.appendChild(inputFileToLoad);

			divSession.appendChild(divFileOperations);

			var divCursorPosition = d.createElement("div");

			var labelCursorPosition = d.createElement("label");
			labelCursorPosition.innerHTML = "Cursor Position:";
			divCursorPosition.appendChild(labelCursorPosition);

			var inputCursorPosition = d.createElement("input");
			inputCursorPosition.disabled = true;
			inputCursorPosition.style.resize = "none";
			inputCursorPosition.style.color = "magenta";
			inputCursorPosition.style.background = "black";
			this.inputCursorPosition = inputCursorPosition;
			divCursorPosition.appendChild(inputCursorPosition);

			divSession.appendChild(divCursorPosition);

			var divCursorValue = d.createElement("div");

			var labelCursorValue = d.createElement("label");
			labelCursorValue.innerHTML = "Value at Cursor as:";
			divCursorValue.appendChild(labelCursorValue);

			var divCursorValueEncoding = d.createElement("div");

			var selectSignedOrUnsigned = d.createElement("select");
			this.selectSignedOrUnsigned = selectSignedOrUnsigned;

			var optionUnsigned = d.createElement("option");
			optionUnsigned.innerHTML = "Unsigned";
			selectSignedOrUnsigned.appendChild(optionUnsigned);

			var optionSigned = d.createElement("option");
			optionSigned.innerHTML = "Signed";
			selectSignedOrUnsigned.appendChild(optionSigned);

			divCursorValueEncoding.appendChild(selectSignedOrUnsigned);

			var selectEndianness = d.createElement("select");
			this.selectEndianness = selectEndianness;

			var optionBig = d.createElement("option");
			optionBig.innerHTML = "Big-Endian";
			selectEndianness.appendChild(optionBig);

			var optionLittle = d.createElement("option");
			optionLittle.innerHTML = "Little-Endian";
			selectEndianness.appendChild(optionLittle);

			divCursorValueEncoding.appendChild(selectEndianness);

			divCursorValue.appendChild(divCursorValueEncoding);

			var divCursorValueByte = d.createElement("div");

			var labelCursorValueByte = d.createElement("label");
			labelCursorValueByte.innerHTML = "Byte:";
			divCursorValueByte.appendChild(labelCursorValueByte);

			var inputCursorValueByte = d.createElement("input");
			inputCursorValueByte.disabled = true;
			inputCursorValueByte.style.color = "magenta";
			inputCursorValueByte.style.background = "black";
			this.inputCursorValueByte = inputCursorValueByte;
			divCursorValueByte.appendChild(inputCursorValueByte);

			divCursorValue.appendChild(divCursorValueByte);

			var divCursorValueShort = d.createElement("div");

			var labelCursorValueShort = d.createElement("label");
			labelCursorValueShort.innerHTML = "16 bit:";
			divCursorValueShort.appendChild(labelCursorValueShort);

			var inputCursorValueShort = d.createElement("input");
			inputCursorValueShort.disabled = true;
			inputCursorValueShort.style.color = "magenta";
			inputCursorValueShort.style.background = "black";
			this.inputCursorValueShort = inputCursorValueShort;
			divCursorValueShort.appendChild(this.inputCursorValueShort);

			divCursorValue.appendChild(divCursorValueShort);

			var divCursorValueInt = d.createElement("div");

			var labelCursorValueInt = d.createElement("label");
			labelCursorValueInt.innerHTML = "32 bit:";
			divCursorValueInt.appendChild(labelCursorValueInt);

			var inputCursorValueInt = d.createElement("input");
			inputCursorValueInt.disabled = true;
			inputCursorValueInt.style.width = "200px";
			inputCursorValueInt.style.color = "magenta";
			inputCursorValueInt.style.background = "black";
			this.inputCursorValueInt = inputCursorValueInt;
			divCursorValueInt.appendChild(this.inputCursorValueInt);

			divCursorValue.appendChild(divCursorValueInt);

			divSession.appendChild(divCursorValue);

			var divMain = d.getElementById("divMain");
			divMain.appendChild(divSession);

			this.domElement = divSession;
		}

		var textareaHexadecimalWidthInColumns = nibblesPerRow - 1; // Not sure why -1 is needed.
		if (this.textareaHexadecimal.scrollHeight > this.textareaHexadecimal.clientHeight)
		{
			var scrollbarWidthInChars = 2;  // May be 3 on some systems?
			textareaHexadecimalWidthInColumns += scrollbarWidthInChars;
		}
		this.textareaHexadecimal.cols = textareaHexadecimalWidthInColumns - 1;

		var bytesAsStringHexadecimal = Converter.bytesToStringHexadecimal(this.bytes);
		var headerBytesAsStringHexadecimal = Converter.bytesToStringHexadecimal(this.headerBytes);
		this.textareaHexadecimal.value =	bytesAsStringHexadecimal + this.finalNibble; 
		//console.log(this.textareaHexadecimal.value)
    this.divHeaderValue.value = headerBytesAsStringHexadecimal;


		var charsPerByte = 2;
		var cursorPos = Math.floor(this.textareaHexadecimal.selectionStart / charsPerByte);
		var cursorPosAsString =
			"0x" + cursorPos.toString(16)
			+ "; " + cursorPos;

		this.inputCursorPosition.value = cursorPosAsString;

		var isSigned = (this.selectSignedOrUnsigned.selectedOptions[0].value == "Signed");
		var isLittleEndian = (this.selectEndianness.selectedOptions[0].value == "Little-Endian");

    //console.log(this.textareaHexadecimal.value)
    //console.log(cursorPos)
    //console.log(this.textareaHexadecimal.value.substr(cursorPos*2, 2))
		var cursorValueByteAsHexadecimal = this.textareaHexadecimal.value.substr(cursorPos*2, 2);
		
		var cursorValueByte = parseInt(cursorValueByteAsHexadecimal, 16);
		if (isNaN(cursorValueByte) == false)
		{
			if (isSigned)
			{
				var valueMax = Math.pow(2, 7);
				if (cursorValueByte > valueMax)
				{
					cursorValueByte = valueMax - cursorValueByte;
				}
			}

			var cursorValueByteAsString =
				"0x" + cursorValueByteAsHexadecimal
				+ "; " + cursorValueByte
				+ "; 0b" + cursorValueByte.toString(2);

			this.inputCursorValueByte.value = cursorValueByteAsString;
		}

		var cursorValueShortAsHexadecimal = this.textareaHexadecimal.value.substr(cursorPos*2, 4);
		if (isLittleEndian)
		{
			cursorValueShortAsHexadecimal =
				cursorValueShortAsHexadecimal.substr(2)
				+ cursorValueShortAsHexadecimal.substr(0, 2)
		}
		var cursorValueShort = parseInt(cursorValueShortAsHexadecimal, 16);
		if (isNaN(cursorValueShort) == false)
		{
			if (isSigned)
			{
				var valueMax = Math.pow(2, 15);
				if (cursorValueShort > valueMax)
				{
					cursorValueShort = valueMax - cursorValueShort;
				}
			}

			var cursorValueShortAsString =
				"0x" + cursorValueShortAsHexadecimal
				+ "; " + cursorValueShort;

			this.inputCursorValueShort.value = cursorValueShortAsString;
		}

		var cursorValueIntAsHexadecimal = this.textareaHexadecimal.value.substr(cursorPos*2, 8);
		if (isLittleEndian)
		{
			cursorValueIntAsHexadecimal =
				cursorValueIntAsHexadecimal.substr(6)
				+ cursorValueIntAsHexadecimal.substr(4, 2)
				+ cursorValueIntAsHexadecimal.substr(2, 2)
				+ cursorValueIntAsHexadecimal.substr(0, 2)
		}
		var cursorValueInt = parseInt(cursorValueIntAsHexadecimal, 16);
		if (isNaN(cursorValueInt) == false)
		{
			if (isSigned)
			{
				var valueMax = Math.pow(2, 31);
				if (cursorValueInt > valueMax)
				{
					cursorValueInt = valueMax - cursorValueInt;
				}
			}

			var cursorValueIntAsString =
				"0x" + cursorValueIntAsHexadecimal
				+ "; " + cursorValueInt;

			this.inputCursorValueInt.value = cursorValueIntAsString;
		}

		var rowsVisible = this.textareaHexadecimal.rows;
		var rowHeightInPixels = this.textareaHexadecimal.offsetHeight / rowsVisible;
		var scrollOffsetInPixels = this.textareaHexadecimal.scrollTop;
		var scrollOffsetInRows = Math.round(scrollOffsetInPixels / rowHeightInPixels);
		var scrollOffsetInBytes = scrollOffsetInRows * bytesPerRow;
		var offsetsAsStrings = [];
		var bytesForRowsAsASCII = [];
		for (var i = 0; i < rowsVisible; i++)
		{
			//var offsetForRow = scrollOffsetInBytes + (i * bytesPerRow);
			var offsetForRow = i * bytesPerRow;
			var offsetForRowAsHexadecimal = offsetForRow.toString(16)
			offsetsAsStrings.push(offsetForRowAsHexadecimal);

			var bytesForRow = this.bytes.slice(offsetForRow, offsetForRow + bytesPerRow);
			var bytesForRowAsASCII = Converter.bytesToStringASCII(bytesForRow)
			bytesForRowsAsASCII.push(bytesForRowAsASCII);
		}
		var offsetsAsString = offsetsAsStrings.join("\n");
		this.textareaOffsets.value = offsetsAsString;

		var bytesAsStringASCII = bytesForRowsAsASCII.join("\n");
		this.textareaASCII.value = bytesAsStringASCII;

		return this.domElement;
	}

	// events

	Session.prototype.buttonSave_Clicked = function()
	{
		var dataAsArrayBuffer = new ArrayBuffer(this.headerBytes.length + this.bytes.length);
		var dataAsArrayUnsigned = new Uint8Array(dataAsArrayBuffer);
		for (var i = 0; i < this.headerBytes.length; i++){
			dataAsArrayUnsigned[i] = this.headerBytes[i];
		}
		
		for (var i = 0; i < this.bytes.length; i++){
			dataAsArrayUnsigned[i + this.headerBytes.length] = this.bytes[i];
		}
		var dataAsBlob = new Blob([dataAsArrayBuffer], {type:'bytes'});


		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(dataAsBlob);
		link.download = "Data.bin";
		link.click();
	}

	Session.prototype.inputFileToLoad_Changed = function(event)
	{
		var inputFileToLoad = event.target;
		var fileToLoad = inputFileToLoad.files[0];
		if (fileToLoad != null)
		{
			var fileReader = new FileReader();
			fileReader.onload = this.inputFileToLoad_Changed_Loaded.bind(this);
			fileReader.readAsBinaryString(fileToLoad);
		}
	}

	Session.prototype.inputFileToLoad_Changed_Loaded = function(fileLoadedEvent)
	{
		var dataAsBinaryString = fileLoadedEvent.target.result;

		this.bytes = [];
		this.headerBytes = [];

		for (var i = 0; i < 7; i++){
			var byte = dataAsBinaryString.charCodeAt(i);
			this.headerBytes.push(byte);
		}
		
		for (var i = 7; i < dataAsBinaryString.length; i++){
			var byte = dataAsBinaryString.charCodeAt(i);
			this.bytes.push(byte);
		}

		this.domElementUpdate();
	}

	Session.prototype.textareaHexadecimal_Changed = function(event)
	{
		var bytesAsStringHexadecimal = event.target.value;
		//var headerAsStringHexadecimal = this.divHeaderValue.value;
		//this.bytes = Converter.stringHexadecimalToBytes(headerAsStringHexadecimal) + Converter.stringHexadecimalToBytes(bytesAsStringHexadecimal);
    this.bytes = Converter.stringHexadecimalToBytes(bytesAsStringHexadecimal);
    
		if (bytesAsStringHexadecimal.length % 2 == 0)
		{
			this.finalNibble = "";
		}
		else
		{
			this.finalNibble = bytesAsStringHexadecimal.substr
			(
				bytesAsStringHexadecimal.length - 1,
				1
			);

			var finalNibbleAsInt = parseInt(this.finalNibble, 16);
			if (isNaN(finalNibbleAsInt) == true)
			{
				this.finalNibble = "";
			}
		}

		this.domElementUpdate();
	}
	
	/*Session.prototype.divHeaderValue_Changed = function(event)
	{
		var bytesAsStringHexadecimal = event.target.value;
		//var headerAsStringHexadecimal = this.divHeaderValue.value;
		//this.bytes = Converter.stringHexadecimalToBytes(headerAsStringHexadecimal) + Converter.stringHexadecimalToBytes(bytesAsStringHexadecimal);
    this.headerBytes = Converter.stringHexadecimalToBytes(bytesAsStringHexadecimal);
    
		if (bytesAsStringHexadecimal.length % 2 == 0)
		{
			this.finalNibble = "";
		}
		else
		{
			this.finalNibble = bytesAsStringHexadecimal.substr
			(
				bytesAsStringHexadecimal.length - 1,
				1
			);

			var finalNibbleAsInt = parseInt(this.finalNibble, 16);
			if (isNaN(finalNibbleAsInt) == true)
			{
				this.finalNibble = "";
			}
		}

		this.domElementUpdate();
	}*/

	Session.prototype.textareaHexadecimal_KeyUp = function(event)
	{
		var keyName = event.key;
		if (keyName.startsWith("Arrow") || keyName == "Home" || keyName == "End")
		{
			this.domElementUpdate();
		}
	}

}
