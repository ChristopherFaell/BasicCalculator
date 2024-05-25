class Calculator {
    constructor(firstValue, secondValue) { //historial
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        //this.historial = historial;
        this.deleteAll();
    }

    deleteAll() {
        this.f1 = '';
        this.s2 = '';
        this.operator = '';
        //this.history = '';
        this.refresh();
    }

    refresh() {
        this.firstValue.innerHTML = this.f1 + this.operator;
        this.secondValue.innerHTML = this.s2;
        //this.historial.innerHTML = this.f1 + this.operator + this.s2 + this.calculate;
    }

    appendNumber(number) {
        if(number === "." && this.s2.includes('.')) return;
        this.s2 = this.s2.toString() + number;
        this.refresh();
    }

    delete() {
        if(this.s2 === '') return;
        this.s2 = +this.s2.toString().slice(0, -1);
        this.refresh();
    }

    operation(operator) {
        if(this.operator) {
            this.calculate();
        }
        this.operator = operator;
        this.f1 = +this.s2 === 0 ? this.f1 : this.s2;
        this.s2 = '';
        this.refresh();
        //this.historial = this.operation;
    }

    calculate(){
        switch(this.operator) {
            case "+":
                this.f1 = +this.f1 + +this.s2;
            break;
            case "-":
                this.f1 = +this.f1 - +this.s2;
            break;
            case "X":
                this.f1 = +this.f1 * +this.s2;
            break;
            case "/":
                this.f1 = +this.f1 / +this.s2;
            break
        }
        this.operator = "";
        this.s2 = 0; 
        this.refresh();
    }
}

// DOM

const firstValue = document.querySelector("[data-first-value]")
const secondValue = document.querySelector("[data-second-value]")
const history = document.querySelector("[data-history]")
const deleteAllButton = document.querySelector("[data-delete-all]")
const numberButtons = document.querySelectorAll("[data-number]")
const deleteButton = document.querySelector("[data-delete]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")

const calculator = new Calculator(firstValue, secondValue);

// EVENTLISTENER

deleteAllButton.addEventListener("click", () => {
    calculator.deleteAll();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
    })
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.operation(button.innerHTML);
    })
})

equalsButton.addEventListener("click", () => {
    calculator.calculate();
});