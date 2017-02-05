'use strict';

var setupWindowElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupWindowElement.querySelector('.setup-close');
var inputNameElement = setupWindowElement.querySelector('.setup-user-name');
var setupWizardElement = setupWindowElement.querySelector('.setup-wizard');
var wizardCoatElement = setupWizardElement.querySelector('#wizard-coat');
var wizardEyesElement = setupWizardElement.querySelector('#wizard-eyes');
var wizarFireBallElement = setupWindowElement.querySelector('.setup-fireball-wrap');
var currentCoatColorIndex = 0;

/**
 * @enum {Array<string>}
 */
var Сolors = {
  FOR_COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  FOR_EYES: ['black', 'red', 'blue', 'yellow', 'green'],
  FOR_FIRE_BALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

/** открывает окно настроек */
function openSetupWindow() {
  setupWindowElement.classList.remove('invisible');
  wizardCoatElement.addEventListener('click', paintWizardCoat);
  wizardEyesElement.addEventListener('click', paintWizardEyes);
  wizarFireBallElement.addEventListener('click', paintFireBall);
}

/** закрывает окно настроек */
function closeSetupWindow() {
  setupWindowElement.classList.add('invisible');
  wizardCoatElement.removeEventListener('click', paintWizardCoat);
  wizardEyesElement.removeEventListener('click', paintWizardEyes);
  wizarFireBallElement.removeEventListener('click', paintFireBall);
}

/** устанавливает атрибуты для поля Имени */
function setNameValidation() {
  inputNameElement.required = true;
  inputNameElement.maxLength = 50;
}

/**
 * возвращает случайный индекс переданного в неё массива
 * @param {Array} array
 * @return {number}
 */
function returnRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

/** выводим мантии по порядку */
function paintWizardCoat() {
  currentCoatColorIndex = (currentCoatColorIndex + 1) % Сolors.FOR_COAT.length;
  wizardCoatElement.style.fill = Сolors.FOR_COAT[currentCoatColorIndex];
}

/** рандомно переключает цвет глаз */
function paintWizardEyes() {
  wizardEyesElement.style.fill = Сolors.FOR_EYES[returnRandomIndex(Сolors.FOR_EYES)];
}

/** рандомно переключает цвет фаерболла */
function paintFireBall() {
  wizarFireBallElement.style.background = Сolors.FOR_FIRE_BALL[returnRandomIndex(Сolors.FOR_EYES)];
}

setNameValidation();
setupOpenElement.addEventListener('click', openSetupWindow);
setupCloseElement.addEventListener('click', closeSetupWindow);
