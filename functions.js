	function parseInput(input)//Handles input from the onscreen keypad
	{
		let value=document.getElementById("input").value;
		let pos=document.getElementById("input").selectionStart;
		if(value==="" && input!="0" && input!="1"&&//If the input is blank add a zero to avoid exceptions
		 input!="2"&&
		 input!="3"&&
		 input!="4"&&
		 input!="5"&&
		 input!="6"&&
		 input!="7"&&
		 input!="8"&&
		 input!="9" &&
		 input!="√" &&
		 input!="(" &&
		 input!=")")
		{
			document.getElementById("input").value="0";
		}
		if((value.substr(value.length-1)==="^" ||
			value.substr(value.length-1)==="*" ||
			value.substr(value.length-1)==="/" ||
			value.substr(value.length-1)==="+" ||
			value.substr(value.length-1)==="-" ||
			value.substr(value.length-1)==="."			)&&
			(input==="^" ||  input==="*" || input==="/" || input==="+" || input==="-" || input===".")) 
		{
			document.getElementById("input").value= value.substr(0, value.length-1);//Prevent double operators
		}
		if((value.substr(value.length-1)!="^" &&
			value.substr(value.length-1)!="√" &&
			value.substr(value.length-1)!="" &&
			value.substr(value.length-1)!="*" &&
			value.substr(value.length-1)!="/" &&
			value.substr(value.length-1)!="+" &&
			value.substr(value.length-1)!="-" ) && input==="√") //Only allow square roots between operations
		{
			return;
		}
		if(value.substr(value.length-1)==="√" && 
			(input==="^" ||  input==="*" || input==="/" || input==="+" || input==="-" || input==="."))
		{
			return;
		}
		if( checkFloatingPointNum(value) && input ===".")//If the user is typing a floating point number and tries to pass another comma, ignore it
		{
			return;
		}
		else
		{
			document.getElementById("input").value+=input;//Append the user's input
		}
	}
	
	function backspace()
	{
		let value=document.getElementById("input").value;
		if(value.length>0)
		{
			document.getElementById("input").value= value.substr(0, value.length-1);//Delete last character
		}
	}
	
	function clearInput()
	{
		document.getElementById("input").value="";
		document.getElementById("calculations").innerHTML="&nbsp;";
	}
	
	function checkFloatingPointNum(contents)
	{
		let isFloatingPoint=false;// Boolean flag that becomes true if the user types a floating point number
		for(let i=0;i<contents.length;i++)
		{
			if(contents[i]===".")//If a comma is being typed, enable the flag as it signifies that a floating point number will be passed
			{
				isFloatingPoint=true;
			}
			if(contents[i]==="^" ||
				contents[i]==="*" ||
				contents[i]==="/" ||
				contents[i]==="+" ||
				contents[i]==="-" )// If the user has passed an operator the flag will be disabled as the floating point number will have been passed 
			{
				isFloatingPoint=false;
			}
		}
		return isFloatingPoint;
	}
	
	function checkInput()//Handles keyboard input
	{
		var e= event || window.event; //Get the value of the event or if it's undefined get the value of window.event
		var key = e.code//Get the key that was pressed on keydown
		var currentVal=document.getElementById("input").value;//Get the current value of the input
		if(e.shiftKey)//Allow certain characters that require the shift key to be passed (e.g. +,^)
		{
			//console.log(e.code +" "+e.key);
			if(e.code != "Digit6" && e.code != "Digit8" && e.code != "Digit9" && e.code != "Digit0" && e.code != "Equal")//Accept only specific shift+number symbols 
			{
				e.returnValue = false;	
			}
		}
		
		if(e.code != "Digit0" && //Allow only specified input values
		e.code != "Digit1" && 
		e.code != "Digit2" && 
		e.code != "Digit3" && 
		e.code != "Digit4" && 
		e.code != "Digit5" && 
		e.code != "Digit6" && 
		e.code != "Digit7" && 
		e.code != "Digit8" && 
		e.code != "Digit9" && 
		e.code != "Backspace" &&
		e.code !="Slash" &&
		e.code!="Minus" && 
		e.code!="Period" &&
		e.code!="Equal" &&
		e.code!="Enter" &&
		e.code!="ArrowLeft" &&
		e.code!="ArrowRight" &&
		e.code!="Numpad0"&&
		e.code!="Numpad1"&&
		e.code!="Numpad2"&&
		e.code!="Numpad3"&&
		e.code!="Numpad4"&&
		e.code!="Numpad5"&&
		e.code!="Numpad6"&&
		e.code!="Numpad7"&&
		e.code!="Numpad8"&&
		e.code!="Numpad9"&&
		e.code!="NumpadMultiply"&&
		e.code!="NumpadAdd"&&
		e.code!="NumpadSubtract"&&
		e.code!="NumpadDivide"&&
		e.code!="NumpadEnter"&&
		e.code!="NumpadDecimal"
		)
		{
			if(e.ctrlKey)//Allow certain shortcuts that require the ctrl key to be passed (e.g. copy, paste, undo)
			{
				if(e.code!="KeyA" && e.code!="KeyC" && e.code!="KeyV" && e.code!="KeyZ")
				{
					e.returnValue = false;
				}
			}
			else			
			{
				e.returnValue = false;		
			}
				
		}
		else
		{
			if(e.key==="." && checkFloatingPointNum(currentVal))
			{
				e.returnValue=false;
			}
		}
		if(e.code==="Enter" || (e.code==="Equal" && e.key==="="))
		{
			if(e.code==="Equal" && e.key==="=")//Don't type in the equals sign
			{
				e.returnValue=false;
			}
			prepareCalculations(currentVal);
		}
		
		if((currentVal.charAt(currentVal.length-1)==="*" ||
			currentVal.charAt(currentVal.length-1)==="-" ||
			currentVal.charAt(currentVal.length-1)==="+" ||
			currentVal.charAt(currentVal.length-1)==="/" ||
			currentVal.charAt(currentVal.length-1)==="." ||
			currentVal.charAt(currentVal.length-1)==="^") &&
			(e.code==="NumpadMultiply" || (e.shiftKey && e.code==="Digit8") ||
			(e.code==="NumpadSubtract" || (e.code==="Minus"))||
			(e.code==="NumpadAdd" || (e.shiftKey && e.code==="Equal"))||
			(e.code==="NumpadDivide" || (e.code==="Slash"))||
			e.shiftKey && e.code==="Digit6" ||
			e.code==="Period" || e.code==="NumpadDecimal") //If a second operation symbol is typed in a row, change the operation
			)
		{
			console.log(currentVal.charAt(currentVal.length-1));
			document.getElementById("input").value= currentVal.substr(0, currentVal.length-1);
		}
		if((currentVal.charAt(currentVal.length-1)==="+" ||
			currentVal.charAt(currentVal.length-1)==="-" ||
			currentVal.charAt(currentVal.length-1)==="*" ||
			currentVal.charAt(currentVal.length-1)==="/" ||
			currentVal.charAt(currentVal.length-1)==="^") &&(e.code==="Digit0" && e.shiftKey))//Don't allow to close a parentheses pair without complete operations within
		{
				e.returnValue=false;
		}
			
	}
	
	function prepareCalculations(contents)
	{
		
		console.log("Contents: "+contents);
		let countL=0;
		let countR=0;
		let illegal=false;
		var calculations=contents;
		for (let i=0; i<contents.length; i++)
		{
			if((contents[i] !="(" && 
			    contents[i] !="^" && 
			    contents[i] !="√" && 
				contents[i] !="*" &&
				contents[i] !="/" &&
				contents[i] !="+" &&
				contents[i] !="-") && contents[i+1]==="(" )//Don't allow a parentheses to open without an operator
			{
				illegal=true;
			}
			else if((contents[i] ==="^" || 
				contents[i] ==="*" ||
				contents[i] ==="/" ||
				contents[i] ==="+" ||
				contents[i] ==="-") && contents[i+1]===")" )
			{
				illegal=true;
			}
			if(contents[i]==="(" && contents[i+1]==="-")//Allow negative numbers in parentheses
			{
				illegal=false;
			}
			if(contents[i]==="(")
			{
				countL++;
			}
			else if(contents[i]===")")
			{
				countR++;
			}
		}
		if(countR!=countL)
		{
			alert("Malformed parentheses");
		}
		if(illegal)
		{
			alert("Illegal expression");
		}
		else//Properly handle operation priority
		{
			console.log("old contents: "+contents);
			contents=calculate(contents);
			console.log("New contents: "+contents);
			document.getElementById("calculations").innerHTML=calculations;
			document.getElementById("input").value=contents;
			
		}
	}
	
	function calculate(contents)//Handle operations
	{
		var result="";
		var current=contents;
		var calculationsArray=[];
		var temp="";
		
		for(let i=0; i<current.length;i++)//Pass the operations to an array, where numbers are properly separated from the operations
		{
			if(current[i] !="(" && 
				current[i] !=")" && 
				current[i] !="^" && 
				current[i] !="√" && 
				current[i] !="*" &&
				current[i] !="/" &&
				current[i] !="+" &&
				current[i] !="-")
			{
				temp+=current[i];//Build multidigit and floating point numbers (append the character if it isn't an operator)
			}
			else
			{
				if(temp!="")//If the current value isn't undefined
				{
					calculationsArray.push(temp);//Add the number to the calculationsArray
					calculationsArray.push(current[i]);//Add the operator after the number
					temp="";
				}
				else
				{
					calculationsArray.push(current[i]);
				}
			}
			
			if (i==current.length-1)//Push the last number
			{
				if(temp!="")
				{
					calculationsArray.push(temp);
				}
			}
			
		}
		/*for(let i=0;i<calculationsArray.length;i++)
		{
			console.log("i= "+i+" = "+calculationsArray[i]);
		}*/
		calculationsArray=firstNumSign(calculationsArray);
		calculationsArray=parenthesesSign(calculationsArray);
		calculationsArray=handleParentheses(calculationsArray);
		console.log("Parentheses exit");
		calculationsArray=recursivePowersSqrt(calculationsArray,calculationsArray.length-1);
		console.log("CalcpowersSqrt exit");
		console.log("Pow "+calculationsArray.toString());
		/*for(let i=0;i<calculationsArray.length;i++)
		{
			console.log("i= "+i+" = "+calculationsArray[i]);
		}*/
		calculationsArray=recursiveMultDiv(calculationsArray,0);
		console.log("CalcMultDiv exit");

		calculationsArray=recursiveAddSub(calculationsArray,0);
		console.log("CalcSub exit");
		/*for(let i=0;i<calculationsArray.length;i++)
		{
			console.log("i= "+i+" = "+calculationsArray[i]);
		}*/
		return calculationsArray;
	}
	
	function firstNumSign(calculations)//Set the first number's sign
	{
		if(calculations[0]==="-")//If the number is negative
		{
			let negative=calculations[0]+calculations[1];
			calculations[0]=negative;
			console.log(negative);
			calculations.splice(1,1);
			console.log(calculations);
		}
		return calculations;
	}
	
	function parenthesesSign(calculations)//If the first number of a parentheses is negative, append it's sign to the numer
	{
		for(let i=0; i<calculations.length;i++)
		{
			if(calculations[i]==="(" && calculations[i+1]==="-")
			{
				let negative=calculations[i+1]+calculations[i+2];
				calculations[i+1]=negative;
				calculations.splice(i+2,1);
			}
		}
		return calculations;
	}
	
	function handleParentheses(calculations)//Calculates all the operations within parentheses
	{
		var leftPar=-1;
		var rightPar=-1;
		var distance=0;
		for(let i=0; i<calculations.length;i++)//Loop to calculate the indexes of the parentheses
		{
			if(calculations[i]==="(")
			{
				leftPar=i;
				console.log("leftPar index: "+leftPar) ;
			}
			else if(calculations[i]===")")
			{
				rightPar=i;
				console.log("rightPar index: "+rightPar) ;
			}
			if(leftPar!=-1 && rightPar!=-1)//When the pair of parentheses has been found, perform the operations within
			{
				console.log("i: "+calculations[i]);
				console.log("(: "+leftPar +" ): "+rightPar);
				if(rightPar-leftPar==2)//If the parentheses contain a single number
				{
					calculations.splice(leftPar,1);//Remove the left parentheses
					calculations.splice(rightPar-1,1);//Remove the right parentheses (index has moved by one because we removed the left parentheses)
				}
				else
				{
					calculations=recursivePowersSqrt(calculations,rightPar);
					console.log("Pow "+calculations.toString());
					calculations=recursiveMultDiv(calculations,leftPar);
					console.log("MultDiv "+calculations.toString());
					calculations=recursiveAddSub(calculations,leftPar);
					console.log("AddSub "+calculations.toString());
				}	
				
				leftPar=-1;//Reset the indexes in order to find the next pair of parentheses (if there is another)
				rightPar=-1;
				i=-1;//Set the loop counter to -1 in order to start the loop over, as the loop counter will increment by one
			}
		}	
		return calculations;
	}
	
	
	function recursivePowersSqrt(calculations,index)//Recursively calculates all the powers withtin a mathmatical expression (starting from the end)
	{
		var result;
		if(calculations[index-1]==="^")//If the previous index is power operator e.g. 2^3^2--> index = 2 (second operand) , index-1 = ^ (operator) , index-2=3 (second operand)
		{							   //Powers are handled in reverse order in order to properly calculate exponentiated powers
			console.log("index "+calculations[index]);
			if(calculations[index-2].includes(".") || calculations[index].includes("."))//Check if the current operands are "floating point" numbers
			{//These checks are necessary as the input is passsed as a string and then parsed to the according datatype via parseInt() or parseFloat()
				if(calculations[index-2].includes(".") && calculations[index].includes("."))//If both operands are floating point numbers
				{
					result=Math.pow(parseFloat(calculations[index-2]),parseFloat(calculations[index]));//Calculate the power 
					console.log("PowerFFResult: "+result);
					calculations[index-2]=result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index-1,2)//Splice the operator and second operand
				}
				else if(!calculations[index-2].includes(".") && calculations[index].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result=Math.pow(parseInt(calculations[index-2]),parseFloat(calculations[index]));
					console.log("PowerIFResult: "+result);
					calculations[index-2]=result.toString();
					calculations.splice(index-1,2)
				}
				else if(calculations[index-2].includes(".") && !calculations[index].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result=Math.pow(parseFloat(calculations[index-2]),parseInt(calculations[index]));
					console.log("PowerFIResult: "+result);
					calculations[index-2]=result.toString();
					calculations.splice(index-1,2)
				}
			}
			else//Current operands are both integers
			{
				result=Math.pow(parseInt(calculations[index-2]),parseInt(calculations[index]));
				console.log("PowerIIResult: "+result);
				calculations[index-2]=result.toString();
				calculations.splice(index-1,2)
			}	
			return recursivePowersSqrt(calculations,index);//Proceed for the rest of the expression
		}
		else if(calculations[index-1]==="√")
		{
			if(calculations[index].includes("."))//Check if the current operands are "floating point" numbers
			{//These checks are necessary as the input is passsed as a string and then parsed to the according datatype via parseInt() or parseFloat()
				if(calculations[index].includes("."))//If the operand is a floating point number
				{
					result=Math.sqrt(parseFloat(calculations[index]));//Calculate the square root
					console.log("SqrtF Result: "+result);
					calculations[index]=result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index-1,1)//Splice the operator and second operand
				}
			}
			else//Current operand is integer
			{
				result=Math.sqrt(parseInt(calculations[index]));
				console.log("SqrtI Result: "+result);
				calculations[index]=result.toString();
				calculations.splice(index-1,1)
			}	
			return recursivePowersSqrt(calculations,index);//Proceed for the rest of the expression
		}
		else if(index==0 || calculations[index-1]=="(")//If the final operand is reached or the end of a parentheses, return the new calculation array
		{
			return calculations;
		}
		else//If the previous index isn't a power operator, proceed to the next
		{
			return recursivePowersSqrt(calculations,index-1);
		}
	}
	function recursiveMultDiv(calculations,index)//Recursively calculates all the multiplications and divisions withtin a mathmatical expression (from left to right)
	{
		var result;
		if(calculations[index+1]==="*")//If the next index is multiplication operator  e.g. 1*3--> index = 1 (first operand) , index+1 = * (operator) , index+2=3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))//Check if the current operands are "floating point" numbers
			{//These checks are necessary as the input is passsed as a string and then parsed to the according datatype via parseInt() or parseFloat()
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result=parseFloat(calculations[index]) * parseFloat(calculations[index+2]);//Calculate the result
					console.log("MultFFResult: "+result);
					calculations[index]=result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1,2)//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result=parseInt(calculations[index]) * parseFloat(calculations[index+2]);
					console.log("MultIFResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result=parseFloat(calculations[index])* parseInt(calculations[index+2]);
					console.log("MultFIResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
			}
			else//Current operands are both integers
			{
				result=parseInt(calculations[index])* parseInt(calculations[index+2]);
				console.log("MultIIResult: "+result);
				calculations[index]=result.toString();
				calculations.splice(index+1,2)
			}	
			return recursiveMultDiv(calculations,index);//Proceed for the rest of the expression
		}
		else if(calculations[index+1]==="/")//If the next index is the division operator  e.g. 1/3--> index = 1 (first operand) , index+1 = / (operator) , index+2=3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))//Check if the current operands are "floating point" numbers
			{
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result=parseFloat(calculations[index]) / parseFloat(calculations[index+2]);//Calculate the result
					console.log("DivFFResult: "+result);
					calculations[index]=result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1,2)//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result=parseInt(calculations[index]) / parseFloat(calculations[index+2]);
					console.log("DivIFResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result=parseFloat(calculations[index])/ parseInt(calculations[index+2]);
					console.log("DivFIResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
			}
			else//Current operands are both integers
			{
				result=parseInt(calculations[index])/ parseInt(calculations[index+2]);
				console.log("DivIIResult: "+result);
				calculations[index]=result.toString();
				calculations.splice(index+1,2)
			}
			return recursiveMultDiv(calculations,index);
		}
		else if(index>calculations.length || calculations[index+1]===")")//If the final operand is reached or the end of a parentheses, return the new calculation array
		{
			return calculations;
		}
		else//If the previous index isn't a multiplication or division operator, proceed to the next
		{
			return recursiveMultDiv(calculations,index+1);
		}
	}
	
	function recursiveAddSub(calculations,index)//Recursively calculates all the additions and subtractions withtin a mathmatical expression (from left to right)
	{
		var result;
		if(calculations[index+1]==="+")//If the next index is multiplication operator  e.g. 1+3--> index = 1 (first operand) , index+1 = + (operator) , index+2=3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))//Check if the current operands are "floating point" numbers
			{
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result=parseFloat(calculations[index]) + parseFloat(calculations[index+2]);//Calculate the result
					console.log("AddFFResult: "+result);
					calculations[index]=result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1,2)//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result=parseInt(calculations[index]) + parseFloat(calculations[index+2]);
					console.log("AddIFResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result=parseFloat(calculations[index])+ parseInt(calculations[index+2]);
					
					console.log("AddFIResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
			}
			else//Current operands are both integers
			{
				result=parseInt(calculations[index])+ parseInt(calculations[index+2]);
				console.log("AddIIResult: "+result);
				calculations[index]=result.toString();
				calculations.splice(index+1,2)
			}
			return recursiveAddSub(calculations,index);
		}
		else if(calculations[index+1]==="-" && calculations[index-2]!=")")//If the next index is a subtraction operator  e.g. 1-3--> index = 1 (first operand) , index+1 = - (operator) , index+2=3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))
			{
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result=parseFloat(calculations[index]) - parseFloat(calculations[index+2]);//Calculate the result
					console.log("SubFFResult: "+result);
					calculations[index]=result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1,2)//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result=parseInt(calculations[index]) - parseFloat(calculations[index+2]);
					console.log("SubIFResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result=parseFloat(calculations[index])- parseInt(calculations[index+2]);
					console.log("SubFIResult: "+result);
					calculations[index]=result.toString();
					calculations.splice(index+1,2)
				}
			}
			else//Current operands are both integers
			{
				result=parseInt(calculations[index])- parseInt(calculations[index+2]);
				console.log("SubIIResult: "+result);
				calculations[index]=result.toString();
				calculations.splice(index+1,2);
			}
			return recursiveAddSub(calculations,index);
		}
		else if(index>calculations.length || calculations[index+1]===")")//If the final operand is reached (or the end of a parentheses), return the new calculation array
		{
			return calculations;
		}
		else//If the previous index isn't an addition or subtraction operator, proceed to the next
		{
			return recursiveAddSub(calculations,index+1);
		}
	}
	
	function expand()//Expand the extra functions row.
	{
		
		if(document.getElementById("extras").className==="inactive")
		{
			document.getElementById("main").className="expandedBox";//Change container size along with the keypad
			document.getElementById("extras").className="active";
			document.getElementById("toggle").innerHTML="Shrink ↑";
			
		}
		else
		{
			document.getElementById("extras").className="inactive";//Container class doesn't need to be chnaged as it's minimum height accomodates the keypad
			document.getElementById("toggle").innerHTML="Expand ↓";
		}
		
	}
	
	function toggleInstructions()//Toggle the instructions panel on/off and change button text
	{
		if(document.getElementById("instructions").className==="active")
		{	
			document.getElementById("instrToggle").innerHTML="↓Instructions";
			document.getElementById("instructions").className="inactive";		
		}
		else
		{
			document.getElementById("instructions").className="active";
			document.getElementById("instrToggle").innerHTML="↑Instructions";
			
		}
	}