let dataConfiguration;
let topDivEnemy;
let leftDivEnemy;

let divCanvasHeight;
let divCanvasWidth;
let divEnemyHeight;
let divEnemyWidth;

let direction = -1;

let bigTopStep;
let bigLeftStep;

let delayDirection = 0;
let cDelayDirection = -1;

let flagInterval;
let bIsOutLimits = false;

let score = 0;
let lifeEnemy = 0;
let yourLife = 0;
let intervalID = 0;
let damage = 0;

const NUMBER_OF_DIRECTIONS = 8;
const DELAY_OF_DIRECTION = 20;
const TIME_OF_ANIMATION_LEVEL = 2000;
window.onresize = resizePage;

window.onload = function () {
   resizePage();

   btnStart.onclick = function () {
      if (!initializeGame()) return alert('No se puede iniciar el juego.');
   }

   btnAnimation.onclick = function () {
      startAnimation();
   }

   divEnemy.onclick = function (e) {
      if (isEnemyAlive()) {
         lifeEnemy = lifeEnemy - damage;
         yourLife = yourLife + damage;
         if (lifeEnemy <= 0) {
            yourLife = yourLife + lifeEnemy;
            lifeEnemy = 0;
            clearInterval(flagInterval);
            killEnemy();
         }
      }
      fillInformation();
   }
}

function startAnimation() {
   document.body.style.cursor = 'none';
   document.addEventListener('mousemove', moveDiv, false);
   divAnimation.classList.remove("hidden");
   setTimeout(stopAnimation, TIME_OF_ANIMATION_LEVEL);
}
function stopAnimation() {
   document.body.style.cursor = 'default';
   divAnimation.classList.add("hidden");
   document.removeEventListener('mousemove', moveDiv, false);
}

function moveDiv(e) {
   divAnimation.style.left = e.pageX - (divAnimation.getBoundingClientRect().width / 2) + "px";
   divAnimation.style.top = e.pageY - (divAnimation.getBoundingClientRect().height / 2) + "px";
}

function resizePage() {
   let pageWidth = document.documentElement.clientWidth;
   divCanvas.style.width = pageWidth * 0.70 + 'px';
   divInformation.style.width = pageWidth * 0.20 + 'px';

   divHeader.style.paddingLeft = pageWidth * 0.05 + 'px';
   divHeader.style.paddingRight = pageWidth * 0.05 + 'px';

   divContainer.style.paddingLeft = pageWidth * 0.05 + 'px';
   divContainer.style.paddingRight = pageWidth * 0.05 + 'px';

   divCanvasHeight = divCanvas.getBoundingClientRect().height;
   divCanvasWidth = divCanvas.getBoundingClientRect().width;
}

function killEnemy() {
   fadeInOut(fadeOut, 30, divEnemy);
}

function fadeInOut(fade, delay, div) {
   intervalID = setInterval(fade, delay, div);
}

function fadeIn(div) {
   let opacity = Number(window.getComputedStyle(div).getPropertyValue('opacity'));
   if (opacity < 1) {
      opacity = opacity + 0.1;
      div.style.opacity = opacity;
   } else {
      clearInterval(intervalID);
   }
}

function fadeOut(div) {
   let opacity = Number(window.getComputedStyle(div).getPropertyValue('opacity'));
   if (opacity > 0) {
      opacity = opacity - 0.1;
      div.style.opacity = opacity;
   } else {
      clearInterval(intervalID);
   }
}

function isEnemyAlive() {
   return lifeEnemy > 0;
}

function initializeEnemy() {
   divEnemy.style.display = 'none';
   divEnemy.style.opacity = 1;
   divEnemy.style.width = dataConfiguration.size + 'px';
   divEnemy.style.height = dataConfiguration.size + 'px';

   divEnemyHeight = divEnemy.getBoundingClientRect().height;
   divEnemyWidth = divEnemy.getBoundingClientRect().width;

   createEnemy();

   topDivEnemy = (divCanvasHeight - divEnemyHeight) / 2;
   leftDivEnemy = (divCanvasWidth - divEnemyWidth) / 2;
   divEnemy.style.top = topDivEnemy + 'px';
   divEnemy.style.left = leftDivEnemy + 'px';

   divEnemy.style.display = 'block';
}

