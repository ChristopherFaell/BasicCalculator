class Calculator {
    constructor(firstValue, secondValue, history) { 
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.history = history;
        this.maxLines = 2; // Número máximo de líneas en el historial
        this.deleteAll();
    }

    deleteAll() {
        this.f1 = '';
        this.s2 = '';
        this.operator = '';
        this.history.innerHTML = ''; // Limpiar historial
        this.refresh();
    }

    refresh() {
        this.firstValue.innerHTML = this.f1 + this.operator;
        this.secondValue.innerHTML = this.s2;
    }

    appendNumber(number) {
        if (number === "." && this.s2.includes('.')) return;
        this.s2 = this.s2.toString() + number;
        this.refresh();
    }

    delete() {
        if (this.s2 === '') return;
        this.s2 = +this.s2.toString().slice(0, -1);
        this.refresh();
    }

    operation(operator) {
        if (this.operator) {
            this.calculate();
        }
        this.operator = operator;
        this.f1 = +this.s2 === 0 ? this.f1 : this.s2;
        this.s2 = '';
        this.refresh();
    }

    calculate() {
        let result;
        switch (this.operator) {
            case "+":
                result = +this.f1 + +this.s2;
                break;
            case "-":
                result = +this.f1 - +this.s2;
                break;
            case "X":
                result = +this.f1 * +this.s2;
                break;
            case "/":
                result = +this.f1 / +this.s2;
                break;
        }

        // Agregar al historial
        this.addToHistory(`${this.f1} ${this.operator} ${this.s2} = ${result}`);

        this.operator = "";
        this.s2 = result; // Actualizar segundo valor con el resultado
        this.refresh();
    }

    addToHistory(entry) {
        // Obtener las líneas actuales del historial
        const lines = this.history.innerHTML.split("<br>");
        // Limitar el historial a maxLines
        if (lines.length >= this.maxLines) {
            // Eliminar la primera línea si excede el límite
            lines.shift();
        }
        // Agregar la nueva entrada al historial
        this.history.innerHTML = lines.join("<br>") + "<br>" + entry;
    }
}

// DOM

const firstValue = document.querySelector("[data-first-value]");
const secondValue = document.querySelector("[data-second-value]");
const history = document.querySelector("[data-history]");
const deleteAllButton = document.querySelector("[data-delete-all]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");

const calculator = new Calculator(firstValue, secondValue, history);

// EVENTLISTENERS

deleteAllButton.addEventListener("click", () => {
    calculator.deleteAll();
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
    });
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.operation(button.innerHTML);
    });
});

equalsButton.addEventListener("click", () => {
    calculator.calculate();
});
