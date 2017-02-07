'use strict';

var setupWindowElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupWindowElement.querySelector('.setup-close');
var inputNameElement = setupWindowElement.querySelector('.setup-user-name');
var setupWizardElement = setupWindowElement.querySelector('.setup-wizard');
var wizardCoatElement = setupWizardElement.querySelector('#wizard-coat');
var wizardEyesElement = setupWizardElement.querySelector('#wizard-eyes');
var wizarFireBallElement = setupWindowElement.querySelector('.setup-fireball-wrap');
var submitBtnElement = setupWindowElement.querySelector('.button');
var currentCoatColorIndex = 0;

/**
 * @enum {Array<string>}
 */
var Сolors = {
  FOR_COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  FOR_EYES: ['black', 'red', 'blue', 'yellow', 'green'],
  FOR_FIRE_BALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

/**
 * @enum {number}
 */
var KeyCodeLib = {
  ESCAPE: 27,
  ENTER: 13
};

var TitleConfig = {
  ZERO: 0,
  MAX_LENGTH: 50
};

/**
 * проверяет совпадает ли evt.keyCode и клавиша переданная вторым аргументом
 * @param {KeyboardEvent} evt
 * @param {number} key
 * @return {boolean}
 */

/** открывает окно настроек навешивает слушатели */
function openSetupWindowHandler() {
  setupWindowElement.classList.remove('invisible');

  wizardCoatElement.addEventListener('click', paintWizardCoatHandler);
  wizardEyesElement.addEventListener('click', paintWizardEyesHandler);
  wizarFireBallElement.addEventListener('click', paintFireBallHandler);
  submitBtnElement.addEventListener('click', submitBtnHandler);
  submitBtnElement.addEventListener('click', pressSubmitToClose);
  document.addEventListener('keydown', pressEscToCloseSetupWindow);
}

/** закрывает окно настроек удаляет слушатели */
function closeSetupWindowHandler() {
  setupWindowElement.classList.add('invisible');

  wizardCoatElement.removeEventListener('click', paintWizardCoatHandler);
  wizardEyesElement.removeEventListener('click', paintWizardEyesHandler);
  wizarFireBallElement.removeEventListener('click', paintFireBallHandler);
  submitBtnElement.removeEventListener('click', submitBtnHandler);
  submitBtnElement.removeEventListener('click', pressSubmitToClose);
  document.removeEventListener('keydown', pressEscToCloseSetupWindow);
}

function isActivateEvent(evt, key) {
  return evt.keyCode && evt.keyCode === key;
}

function keyPressOpenSetupWindow(evt) {
  if (isActivateEvent(evt, KeyCodeLib.ENTER)) {
    openSetupWindowHandler();
  }
}

function keyPressCloseSetupWindow(evt) {
  if (isActivateEvent(evt, KeyCodeLib.ENTER)) {
    closeSetupWindowHandler();
  }
}

function pressSubmitToClose(evt) {
  if (isActivateEvent(evt, KeyCodeLib.ESCAPE) && validateName()) {
    closeSetupWindowHandler();
  }
}

function pressEscToCloseSetupWindow(evt) {
  if (isActivateEvent(evt, KeyCodeLib.ESCAPE)) {
    closeSetupWindowHandler();
  }
}

/** устанавливает атрибуты для поля Имени */
function setNameValidation() {
  inputNameElement.required = true;
  inputNameElement.maxLength = 50;
}

/**
 * проверяет валидность поля имени
 * @return {boolean}
 */
function validateName() {
  if (inputNameElement.length > TitleConfig.ZERO && inputNameElement.length < TitleConfig.MAX_LENGTH) {
    return true;
  }
  return false;
}

function submitBtnHandler(evt) {
  if (validateName()) {
    closeSetupWindowHandler();
  }
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
function paintWizardCoatHandler() {
  currentCoatColorIndex = (currentCoatColorIndex + 1) % Сolors.FOR_COAT.length;
  wizardCoatElement.style.fill = Сolors.FOR_COAT[currentCoatColorIndex];
}

/** рандомно переключает цвет глаз */
function paintWizardEyesHandler() {
  wizardEyesElement.style.fill = Сolors.FOR_EYES[returnRandomIndex(Сolors.FOR_EYES)];
}

/** рандомно переключает цвет фаерболла */
function paintFireBallHandler() {
  wizarFireBallElement.style.background = Сolors.FOR_FIRE_BALL[returnRandomIndex(Сolors.FOR_EYES)];
}

setNameValidation();
setupOpenElement.addEventListener('click', openSetupWindowHandler);
setupOpenElement.addEventListener('keydown', keyPressOpenSetupWindow);
setupCloseElement.addEventListener('click', closeSetupWindowHandler);
setupCloseElement.addEventListener('keydown', keyPressCloseSetupWindow);
