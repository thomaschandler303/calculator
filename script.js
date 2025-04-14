// script for calculator

function add(number1, number2) {
	return number1 + number2
}

function subtract(number1, number2) {
	return number1 - number2
}

function multiply(number1, number2) {
	return number1 * number2
}

function divide(number1, number2) {
	return number1 / number2
}

function operate(operand, number1, number2) {

}

let display = document.querySelector("#display-content")
display.textContent = "0"

function updateInput(input, currentDisplay) {
	currentDisplay = currentDisplay + input
	console.log(currentDisplay)
	return currentDisplay
}

const digits = document.querySelectorAll(".digit")
const currentDisplay = "";
const clear = document.querySelector("#clear")
const decimal = document.querySelector("#decimal")
const backspace = document.querySelector("#delete")
const add = document.querySelector("#add")



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
	if (!(display.textContent.includes("."))) {
		display.textContent = display.textContent + decimal.textContent
	}
	
})

clear.addEventListener("click", () => {
	display.textContent = "0";
})

digits.forEach((digit) => {
	digit.addEventListener("click", () => {
		console.log(digit.textContent)
		console.log(display.textContent)
		if (display.textContent === "0") {
			display.textContent = digit.textContent
		}
		else {
			display.textContent = display.textContent + digit.textContent
		}
	})
})