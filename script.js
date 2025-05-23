// script for calculator

function addition(number1, number2) {
	return number1 + number2
}

function subtraction(number1, number2) {
	console.log("inside subtraction")
	return number1 - number2
}

function multiplication(number1, number2) {
	return number1 * number2
}

function division(number1, number2) {
	return number1 / number2
}

function operate(operand, number1, number2) {

	console.log(inputStream)
	if (operand === "+") {
		display.textContent = addition(number1, number2);
		console.log("working")
	}
	if (operand === "-") {
		display.textContent = subtraction(number1, number2)
	}
	if (operand === "*") {
		display.textContent = multiplication(number1, number2)
	}
	if (operand === "/" || operand === "\\") {
		if (number2 === 0) {
			display.textContent = "DivZeroErr"
			inputStream.num1 = null
			inputStream.operand = null
			inputStream.num2 = null

			throw new Error("No / 0!")
		}
		else {
			display.textContent = division(number1, number2)
		}
	}
	
}

function updateDisplay() {
	// take arguments from input and operation output here and update the display.
	// also write a conditional to check if the display is going to overflow and shorten it either by rounding
	// a decimaled number or scientific notation
}

let display = document.querySelector("#display-content")
display.textContent = "0"


const digits = document.querySelectorAll(".digit")
const clear = document.querySelector("#clear")
const decimal = document.querySelector("#decimal")
const backspace = document.querySelector("#delete")
const operators = document.querySelectorAll(".operator")
const add = document.querySelector("#add")
const subtract = document.querySelector("#subtract")
const multiply = document.querySelector("#multiply")
const divide = document.querySelector("#divide")
const equal = document.querySelector("#equal")
let inputStream = {
	"num1": null,
	"operand": null,
	"num2": null,
}

equal.addEventListener("click", () => {
	console.log("shouldn't be here yet")
	console.log(inputStream)
	if (inputStream.num1 && inputStream.operand && inputStream.num2) {
		console.log(inputStream)
		inputStream.num2 = +(display.textContent)
		operate(inputStream.operand, inputStream.num1, inputStream.num2)
		inputStream.num2 = null
		inputStream.num1 = null
		inputStream.operand = null

		
	}
})



operators.forEach((operator) => {
	operator.addEventListener("click", () => {
		// first instance of operator in queue
		if (inputStream.num1 && !(display.textContent === "0") && !(inputStream.operand)) {
			console.log("first operator")
			inputStream.num1 = +(display.textContent);
			inputStream.operand = operator.textContent
			console.log(inputStream)

		}

		// second instance of operator in queue
		// perform previous operation first
		if (!(inputStream.num1 === null) && inputStream.operand && !(inputStream.num2 === null)) {
			console.log("subsequent operators")
			inputStream.num2 = +(display.textContent)
			try {
				console.log("inside try")
				console.log(inputStream)
				operate(inputStream.operand, inputStream.num1, inputStream.num2)
				inputStream.num2 = null
				inputStream.num1 = +(display.textContent)
				inputStream.operand = operator.textContent
				console.log(inputStream)
			} catch (e) {
				console.log("error caught")
				display.textContent = e;
			}
		
		}
	})
})



backspace.addEventListener("click", () => {
	if (display.textContent === "0") {
		return
	}
	else if (display.textContent.length == 1) {
		display.textContent = "0"
	}
	else {
		display.textContent = display.textContent.slice(0, -1)
	}

})

decimal.addEventListener("click", () => {
	// instance for initial decimal after equals has run and values reset
	if (inputStream.num1 === null && !(inputStream.operand) && !(inputStream.num2)) {
		display.textContent = "0" + decimal.textContent
		console.log("decimal inserted")
	}
	// leading decimal for first number at 0
	else if (!(display.textContent.includes(".")) && inputStream.num1 === null) {
		display.textContent = display.textContent + decimal.textContent
	}

	// decimal for first number after digit entered
	else if (!(display.textContent.includes(".")) && !(inputStream.num1 === null) && inputStream.operand === null) {
		display.textContent = display.textContent + decimal.textContent
	}

	// decimal for start of second number
	else if (inputStream.num1 && inputStream.operand && inputStream.num2 === null) {
		display.textContent = "0"
		display.textContent = display.textContent + decimal.textContent
		
	}

	// decimal for second number after digit entered
	else if (inputStream.num1 && inputStream.operand && !(inputStream.num2 === null) && !(display.textContent.includes("."))) {
		console.log("here?")
		display.textContent = display.textContent + decimal.textContent
	}

	
	
})

clear.addEventListener("click", () => {
	display.textContent = "0";
	inputStream.num1 = null
	inputStream.operand = null
	inputStream.num2 = null
})

digits.forEach((digit) => {
	digit.addEventListener("click", () => {
		


		// first digit entered at 0
		if (inputStream.num1 === null && display.textContent === "0") {
			console.log("first number entered")
			display.textContent = digit.textContent
			inputStream.num1 = display.textContent
		}
		// for first number with leading decimal
		else if (!(inputStream.num1) && (display.textContent.includes("."))) {
			display.textContent = display.textContent + digit.textContent
			inputStream.num1 = display.textContent
		}
		// for second number with leading decimal
		else if (inputStream.operand && inputStream.num2 === null && display.textContent === "0.") {
			display.textContent = display.textContent + digit.textContent
			inputStream.num2 = display.textContent
		}
		// first digit of second number without leading decimal but decimal in display
		else if (inputStream.operand && inputStream.num2 === null && display.textContent.includes(".")) {
			display.textContent = digit.textContent
			inputStream.num2 = display.textContent
		}
		
		// ready for second number and subsequent numbers after operand entered without leading decimal
		else if (inputStream.operand && !(inputStream.num2) && !(display.textContent.includes("."))) {
			console.log("second number entered")
			display.textContent = digit.textContent
			inputStream.num2 = display.textContent
			console.log(inputStream)
		}
		
		

		// instance after equals run and object values reset to null or division error
		else if (!(inputStream.num1) && !(inputStream.operand) && !(inputStream.num2)) {
			display.textContent = digit.textContent
			inputStream.num1 = display.textContent
		}

		// continue entering digits for current number in display
		else {
			display.textContent = display.textContent + digit.textContent
			
		}
	})
})

