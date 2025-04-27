	/**
     * Handles input from the onscreen keypad
     * @param {*} input 
     */
    function parseInput(input)
	{
		let value = document.getElementById("input").value;
		if(value === "" && input != "0" && input != "1" &&//If the input is blank add a zero to avoid exceptions
            input != "2" && input != "3" && input != "4" && 
            input != "5" && input != "6" && input != "7" && 
            input != "8" && input != "9" && input != "√" && 
            input != "-" && input != "(" && input != ")")
		{
			document.getElementById("input").value = "0";
		}
		
        if((isOperator(value.substr(value.length-1), false) || value.substr(value.length-1) === ".") && (isOperator(input, false)))
		{
			document.getElementById("input").value = value.substr(0, value.length-1);//Prevent double operators
		}

		if(value.substr(value.length-1) === "√" && (isOperator(input, false) || input === "."))
		{
			return;
		}

		if(checkFloatingPointNum(value) && input === ".")//If the user is typing a floating point number and tries to pass another comma, ignore it
		{
			return;
		}
		else
		{
			document.getElementById("input").value += input;//Append the user's input
		}
	}
	
    /**
     * Implements backspace button functionality
     */
	function backspace()
	{
		let value = document.getElementById("input").value;
		if(value.length>0)
		{
			document.getElementById("input").value = value.substr(0, value.length-1);//Delete last character
		}
	}
	
    /**
     * Implements clear button functionality
     */
	function clearInput()
	{
		document.getElementById("input").value = "";
		document.getElementById("calculations").innerHTML = "&nbsp;";
	}
	
    /**
     * Checks if the given input is an operator
     * @param {*} input 
     * @param {*} checkSqrt Flag that denotes if square root symbol should be considered as well
     */
    function isOperator(input, checkSqrt)
    {
        if((input === "^" || input === "*" || input === "/" || input === "+" || input === "-"))
        {
            return true;
        }
        
        if(checkSqrt)
        {
            if(input === "√")
            {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if a floating point number is present in the user's input
     * @param {*} contents 
     */
	function checkFloatingPointNum(contents)
	{
		let isFloatingPoint = false;//Boolean flag that becomes true if the user types a floating point number
		for(let i = 0; i<contents.length; i++)
		{
			if(contents[i] === ".")//If a comma is being typed, enable the flag as it signifies that a floating point number will be passed
			{
				isFloatingPoint = true;
			}
			if(isOperator(contents[i], false))// If the user has passed an operator the flag will be disabled as the floating point number will have been passed 
			{
				isFloatingPoint = false;
			}
		}

		return isFloatingPoint;
	}
	
    /**
     * Handles input validation
     */
	function checkInput()
	{
		let e = window.event;//Get the value of the event or if it's undefined get the value of window.event
		let currentVal = document.getElementById("input").value;//Get the current value of the input
		if(e.shiftKey)//Allow certain characters that require the shift key to be passed (e.g. +,^)
		{
			if(e.code != "Digit6" && e.code != "Digit8" && e.code != "Digit9" && e.code != "Digit0" && e.code != "Equal")//Accept only specific shift+number symbols 
			{
				e.preventDefault();
			}
		}
		
        //Allow only specified input values
		if(e.code != "Digit0" && e.code != "Digit1" && e.code != "Digit2" &&  e.code != "Digit3" && 
		    e.code != "Digit4" && e.code != "Digit5" && e.code != "Digit6" && e.code != "Digit7" && 
		    e.code != "Digit8" && e.code != "Digit9" && e.code != "Backspace" && e.code  != "Slash" &&
		    e.code != "Minus" && e.code != "Period" && e.code != "Equal" && e.code != "Enter" &&
		    e.code != "ArrowLeft" && e.code != "ArrowRight" && e.code != "Numpad0" && e.code != "Numpad1" &&
            e.code != "Numpad2" && e.code != "Numpad3" && e.code != "Numpad4" && e.code != "Numpad5" &&
            e.code != "Numpad6" && e.code != "Numpad7" && e.code != "Numpad8" && e.code != "Numpad9" &&
		    e.code != "NumpadMultiply" && e.code != "NumpadAdd" && e.code != "NumpadSubtract" && e.code != "NumpadDivide" &&
	        e.code != "NumpadEnter" && e.code != "NumpadDecimal" && e.code != "Delete" && e.code != "Home" && e.code != "End"
		)
		{
			if(e.ctrlKey)//Allow certain shortcuts that require the ctrl key to be passed (e.g. copy, paste, undo)
			{
				if(e.code != "KeyA" && e.code != "KeyC" && e.code != "KeyV" && e.code != "KeyZ")
				{
					e.preventDefault();
				}
			}
			else			
			{
				e.preventDefault();
			}
		}
		else
		{
			if(e.key === "." && checkFloatingPointNum(currentVal))
			{
				e.preventDefault();
			}
		}
        
		if(e.code === "Enter" || e.code === "NumpadEnter" || (e.code === "Equal" && e.key === "="))
		{
			if(e.code === "Equal" && e.key === "=")//Don't type in the equals sign
			{
				e.preventDefault();
			}
            
			prepareCalculations(currentVal);
		}
		
		if((isOperator(currentVal.charAt(currentVal.length-1), false) || currentVal.charAt(currentVal.length-1) === ".") &&
                (e.code === "NumpadMultiply" || (e.shiftKey && e.code === "Digit8") ||
                (e.code === "NumpadSubtract" || (e.code === "Minus"))||
                (e.code === "NumpadAdd" || (e.shiftKey && e.code === "Equal"))||
                (e.code === "NumpadDivide" || (e.code === "Slash"))||
                e.shiftKey && e.code === "Digit6" ||
                e.code === "Period" || e.code === "NumpadDecimal")//If a second operation symbol is typed in a row, change the operation
            )
		{
			document.getElementById("input").value = currentVal.substr(0, currentVal.length-1);
		}

        if(isOperator(currentVal.charAt(currentVal.length-1), true) && (e.code === "Digit0" && e.shiftKey))//Don't allow to close a parentheses pair without complete operations within
		{
			e.preventDefault();
		}
	}

    /**
     * Removes line breaks, whitespace and unnecessary characters from
     * the given input
     * @param {*} contents 
     */
    function trimInput(contents)
    {
        const newLineRegex = new RegExp("/\r?\n|\r",'g');
        const invalidCharRegex = new RegExp("[A-Za-z$!#_?&@`~ \t]",'g');

        contents = contents.replaceAll(newLineRegex, "");
        contents = contents.replaceAll(invalidCharRegex, "");
        
        return contents;
    }

    /**
     * Validates the given expression and calculates the result
     * (provided that the expression is valid)
     * @param {*} contents 
     */
	function prepareCalculations(contents)
	{
		let countL = 0;
		let countR = 0;
        let errMsg = "";
        
        contents = trimInput(contents);

        if(isOperator(contents.substr(contents.length - 1), true))//Do not allow trailing operators
        {
            errMsg = "Illegal expression";
        }

		let calculations = contents;
        for (let i = 0; i<contents.length; i++)
		{
            if(contents[i] != "(" && !isOperator(contents[i], true) && contents[i+1] === "(")//Don't allow a parentheses to open without an operator
            {
                errMsg = "Illegal expression";
                break;
            }
            else if(contents[i+1] === ")" && isOperator(contents[i], true))
            {
                errMsg = "Illegal expression";
                break;
            }
			
			if(contents[i] === "(" && contents[i+1] === "-")//Allow negative numbers in parentheses
			{
				errMsg = "";
			}

			if(contents[i] === "(")
			{
				countL++;
			}
			else if(contents[i] === ")")
			{
				countR++;
			}

            if(isOperator(contents[i], false))
            {
                if(isOperator(contents[i+1], false))
                {
                    errMsg = "Illegal expression";
                    break;
                }
            }
		}

		if(countR != countL)
		{
            errMsg = "Malformed parentheses";
		}

		if(errMsg != "")
		{
			alert(errMsg);
		}
		else
		{
			contents = calculate(contents);
			document.getElementById("calculations").innerHTML = calculations;
			document.getElementById("input").value = contents;
		}
	}
	
    /**
     * Handles the calculation of the given expression
     * @param {*} contents 
     */
	function calculate(contents)
	{   
		let current = contents;
		let calculationsArray = [];
		let temp = "";
		
		for(let i = 0; i<current.length;i++)//Pass the operations to an array, where numbers are properly separated from the operations
		{
			if(current[i]  != "(" && current[i]  != ")" && 
				current[i]  != "^" && current[i]  != "√" && 
				current[i]  != "*" && current[i]  != "/" &&
				current[i]  != "+" && current[i]  != "-")
			{
				temp += current[i];//Build multidigit and floating point numbers (append the character if it isn't an operator)
			}
			else
			{
				if(temp != "")//If the current value isn't empty
				{
					calculationsArray.push(temp);//Add the number to the calculationsArray
					calculationsArray.push(current[i]);//Add the operator after the number
					temp = "";
				}
				else
				{
					calculationsArray.push(current[i]);
				}
			}
			
			if (i == current.length-1)//Push the last number
			{
				if(temp != "")
				{
					calculationsArray.push(temp);
				}
			}
		}

		calculationsArray = firstNumSign(calculationsArray);
		calculationsArray = parenthesesSign(calculationsArray);
		calculationsArray = handleParentheses(calculationsArray);
		calculationsArray = recursivePowersSqrt(calculationsArray,calculationsArray.length-1);
		calculationsArray = recursiveMultDiv(calculationsArray,0);
		calculationsArray = recursiveAddSub(calculationsArray,0);

		return calculationsArray;
	}
	
    /**
     * Sets the appropriate sign for the first number
     * @param {*} calculations 
     */
	function firstNumSign(calculations)
	{
		if(calculations[0] === "-")//If the number is negative
		{
			let negative = calculations[0] + calculations[1];
			calculations[0] = negative;
			calculations.splice(1,1);
		}

		return calculations;
	}
	
    /**
     * Appends the appropriate sign to the leading number in a set of parentheses
     * @param {*} calculations 
     */
	function parenthesesSign(calculations)
	{
		for(let i = 0; i<calculations.length;i++)
		{
			if(calculations[i] === "(" && calculations[i+1] === "-")
			{
				let negative = calculations[i+1]+calculations[i+2];
				calculations[i+1] = negative;
				calculations.splice(i+2, 1);
			}
		}
        
		return calculations;
	}
	
    /**
     * Calculates all the operations within parentheses
     * @param {*} calculations 
     */
	function handleParentheses(calculations)
	{
		let leftPar = -1;
		let rightPar = -1;
		for(let i = 0; i<calculations.length;i++)//Loop to calculate the indexes of the parentheses
		{
			if(calculations[i] === "(")
			{
				leftPar = i;
			}
			else if(calculations[i] === ")")
			{
				rightPar = i;
			}

			if(leftPar != -1 && rightPar != -1)//When the pair of parentheses has been found, perform the operations within
			{
				if(rightPar-leftPar == 2)//If the parentheses contain a single number
				{
					calculations.splice(leftPar,1);//Remove the left parentheses
					calculations.splice(rightPar-1,1);//Remove the right parentheses (index has moved by one because we removed the left parentheses)
				}
				else
				{
					calculations = recursivePowersSqrt(calculations,rightPar);
					calculations = recursiveMultDiv(calculations,leftPar);
					calculations = recursiveAddSub(calculations,leftPar);
				}	
				
				leftPar = -1;//Reset the indexes in order to find the next pair of parentheses (if there is another)
				rightPar = -1;
				i = -1;//Set the loop counter to -1 in order to start the loop over, as the loop counter will increment by one
			}
		}

		return calculations;
	}
	
    /**
     * Recursively calculates all the powers withtin a mathmatical expression (starting from the end)
     * @param {*} calculations 
     * @param {*} index 
     */
	function recursivePowersSqrt(calculations, index)
	{
		let result;
		if(calculations[index-1] === "^")//If the previous index is power operator e.g. 2^3^2--> index = 2 (second operand) , index-1 = ^ (operator) , index-2 = 3 (second operand)
		{							    //Powers are handled in reverse order in order to properly calculate exponentiated powers
			if(calculations[index-2].includes(".") || calculations[index].includes("."))//Check if the current operands are "floating point" numbers
			{//These checks are necessary as the input is passsed as a string and then parsed to the according datatype via parseInt() or parseFloat()
				if(calculations[index-2].includes(".") && calculations[index].includes("."))//If both operands are floating point numbers
				{
					result = Math.pow(parseFloat(calculations[index-2]),parseFloat(calculations[index]));//Calculate the power 
					calculations[index-2] = result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index-1, 2);//Splice the operator and second operand
				}
				else if(!calculations[index-2].includes(".") && calculations[index].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result = Math.pow(parseInt(calculations[index-2]),parseFloat(calculations[index]));
					calculations[index-2] = result.toString();
					calculations.splice(index-1, 2);
				}
				else if(calculations[index-2].includes(".") && !calculations[index].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result = Math.pow(parseFloat(calculations[index-2]),parseInt(calculations[index]));
					calculations[index-2] = result.toString();
					calculations.splice(index-1, 2);
				}
			}
			else//Current operands are both integers
			{
				result = Math.pow(parseInt(calculations[index-2]),parseInt(calculations[index]));
				calculations[index-2] = result.toString();
				calculations.splice(index-1, 2);
			}

			return recursivePowersSqrt(calculations,index);//Proceed for the rest of the expressions
		}
		else if(calculations[index-1] === "√")
		{
			if(calculations[index].includes("."))//Check if the current operands are "floating point" numbers
			{                                   //These checks are necessary as the input is passsed as a string and then parsed to the according datatype via parseInt() or parseFloat()
				if(calculations[index].includes("."))//If the operand is a floating point number
				{
					result = Math.sqrt(parseFloat(calculations[index]));//Calculate the square root
					calculations[index] = result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index-1, 1);//Splice the operator and second operand
				}
			}
			else//Current operand is integer
			{
				result = Math.sqrt(parseInt(calculations[index]));
				calculations[index] = result.toString();
				calculations.splice(index-1, 1);
			}

			return recursivePowersSqrt(calculations,index);//Proceed for the rest of the expression
		}
		else if(index == 0 || calculations[index-1] == "(")//If the final operand is reached or the end of a parentheses, return the new calculation array
		{
			return calculations;
		}
		else//If the previous index isn't a power operator, proceed to the next
		{
			return recursivePowersSqrt(calculations,index-1);
		}
	}

    /**
     * Recursively calculates all the multiplications and divisions withtin a mathmatical expression (from left to right)
     * @param {*} calculations 
     * @param {*} index 
     */
	function recursiveMultDiv(calculations, index)
	{
		let result;
		if(calculations[index+1] === "*")//If the next index is multiplication operator  e.g. 1*3--> index = 1 (first operand) , index+1 = * (operator) , index+2 = 3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))//Check if the current operands are "floating point" numbers
			{//These checks are necessary as the input is passsed as a string and then parsed to the according datatype via parseInt() or parseFloat()
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result = parseFloat(calculations[index]) * parseFloat(calculations[index+2]);//Calculate the result
					calculations[index] = result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1, 2);//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result = parseInt(calculations[index]) * parseFloat(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result = parseFloat(calculations[index]) * parseInt(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
			}
			else//Current operands are both integers
			{
				result = parseInt(calculations[index]) * parseInt(calculations[index+2]);
				calculations[index] = result.toString();
				calculations.splice(index+1, 2);
			}

			return recursiveMultDiv(calculations,index);//Proceed for the rest of the expression
		}
		else if(calculations[index+1] === "/")//If the next index is the division operator  e.g. 1/3--> index = 1 (first operand) , index+1 = / (operator) , index+2 = 3 (second operand)
		{   
			if(calculations[index].includes(".") || calculations[index+2].includes("."))//Check if the current operands are "floating point" numbers
			{
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result = parseFloat(calculations[index]) / parseFloat(calculations[index+2]);//Calculate the result
					calculations[index] = result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1, 2);//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result = parseInt(calculations[index]) / parseFloat(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result = parseFloat(calculations[index]) / parseInt(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
			}
			else//Current operands are both integers
			{
				result = parseInt(calculations[index])/ parseInt(calculations[index+2]);
				calculations[index] = result.toString();
				calculations.splice(index+1, 2);
			}

			return recursiveMultDiv(calculations,index);
		}
		else if(index > calculations.length || calculations[index+1] === ")")//If the final operand is reached or the end of a parentheses, return the new calculation array
		{
			return calculations;
		}
		else//If the previous index isn't a multiplication or division operator, proceed to the next
		{
			return recursiveMultDiv(calculations, index+1);
		}
	}
	
    /**
     * Recursively calculates all the additions and subtractions withtin a mathmatical expression (from left to right)
     * @param {*} calculations 
     * @param {*} index 
     */
	function recursiveAddSub(calculations, index)
	{
		let result;
		if(calculations[index+1] === "+")//If the next index is multiplication operator  e.g. 1+3--> index = 1 (first operand) , index+1 = + (operator) , index+2 = 3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))//Check if the current operands are "floating point" numbers
			{
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result = parseFloat(calculations[index]) + parseFloat(calculations[index+2]);//Calculate the result
					calculations[index] = result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1, 2);//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result = parseInt(calculations[index]) + parseFloat(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result = parseFloat(calculations[index]) + parseInt(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
			}
			else//Current operands are both integers
			{
				result = parseInt(calculations[index])+ parseInt(calculations[index+2]);
				calculations[index] = result.toString();
				calculations.splice(index+1, 2);
			}
            
			return recursiveAddSub(calculations,index);
		}
		else if(calculations[index+1] === "-" && calculations[index-2] != ")")//If the next index is a subtraction operator  e.g. 1-3--> index = 1 (first operand) , index+1 = - (operator) , index+2 = 3 (second operand)
		{
			if(calculations[index].includes(".") || calculations[index+2].includes("."))
			{
				if(calculations[index].includes(".") && calculations[index+2].includes("."))//If both operands are floating point numbers
				{
					result = parseFloat(calculations[index]) - parseFloat(calculations[index+2]);//Calculate the result
					calculations[index] = result.toString();//Replace the first operand with the result, also parse the result as string
					calculations.splice(index+1, 2);//Splice the operator and second operand
				}
				else if(!calculations[index].includes(".") && calculations[index+2].includes("."))//If the first operand is an integer and the second is a floating point number
				{
					result = parseInt(calculations[index]) - parseFloat(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
				else if(calculations[index].includes(".") && !calculations[index+2].includes("."))//If the first operand is a floating point number and the second is an integer
				{
					result = parseFloat(calculations[index]) - parseInt(calculations[index+2]);
					calculations[index] = result.toString();
					calculations.splice(index+1, 2);
				}
			}
			else//Current operands are both integers
			{
				result = parseInt(calculations[index])- parseInt(calculations[index+2]);
				calculations[index] = result.toString();
				calculations.splice(index+1, 2);
			}

			return recursiveAddSub(calculations,index);
		}
		else if(index>calculations.length || calculations[index+1] === ")")//If the final operand is reached (or the end of a parentheses), return the new calculation array
		{
			return calculations;
		}
		else//If the previous index isn't an addition or subtraction operator, proceed to the next
		{
			return recursiveAddSub(calculations,index+1);
		}
	}
	
    /**
     * Expands the extra functions row.
     */
	function expand()
	{
		if(document.getElementById("extras").className === "inactive")
		{
			document.getElementById("extras").className = "active";
			document.getElementById("toggle").innerHTML = "Shrink ↑";
		}
		else
		{
			document.getElementById("extras").className = "inactive";
			document.getElementById("toggle").innerHTML = "Expand ↓";
		}
	}
	
    /**
     * Toggles the instructions panel on/off and changes the button text
     */
	function toggleInstructions()
	{
		if(document.getElementById("instructions").className === "active")
		{	
			document.getElementById("instrToggle").innerHTML = "↓Instructions";
			document.getElementById("instructions").className = "inactive";		
		}
		else
		{
			document.getElementById("instructions").className = "active";
			document.getElementById("instrToggle").innerHTML = "↑Instructions";	
		}
	}
	
    /**
     * Toggles the theme panel on/off and change button text
     */
	function toggleThemeMenu()
	{
		if(document.getElementById("theme").className === "active")
		{	
			document.getElementById("themeMenuToggle").innerHTML = "↓Theme";
			document.getElementById("theme").className = "inactive";		
		}
		else
		{
			document.getElementById("theme").className = "active";
			document.getElementById("themeMenuToggle").innerHTML = "↑Theme";	
		}
	}
	
    /**
     * Loads the appropriate theme depending on the value of the theme localStorage item
     */
	function getTheme()
	{
		let currentTheme = localStorage.getItem("theme");
		
        if(!currentTheme)
		{
			localStorage.setItem("theme","default");//If no theme preference has been stored, store the default one
		}
		else
		{
			if(currentTheme === "dark")//If the user has selected dark mode, set the toggle switch on
			{
				document.getElementById("themeToggle").checked = true;
			}
			else
			{
				document.getElementById("themeToggle").checked = false;
			}

			toggleTheme();
		}
	}
	
    /**
     * Toggles the active css stylesheet
     */
	function toggleTheme()
	{
		let theme = document.getElementById("stylesheet");
		if(document.getElementById("themeToggle").checked)//If the toggle switch is enabled
		{
			localStorage.setItem("theme","dark");//Store the user's preference 
			theme.href = "style-dark.css";//Switch to the dark mode style sheet
		}
		else
		{
			localStorage.setItem("theme","default");
			theme.href = "style.css";
		}
	}

    document.addEventListener('DOMContentLoaded', () => {
        getTheme();
    });
