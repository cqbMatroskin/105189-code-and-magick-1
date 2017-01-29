'use strict';

var SetupWindowElement = document.querySelector('.setup');
var SetupOpenElement = document.querySelector('.setup-open');
var SetupCloseElement = SetupWindowElement.querySelector('.setup-close');
var InputNameElement = SetupWindowElement.querySelector('.setup-user-name');
var SetupWizardElement = SetupWindowElement.querySelector('.setup-wizard');
var WizardCoutElement = SetupWizardElement.querySelector('#wizard-coat');
var WizardEyesElement = SetupWizardElement.querySelector('#wizard-eyes');
var WizarFireBallElement = SetupWindowElement.querySelector('.setup-fireball-wrap');
var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var COLORS_FIRE_BALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var currentCoatColorIndex = 0;

function openSetupWindow() {
  SetupWindowElement.classList.remove('invisible');
}

function closeSetupWindow() {
  SetupWindowElement.classList.add('invisible');
}

function setNameValidation() {
  InputNameElement.required = true;
  InputNameElement.maxLength = 50;
}

// функция возвращает случайный индекс переданного в неё массива
function returnRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// выводим мантии по порядку
function paintWizardCout() {
  currentCoatColorIndex = (currentCoatColorIndex + 1) % COLORS_COAT.length;
  WizardCoutElement.style.fill = COLORS_COAT[currentCoatColorIndex];
}

function paintWizardEyes() {
  WizardEyesElement.style.fill = COLORS_EYES[returnRandomIndex(COLORS_EYES)];
}

function paintFireBall() {
  WizarFireBallElement.style.background = COLORS_FIRE_BALL[returnRandomIndex(COLORS_EYES)];
}

window.addEventListener('load', setNameValidation);
SetupOpenElement.addEventListener('click', openSetupWindow);
SetupCloseElement.addEventListener('click', closeSetupWindow);
WizardCoutElement.addEventListener('click', paintWizardCout);
WizardEyesElement.addEventListener('click', paintWizardEyes);
WizarFireBallElement.addEventListener('click', paintFireBall);
