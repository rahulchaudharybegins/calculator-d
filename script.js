const display = document.getElementById('display');

function appendValue(value) {
  if (display.value === 'Error') display.value = '0';
  if (display.value === '0' && /[0-9]/.test(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '0';
}

function deleteLast() {
  display.value = display.value.length > 1
    ? display.value.slice(0, -1) : '0';
}

function calculateResult() {
  try {
    const expression = display.value;
    if (!/^[0-9+*/.() -]+$/.test(expression)) {
      throw new Error('Invalid input');
    }
    if (!expression.trim()) return;
    const result = Function('"use strict"; return (' + expression + ')')();
    if (!Number.isFinite(result)) throw new Error('Invalid result');
    display.value = String(Number(result.toPrecision(10)));
  } catch {
    display.value = 'Error';
  }
}