function createEnemy() {
   clearChildren();
   createStomach();
   createClaws();
}

function clearChildren() {
   divEnemy.textContent = '';
   // var divs = divEnemy.getElementsByClassName('enemy');
   // if (divs.length > 0) {
   //    for (let div in divs) {
   //       divEnemy.removeChild(div);
   //    }
   // }
   // var el = document.getElementById('divEnemy');

   // while (el.firstChild) el.removeChild(el.firstChild);
}

function createStomach() {
   var divStomach = document.createElement('div');
   divStomach.id = 'divStomach';
   divStomach.className = 'enemy';
   divStomach.style.width = (dataConfiguration.size * 3) / 5 + 'px';
   divStomach.style.height = (dataConfiguration.size * 3) / 5 + 'px';

   divStomach.style.top = (dataConfiguration.size * 2) / 10 + 'px';
   divStomach.style.left = (dataConfiguration.size * 2) / 10 + 'px';

   divStomach.style.position = 'absolute';
   divStomach.style.backgroundColor = '#FF0000';

   divEnemy.appendChild(divStomach);
}
function createClaws() {
   createRightHand();
   createLeftHand();
   createRightFoot();
   createLeftFoot();
}

function configDiv(divUnnamed, width, height, top, left) {
   divUnnamed.style.width = width;
   divUnnamed.style.height = height;
   divUnnamed.style.position = 'absolute';
   divUnnamed.style.backgroundColor = '#000000';
   divUnnamed.style.top = top;
   divUnnamed.style.left = left;
   divUnnamed.className = 'enemy';
}

function createRightHand() {
   let divRightHand = document.createElement('div');
   divRightHand.id = 'divRightHand';
   let width = (dataConfiguration.size * 1) / 5 + 'px';
   let height = (dataConfiguration.size * 1) / 5 + 'px';
   let top = '0px';
   let left = (dataConfiguration.size * 4) / 5 + 'px';
   configDiv(divRightHand, width, height, top, left);
   divEnemy.appendChild(divRightHand);
}
function createLeftHand() {
   var divLeftHand = document.createElement('div');
   divLeftHand.id = 'divLeftHand';
   let width = (dataConfiguration.size * 1) / 5 + 'px';
   let height = (dataConfiguration.size * 1) / 5 + 'px';
   let top = '0px';
   let left = '0px';
   configDiv(divLeftHand, width, height, top, left);
   divEnemy.appendChild(divLeftHand);
}
function createRightFoot() {
   var divRightFoot = document.createElement('div');
   divRightFoot.id = 'divRightFoot';
   let width = (dataConfiguration.size * 1) / 5 + 'px';
   let height = (dataConfiguration.size * 1) / 5 + 'px';
   let top = (dataConfiguration.size * 4) / 5 + 'px';
   let left = (dataConfiguration.size * 4) / 5 + 'px';
   configDiv(divRightFoot, width, height, top, left);
   divEnemy.appendChild(divRightFoot);
}
function createLeftFoot() {
   var divLeftFoot = document.createElement('div');
   divLeftFoot.id = 'divLeftFoot';
   let width = (dataConfiguration.size * 1) / 5 + 'px';
   let height = (dataConfiguration.size * 1) / 5 + 'px';
   let top = (dataConfiguration.size * 4) / 5 + 'px';
   let left = '0px';
   configDiv(divLeftFoot, width, height, top, left);
   divEnemy.appendChild(divLeftFoot);
}

function initializeGame() {
   let result = false;
   if (getConfigurationLevel()) {
      divCanvasHeight = divCanvas.getBoundingClientRect().height;
      divCanvasWidth = divCanvas.getBoundingClientRect().width;
      lifeEnemy = 0;
      yourLife = 0;
      damage = dataConfiguration.damage;

      initializeEnemy();

      flagInterval = setInterval('moveEnemy()', dataConfiguration.velocity);

      lifeEnemy = dataConfiguration.lifeEnemy;
      fillInformation();
      result = true;
   } else result = false;
   return result;
}

