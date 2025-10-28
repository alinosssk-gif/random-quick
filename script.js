// Элементы
const numbersDisplay = document.getElementById('numbersDisplay');
const generateBtn = document.getElementById('generateBtn');
const countInput = document.getElementById('countInput');
const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');
const excludeCheckbox = document.getElementById('excludeCheckbox');
const excludeInputContainer = document.getElementById('excludeInputContainer');
const excludeInput = document.getElementById('excludeInput');

// Исключенные числа
let excludedNumbers = [];

// Показ/скрытие поля для исключенных чисел
excludeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        excludeInputContainer.style.display = 'block';
    } else {
        excludeInputContainer.style.display = 'none';
        excludedNumbers = [];
        excludeInput.value = '';
    }
});

// Генерация чисел
generateBtn.addEventListener('click', function() {
    // Получаем значения
    const count = parseInt(countInput.value) || 1;
    const min = parseInt(fromInput.value) || 1;
    const max = parseInt(toInput.value) || 100;
    
    // Обновляем исключенные числа если чекбокс активен
    if (excludeCheckbox.checked && excludeInput.value.trim()) {
        excludedNumbers = excludeInput.value.split(',')
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num));
    } else {
        excludedNumbers = [];
    }
    
    // Генерируем числа
    const numbers = generateRandomNumbers(count, min, max, excludedNumbers);
    
    // Показываем результат
    numbersDisplay.textContent = numbers.join(', ');
    numbersDisplay.style.color = '#333';
});

// Функция генерации
function generateRandomNumbers(count, min, max, excluded) {
    const numbers = [];
    const attemptsLimit = 1000;
    let attempts = 0;
    
    while (numbers.length < count && attempts < attemptsLimit) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        
        if (!excluded.includes(randomNum) && !numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
        
        attempts++;
    }
    
    return numbers;
}

// Запускаем первую генерацию при загрузке
window.addEventListener('load', function() {
    generateBtn.click();
});