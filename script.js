// script for calculator



function addition(number1, number2) {
	return number1 + number2
}

function subtraction(number1, number2) {
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
	if (operand === "/") {
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

let display = document.querySelector("#display-content")
display.textContent = "0"




const digits = document.querySelectorAll(".digit")
const clear = document.querySelector("#clear")
const decimal = document.querySelector("#decimal")
const backspace = document.querySelector("#delete")
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
	if (inputStream.num1 && inputStream.operand && inputStream.num2) {
		inputStream.num2 = +(display.textContent)
		operate(inputStream.operand, inputStream.num1, inputStream.num2)
		inputStream.num2 = null
		inputStream.num1 = null
		inputStream.operand = null

		
	}
})

add.addEventListener("click", () => {

	// first instance of operator in queue
	if (inputStream.num1 && !(display.textContent === "0") && !(inputStream.operand)) {
		console.log("first add")
		inputStream.num1 = +(display.textContent);
		inputStream.operand = "+"
	}
	// second instance of operator in queue
	// perform operation first
	if (inputStream.num1 && inputStream.operand && inputStream.num2) {
		inputStream.num2 = +(display.textContent)
		try {
			operate(inputStream.operand, inputStream.num1, inputStream.num2)
			inputStream.num2 = null
			inputStream.num1 = +(display.textContent)
			inputStream.operand = "+"
		} catch (e) {
			display.textContent = e;
		}
		
	}

	// instance of operator on number displayed after equal
	if (inputStream.num1 && !(inputStream.operand)) {
		inputStream.operand = "+"
	}
	
})

subtract.addEventListener("click", () => {

	// first operator in queue
	if (inputStream.num1 && !(display.textContent === "0") && !(inputStream.operand)) {

		inputStream.num1 = +(display.textContent)
		inputStream.operand = "-"
	}

	// second or higher instance of operator in queue
	if (inputStream.num1 && inputStream.operand && inputStream.num2) {
		console.log("second subtract")
		inputStream.num2 = +(display.textContent)
		try {
			operate(inputStream.operand, inputStream.num1, inputStream.num2)
			inputStream.num2 = null
			inputStream.num1 = +(display.textContent)
			inputStream.operand = "-"
		} catch (e) {
			display.textContent = e

		}
		
	}
	// instance of operator on number displayed after equal
	if (inputStream.num1 && !(inputStream.operand)) {
		inputStream.operand = "-"
	}
})

multiply.addEventListener("click", () => {

	// first operator in queue
	if (inputStream.num1 && !(display.textContent === "0") && !(inputStream.operand)) {
		inputStream.num1 = +(display.textContent)
		inputStream.operand = "*"
	}

	// second or higher instance of operator in queue
	if (inputStream.num1 && inputStream.operand && inputStream.num2) {
		inputStream.num1 = +(inputStream.num1)
		inputStream.num2 = +(display.textContent)
		try {
			operate(inputStream.operand, inputStream.num1, inputStream.num2)
			inputStream.num2 = null
			inputStream.num1 = +(display.textContent)
			inputStream.operand = "*"
		} catch (e) {
			display.textContent = e
		}
		
	}
	// instance of operator on number displayed after equal
	if (inputStream.num1 && !(inputStream.operand)) {
		inputStream.operand = "*"
	}

})

divide.addEventListener("click", () => {

	// first operator in queue
	if (inputStream.num1 && !(display.textContent === "0") && !(inputStream.operand)) {
		inputStream.num1 = +(display.textContent)
		inputStream.operand = "/"
	}

	// second or higher instance of operator in queue
	else if (inputStream.num1 && inputStream.operand && inputStream.num2) {
		inputStream.num2 = +(display.textContent)
		try {
			operate(inputStream.operand, inputStream.num1, inputStream.num2)
			inputStream.num2 = null
			inputStream.num1 = +(display.textContent)
			inputStream.operand = "/"
		} catch (e) {
			display.textContent = e
		}
		
		
	}
	// instance of operator on number displayed after equal
	if (inputStream.num1 && !(inputStream.operand)) {
		inputStream.operand = "/"
	}

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
	if (!(inputStream.num1) && !(inputStream.operand) && !(inputStream.num2)) {
		display.textContent = "0" + decimal.textContent
		console.log("decimal inserted")
	}
	// decimal for first number
	else if (!(display.textContent.includes(".")) && !(inputStream.num1)) {
		display.textContent = display.textContent + decimal.textContent
	}

	// decimal for start of second number
	else if (inputStream.num1 && inputStream.operand && !(inputStream.num2)) {
		display.textContent = "0"
		display.textContent = display.textContent + decimal.textContent
		inputStream.num2 = "x"
	}
	else if (inputStream.num1 && inputStream.operand && inputStream.num2) {
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
		

		// first digit of first number entered
		if (!(inputStream.num1) && display.textContent === "0") {
			display.textContent = digit.textContent
			inputStream.num1 = display.textContent
		}

		// ready for second number and subsequent numbers after operand entered
		else if (inputStream.operand && !(inputStream.num2)) {
			console.log("second number entered")
			display.textContent = digit.textContent
			inputStream.num2 = display.textContent
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

