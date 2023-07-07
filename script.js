class Caculator {
    // Constructor
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // Clear the calculator
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    // Delete the last number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Append a number to the display
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }

    // Choose an operation
    chooseOperation(operation) {
        if (this.currentOperand === "" && this.previousOperand === "") {
            return;
        } else if (this.currentOperand === "") {
            this.operation = operation;
            return;
        } else if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation; // Set the operation
        this.previousOperand = this.currentOperand; // Set the previous operand
        this.currentOperand = "";
    }

    // Compute the result
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;

            case "-":
                computation = prev - current;
                break;

            case "*":
                computation = prev * current;
                break;

            case "÷":
                computation = prev / current;
                break;

            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Update the display
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

// Create a new calculator
const calculator = new Caculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
});

window.addEventListener("keydown", (e) => {
    const key = e.key;

    // If key is a number or a decimal point
    if (!isNaN(key) || key === ".") {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    // If key is an operator
    else if (["+", "-", "*", "/"].includes(key)) {
        calculator.chooseOperation(key);
        calculator.updateDisplay();
    }
    // If key is Enter (for equals)
    else if (key === "Enter") {
        calculator.compute();
        calculator.updateDisplay();
    }
    // If key is Backspace (for delete)
    else if (key === "Backspace") {
        calculator.delete();
        calculator.updateDisplay();
    }
    // If key is Escape (for clear)
    else if (key === "Escape") {
        calculator.clear();
        calculator.updateDisplay();
    }
});