function fillInformation() {
   let message = "";
   message += "<br/><br/>";
   message += "Vida del enemigo: ";
   message += "<br/>";
   message += lifeEnemy;
   message += "<br/><br/>";
   message += "Tu vida: ";
   message += "<br/>";
   message += yourLife;
   spnInformation.innerHTML = message;
}

function changeDirection() {
   cDelayDirection = 0;
   direction = Math.floor(Math.random() * NUMBER_OF_DIRECTIONS);
   delayDirection = Math.floor(Math.random() * DELAY_OF_DIRECTION + 1);
}

function initializeDirections() {
   switch (direction) {
      case 0: // right
         //topDivEnemy = __;
         leftDivEnemy = leftDivEnemy + dataConfiguration.step;
         break;
      case 1: // left
         //topDivEnemy = __;
         leftDivEnemy = leftDivEnemy - dataConfiguration.step;
         break;
      case 2: // up
         topDivEnemy = topDivEnemy - dataConfiguration.step;
         //leftDivEnemy = __;
         break;
      case 3: // down
         topDivEnemy = topDivEnemy + dataConfiguration.step;
         //leftDivEnemy = __;
         break;
      case 4: // diagonal right up
         topDivEnemy = topDivEnemy - dataConfiguration.step;
         leftDivEnemy = leftDivEnemy + dataConfiguration.step;
         break;
      case 5: // diagonal left up
         topDivEnemy = topDivEnemy - dataConfiguration.step;
         leftDivEnemy = leftDivEnemy - dataConfiguration.step;
         break;
      case 6: // diagonal right down
         topDivEnemy = topDivEnemy + dataConfiguration.step;
         leftDivEnemy = leftDivEnemy + dataConfiguration.step;
         break;
      case 7: // diagonal left down
         topDivEnemy = topDivEnemy + dataConfiguration.step;
         leftDivEnemy = leftDivEnemy - dataConfiguration.step;
         break;
      default:
         break;
   }
}

function isOutLimits(bigTopStep, bigLeftStep) {
   if (topDivEnemy <= 0) {
      topDivEnemy = dataConfiguration.size;
      //console.log('topDivEnemy: ***' + topDivEnemy);
      bIsOutLimits = true;
   }
   if (leftDivEnemy <= 0) {
      leftDivEnemy = dataConfiguration.size;
      //console.log('leftDivEnemy: ***' + leftDivEnemy);
      bIsOutLimits = true;
   }
   if (bigTopStep >= divCanvasHeight) {
      bigTopStep = divCanvasHeight - dataConfiguration.size - dataConfiguration.step;
      //console.log('bigTopStep: ***' + bigTopStep);
      bIsOutLimits = true;
   }
   if (bigLeftStep >= divCanvasWidth) {
      bigLeftStep = divCanvasWidth - dataConfiguration.size - dataConfiguration.step;
      //console.log('bigLeftStep: ***' + bigLeftStep);
      bIsOutLimits = true;
   }
   return bIsOutLimits;
}

function startMove() {
   if (cDelayDirection == -1 || cDelayDirection == delayDirection) {
      changeDirection();
   }
   initializeDirections();

   bigTopStep = topDivEnemy + dataConfiguration.size + dataConfiguration.step;
   bigLeftStep = leftDivEnemy + dataConfiguration.size + dataConfiguration.step;
}

function moveEnemy() {
   // console.clear();
   // console.log('Me sigo moviendo!');
   startMove();
   if (isOutLimits(bigTopStep, bigLeftStep)) {
      cDelayDirection = -1;
      bIsOutLimits = false;
      moveEnemy();
   }

   divEnemy.style.top = topDivEnemy + 'px';
   divEnemy.style.left = leftDivEnemy + 'px';

   cDelayDirection++;
}

function getConfigurationLevel() {
   let tmpConfiguration = JSON.parse(configuration)
   tmpConfiguration = Object.keys(tmpConfiguration).map((key) => ({ [key]: tmpConfiguration[key] }));
   dataConfiguration = tmpConfiguration[0]['level'].find((lvl) => lvl.value == nLevel.value);
   return dataConfiguration != undefined;
}

function endOfLevelAnimation() {


}