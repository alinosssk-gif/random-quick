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
    
    // ОТПРАВКА СОБЫТИЯ В GOOGLE ANALYTICS
    if (typeof gtag !== 'undefined') {
        gtag('event', 'number_generated', {
            'event_category': 'generator',
            'event_label': 'random_numbers',
            'value': count,
            'min_value': min,
            'max_value': max,
            'excluded_count': excludedNumbers.length
        });
        console.log('Google Analytics event sent');
    } else {
        console.log('Google Analytics not loaded');
    }
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

// Проверка Google Analytics при загрузке
window.addEventListener('load', function() {
    console.log('Page loaded - checking Google Analytics:');
    console.log('window.dataLayer:', window.dataLayer);
    console.log('typeof gtag:', typeof gtag);
    
    // Отправляем событие page_view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': 'Random Quick - Генератор случайных чисел',
            'page_location': window.location.href
        });
        console.log('Google Analytics page_view sent');
    }
    
    // Запускаем первую генерацию
    generateBtn.click();
});