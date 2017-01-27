'use strict';

var ElementSetupWindow = document.querySelector('.setup');
var ElementSetupOpen = document.querySelector('.setup-open');
var ElementSetupClose = ElementSetupWindow.querySelector('.setup-close');
var ElementInputName = ElementSetupWindow.querySelector('.setup-user-name');
var ElementSetupWizard = ElementSetupWindow.querySelector('.setup-wizard');
var ElementWizardCout = ElementSetupWizard.querySelector('#wizard-coat');
var ElementWizardEyes = ElementSetupWizard.querySelector('#wizard-eyes');
var ElementWizarFireBall = ElementSetupWindow.querySelector('.setup-fireball-wrap');
var colorsCount = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var colorsEyes = ['black', 'red', 'blue', 'yellow', 'green'];
var colorsFireBall = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var i = 0;
function displaySetupWindow() {
  ElementSetupWindow.classList.toggle('invisible');
  validateName();
}

// function closeSetupWindow() {
//   ElementSetupWindow.classList.add('invisible');
// }

function validateName() {
  ElementInputName.required = true;
  ElementInputName.maxLength = 50;
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
  ElementWizardCout.style.fill = colorsCount[i];
}

function paintWizardEyes() {
  ElementWizardEyes.style.fill = colorsEyes[returnRandomIndex(colorsEyes)];
}

function paintFireBall() {
  ElementWizarFireBall.style.background = colorsFireBall[returnRandomIndex(colorsEyes)];
}

ElementSetupOpen.addEventListener('click', displaySetupWindow);
ElementSetupClose.addEventListener('click', displaySetupWindow);
ElementWizardCout.addEventListener('click', paintWizardCout);
ElementWizardEyes.addEventListener('click', paintWizardEyes);
ElementWizarFireBall.addEventListener('click', paintFireBall);
