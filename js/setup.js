'use strict';

var SETUP_WINDOW = document.querySelector('.setup');
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP_CLOSE = SETUP_WINDOW.querySelector('.setup-close');
var inputName = SETUP_WINDOW.querySelector('.setup-user-name');
var setupWizard = SETUP_WINDOW.querySelector('.setup-wizard');
var wizardCout = setupWizard.querySelector('#wizard-coat');
var wizardEyes = setupWizard.querySelector('#wizard-eyes');
var wizarFireBall = SETUP_WINDOW.querySelector('.setup-fireball-wrap');
var colorsCount = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var colorsEyes = ['black', 'red', 'blue', 'yellow', 'green'];
var colorsFireBall = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var i = 0;
function openSetupWindow() {
  SETUP_WINDOW.classList.remove('invisible');
  validateName();
}

function closeSetupWindow() {
  SETUP_WINDOW.classList.add('invisible');
}

function validateName() {
  inputName.required = true;
  inputName.maxLength = 50;
}

// функция возвращает случайный индекс переданного в неё массива
function returnRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// выводим мантии по порядку
function paintWizardCout() {
  if (i === colorsCount.length - 1) {
    i = 0;
  }
  i++;
  wizardCout.style.fill = colorsCount[i];
}

function paintWizardEyes() {
  wizardEyes.style.fill = colorsEyes[returnRandomIndex(colorsEyes)];
}

function paintFireBall() {
  wizarFireBall.style.background = colorsFireBall[returnRandomIndex(colorsEyes)];
}

SETUP_OPEN.addEventListener('click', openSetupWindow);
SETUP_CLOSE.addEventListener('click', closeSetupWindow);
wizardCout.addEventListener('click', paintWizardCout);
wizardEyes.addEventListener('click', paintWizardEyes);
wizarFireBall.addEventListener('click', paintFireBall);
