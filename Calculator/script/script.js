      
        let currentInput = '0';
        let previousInput = '';
        let operator = null;
        let shouldResetScreen = false;

        const currentDisplay = document.getElementById('current');
        const previousDisplay = document.getElementById('previous');

        function updateDisplay() {
            currentDisplay.textContent = currentInput;
            previousDisplay.textContent = previousInput;
        }

        function appendNumber(number) {
            if (currentInput === '0' || shouldResetScreen) {
                currentInput = number;
                shouldResetScreen = false;
            } else {
                currentInput += number;
            }
            updateDisplay();
        }

        function appendOperator(op) {
            if (operator !== null && !shouldResetScreen) {
                calculateResult();
            }
            
            operator = op;
            previousInput = `${currentInput} ${op}`;
            shouldResetScreen = true;
            updateDisplay();
        }

        function calculateResult() {
            if (operator === null || shouldResetScreen) return;

            let computation;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            if (isNaN(prev) || isNaN(current)) return;

            switch (operator) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert('Ошибка: Деление на ноль!');
                        clearCalculator();
                        return;
                    }
                    computation = prev / current;
                    break;
                default:
                    return;
            }

            currentInput = roundResult(computation).toString();
            operator = null;
            previousInput = '';
            shouldResetScreen = true;
            updateDisplay();
        }

        function calculateSquareRoot() {
            // Если есть выражение, сначала вычисляем его
            if (operator !== null && !shouldResetScreen) {
                calculateResult();
            }
            
            const number = parseFloat(currentInput);
            
            if (isNaN(number)) return;
            
            if (number < 0) {
                alert('Ошибка: Корень из отрицательного числа!');
                clearCalculator();
                return;
            }
            
            const result = Math.sqrt(number);
            currentInput = roundResult(result).toString();
            shouldResetScreen = true;
            updateDisplay();
        }

        function roundResult(number) {
            return Math.round(number * 100000000) / 100000000;
        }

        function clearCalculator() {
            currentInput = '0';
            previousInput = '';
            operator = null;
            shouldResetScreen = false;
            updateDisplay();
        }

        function deleteLast() {
            if (currentInput.length === 1) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            updateDisplay();
        }

        // Обработка клавиатуры
        document.addEventListener('keydown', (event) => {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendNumber('.');
            } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                appendOperator(event.key);
            } else if (event.key === 'Enter' || event.key === '=') {
                event.preventDefault();
                calculateResult();
            } else if (event.key === 'Escape') {
                clearCalculator();
            } else if (event.key === 'Backspace') {
                deleteLast();
            } else if (event.key === 'r' || event.key === 'R') {
                calculateSquareRoot();
            }
        });

        // Инициализация
        updateDisplay();