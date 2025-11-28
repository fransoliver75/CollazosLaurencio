class Calculator {
    constructor() {
        this.previousOperandElement = document.getElementById('previous-operand');
        this.currentOperandElement = document.getElementById('current-operand');
        this.calculatorElement = document.getElementById('calculator');
        this.clear();
        this.setupEventListeners();
        this.memory = 0;
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('No se puede dividir por cero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    calculateFunction(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        switch (func) {
            case 'sin':
                this.currentOperand = Math.sin(current * Math.PI / 180).toString();
                break;
            case 'cos':
                this.currentOperand = Math.cos(current * Math.PI / 180).toString();
                break;
            case 'tan':
                this.currentOperand = Math.tan(current * Math.PI / 180).toString();
                break;
            case 'log':
                if (current <= 0) {
                    alert('El logaritmo solo está definido para números positivos');
                    return;
                }
                this.currentOperand = Math.log10(current).toString();
                break;
            case 'ln':
                if (current <= 0) {
                    alert('El logaritmo natural solo está definido para números positivos');
                    return;
                }
                this.currentOperand = Math.log(current).toString();
                break;
            case 'sqrt':
                if (current < 0) {
                    alert('No se puede calcular la raíz cuadrada de un número negativo');
                    return;
                }
                this.currentOperand = Math.sqrt(current).toString();
                break;
            case 'square':
                this.currentOperand = Math.pow(current, 2).toString();
                break;
            case 'power':
                this.previousOperand = this.currentOperand;
                this.operation = 'power';
                this.currentOperand = '';
                break;
            case 'factorial':
                if (current < 0 || !Number.isInteger(current)) {
                    alert('El factorial solo está definido para números enteros no negativos');
                    return;
                }
                this.currentOperand = this.factorial(current).toString();
                break;
            case 'pi':
                this.currentOperand = Math.PI.toString();
                break;
            case 'e':
                this.currentOperand = Math.E.toString();
                break;
            case 'percent':
                this.currentOperand = (current / 100).toString();
                break;
        }
        
        this.shouldResetScreen = true;
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    memoryOperation(op) {
        const current = parseFloat(this.currentOperand);
        
        switch (op) {
            case 'mc':
                this.memory = 0;
                break;
            case 'mr':
                this.currentOperand = this.memory.toString();
                this.shouldResetScreen = true;
                break;
            case 'm-plus':
                this.memory += current;
                this.shouldResetScreen = true;
                break;
            case 'm-minus':
                this.memory -= current;
                this.shouldResetScreen = true;
                break;
        }
    }

    getDisplayNumber(number) {
        if (number === '') return '0';
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('es', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    setupEventListeners() {
        // Números
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.getAttribute('data-number'));
                this.updateDisplay();
            });
        });

        // Operadores
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.getAttribute('data-operator'));
                this.updateDisplay();
            });
        });

        // Igual
        document.querySelector('[data-equals]').addEventListener('click', () => {
            this.compute();
            this.updateDisplay();
        });

        // Limpiar
        document.querySelector('[data-function="clear"]').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });

        // Borrar
        document.querySelector('[data-function="backspace"]').addEventListener('click', () => {
            this.delete();
            this.updateDisplay();
        });

        // Funciones científicas y memoria
        document.querySelectorAll('[data-function]').forEach(button => {
            button.addEventListener('click', () => {
                const func = button.getAttribute('data-function');
                
                if (['mc', 'mr', 'm-plus', 'm-minus'].includes(func)) {
                    this.memoryOperation(func);
                } else if (func !== 'clear' && func !== 'backspace') {
                    this.calculateFunction(func);
                }
                
                this.updateDisplay();
            });
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (/[0-9]/.test(e.key)) {
                this.appendNumber(e.key);
            } else if (e.key === '.') {
                this.appendNumber('.');
            } else if (e.key === '+' || e.key === '-') {
                this.chooseOperation(e.key === '+' ? '+' : '−');
            } else if (e.key === '*') {
                this.chooseOperation('×');
            } else if (e.key === '/') {
                this.chooseOperation('÷');
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.compute();
            } else if (e.key === 'Backspace') {
                this.delete();
            } else if (e.key === 'Escape') {
                this.clear();
            } else if (e.key === '%') {
                this.calculateFunction('percent');
            }
            
            this.updateDisplay();
        });
    }
}

const calculator = new Calculator();
calculator.updateDisplay();