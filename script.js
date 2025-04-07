const inputRange = document.querySelector('#rangeinput');
const passwordLengthDisplay = document.querySelector('.passwordLengthDisplay');
const passwordDisplay = document.querySelector('#passwordDisplay');
const generatePasswordBtn = document.querySelector('.generatePassword');

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const allCheckBox = document.querySelectorAll('.checkbox');
function handleCopy(){
  navigator.clipboard.writeText(passwordDisplay.value);
}

let passwordLength = 10;
const symbolSet = "!#$%&()*+,-./:;<=>?@[\\]^_{|}~";

inputRange.value = passwordLength;
passwordLengthDisplay.innerText = passwordLength;

// Update password length from range input
inputRange.addEventListener('input', function () {
  passwordLength = inputRange.value;
  passwordLengthDisplay.innerText = passwordLength;
});

// Random generator functions
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateLowercaseLetter() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUppercaseLetter() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function generateNumber() {
  return getRndInteger(0, 10).toString();
}
function generateSymbol() {
  return symbolSet[getRndInteger(0, symbolSet.length)];
}

// Get checked boxes and update checkCount
let checkCount = 0;
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    checkCount = getCheckedCount();
    if (checkCount > passwordLength) {
      passwordLength = checkCount;
      inputRange.value = passwordLength;
      passwordLengthDisplay.innerText = passwordLength;
    }
  });
});

function getCheckedCount() {
  let count = 0;
  if (uppercase.checked) count++;
  if (lowercase.checked) count++;
  if (numbers.checked) count++;
  if (symbols.checked) count++;
  return count;
}

// Password generator logic
generatePasswordBtn.addEventListener('click', function () {
  let funcArr = [];
  if (uppercase.checked) funcArr.push(generateUppercaseLetter);
  if (lowercase.checked) funcArr.push(generateLowercaseLetter);
  if (numbers.checked) funcArr.push(generateNumber);
  if (symbols.checked) funcArr.push(generateSymbol);

  if (funcArr.length === 0) {
    alert("Please select at least one character type!");
    return;
  }

  // Start with at least one of each selected type
  let password = "";
  funcArr.forEach((func) => {
    password += func();
  });

  // Fill the rest of the password
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  // Shuffle the password
  password = shufflePassword(password);
  passwordDisplay.value = password;
});

// Fisher-Yates Shuffle
function shufflePassword(str) {
  let arr = [...str];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = getRndInteger(0, i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}
