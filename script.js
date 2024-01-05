// variables
let money = 3800000;
let numOfPlaceholders = 0;

let placeholderPerClick = 1;
let placeholderSellPrice = 1;
let clickMultiplier = 1;

let fps = 30;
let time = 0;
let lastLog = new Date().getTime() / 1000;
let offlineTime;

let toolUpgradeCost = 10;
let toolUpgradeTimes = 0;

let successRateCost = 500;
let successRateTimes = 0;

let workerCost = 500;
let workerTimes = 0;

let click_amount = 0;
let successRate = 35;
let moneyPerSecond = 0;

let prestigePoints = 0;

let timeSinceLastUpdate = fps / 1000;

let toolNames = ["Hands", "Stick", "Broom", "Butter Knife","Coat Hanger", "Hammer", "Tongs", "Umbrella","Crowbar", "Corkscrew", "Hatchet", "Curling Iron", "Spear", "Steak Knife", "High Medschool Student", "Sober Medschool Student", "Doctor", "God", "God's Advisor", "Super God", "God's Assistant", "God's Brother", "God's Cous", "God's Cousin", "God's Cousin's Cousin", "God's Cousin's Cousin's Cousin", "God", "God's Cousin's Cousin's Cousin's C", "God's Cousin's Cousin's Cousin's C", "God's Dog", "Allah"];

let cookiesArray = ["money", "numOfPlaceholders", "placeholderPerClick", "placeholderSellPrice", "clickMultiplier", "toolUpgradeCost", "toolUpgradeTimes", "click_amount", "successRate", "successRateTimes", "successRateCost", "moneyPerSecond", "workerCost", "workerTimes", "prestigePoints", "lastLog"];
let cookieValues = [money, numOfPlaceholders, placeholderPerClick, placeholderSellPrice, clickMultiplier, toolUpgradeCost, toolUpgradeTimes, click_amount, successRate, successRateTimes, successRateCost, moneyPerSecond, workerCost, workerTimes, prestigePoints, lastLog];

let cooldown = 1;
let cooldownTime;


// audios
var audio1 = new Audio('splat.mp3');
var audio2 = new Audio("laugh.mp3");
var audio3 = new Audio("music.mp3");
var audio4 = new Audio("explosion.mp3");

// cheat codes
let keysDown = [];
onkeydown = function(e) { console.log(e.keyCode); if (!keysDown.includes(e.keyCode)) { keysDown.push(e.keyCode);} }
onkeyup = function(e) { keysDown.splice(keysDown.indexOf(e.keyCode), 1); }

let debug = false;
let inputs = "";
window.addEventListener('keydown', function(e) {
  inputs += e.key; 
  if(inputs.endsWith("guy")) {
    explosion();
    setTimeout(cheatCode, 1000)
    inputs = "";
  }
  if (inputs.endsWith("spam")) {
    let moneyp = prompt("how much money do you want");
    money = parseInt(moneyp);
  }
  if (inputs.endsWith("debug")) {
    debug = !debug;
  }
});

function cheatCode() {
  alert("cheat code activated");
  window.close();
}





// maths functions
function numSimplify(value) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}


// cookie functions

function ClearCookies() {
	console.log("clearing cookies");
  moneyPerSecond = 0;
	localStorage.setItem("lastLog", new Date().getTime() / 1000);
	console.log(localStorage.getItem("lastLog"));
	lastLog = localStorage.getItem("lastLog");

  for (let i = 0; i < cookiesArray.length; i++) {
    localStorage.setItem(cookiesArray[i], cookieValues[i]);
  }
	localStorage.setItem("lastLog", new Date().getTime() / 1000);
	lastLog = localStorage.getItem("lastLog");

}

function RetrieveCookies() {
  for (let i = 0; i < cookiesArray.length; i++) { 
  if (localStorage.getItem(cookiesArray[i]) == null || localStorage.getItem(cookiesArray[i]) == undefined || parseInt(localStorage.getItem(cookiesArray[i])) == NaN) {
    ClearCookies();
  }
  }
  money = parseInt(localStorage.getItem(cookiesArray[0]));
  numOfPlaceholders = parseInt(localStorage.getItem(cookiesArray[1]));
  placeholderPerClick = parseInt(localStorage.getItem(cookiesArray[2]));
  placeholderSellPrice = parseInt(localStorage.getItem(cookiesArray[3]));
  clickMultiplier = parseInt(localStorage.getItem(cookiesArray[4]));
  toolUpgradeCost = parseInt(localStorage.getItem(cookiesArray[5]));
  toolUpgradeTimes = parseInt(localStorage.getItem(cookiesArray[6]));
  click_amount = parseInt(localStorage.getItem(cookiesArray[7]));
  successRate = parseInt(localStorage.getItem(cookiesArray[8]));
  successRateTimes = parseInt(localStorage.getItem(cookiesArray[9]));
  successRateCost = parseInt(localStorage.getItem(cookiesArray[10]));
  moneyPerSecond = parseInt(localStorage.getItem(cookiesArray[11]));
  workerCost = parseInt(localStorage.getItem(cookiesArray[12]));
  workerTimes = parseInt(localStorage.getItem(cookiesArray[13]));
	prestigePoints = parseInt(localStorage.getItem(cookiesArray[14]));
  lastLog = parseInt(localStorage.getItem(cookiesArray[15]));
}

function UpdateCookies() {
  cookieValues = [money, numOfPlaceholders, placeholderPerClick, placeholderSellPrice, clickMultiplier, toolUpgradeCost, toolUpgradeTimes, click_amount, successRate, successRateTimes, successRateCost, moneyPerSecond, workerCost, workerTimes, prestigePoints, new Date().getTime() / 1000];

  for (let i = 0; i < cookiesArray.length; i++) {
    localStorage.setItem(cookiesArray[i], cookieValues[i]);
  }

  offlineTime = 0;
}


// offline earnings

let timeSinceLast;

function GetOE(last) {
   //alert(last);
  timeSinceLast = (new Date().getTime() / 1000) - last;
   //alert(timeSinceLast);
  let moneyGainSL = timeSinceLast * (moneyPerSecond / 15);
	numOfPlaceholders = localStorage.getItem("numOfPlaceholders");
	numOfPlaceholders = parseInt(numOfPlaceholders);
  numOfPlaceholders += parseInt(moneyGainSL);
	localStorage.setItem("numOfPlaceholders", numOfPlaceholders);
	console.log(moneyGainSL);
  return parseInt(moneyGainSL);
}

let acceptedOE = false;

function AcceptOE() {
  acceptedOE = true;
  document.getElementById("offlineEarnings").style.opacity = "0";
  document.getElementById("offlineEarnings").style.marginTop = "-40vh";
}


// functions without user control

function Awake() {
  //explosion();
	money = 0;
	numOfPlaceholders = 0;
	placeholderPerClick = 1;
	placeholderSellPrice = 1;
	clickMultiplier = 1;
	fps = 30;
	time = 0;
	toolUpgradeCost = 10;
	toolUpgradeTimes = 0;	 
	successRateCost = 500;
	successRateTimes = 0;
	click_amount = 0;
	successRate = 35;
  lastLog = new Date().getTime() / 1000;


	// rise();

  document.getElementById("popupText").style.cssText = "opacity: 0;";
	cookieValues = [money, numOfPlaceholders, placeholderPerClick, placeholderSellPrice, clickMultiplier, toolUpgradeCost, toolUpgradeTimes, click_amount, successRate, successRateTimes, successRateCost, moneyPerSecond, workerCost, workerTimes, lastLog];
	//ClearCookies();
	RetrieveCookies();
	//ClearCookies();

  document.getElementById("OEDisplayMoney").innerText = GetOE(lastLog);
  Update();
}

function randomSound() {
  let what = new Audio('Sounds/" + random(1, 4) + ".mp3');
  if (random(1, 2) == 1) {
    what.play();
  }
}
function Update() {
  randomSound();


  // 71, 85, 89
  audio3.play();
  UpdateCookies();
  time++;
  UpdateDisplays();

  MoneyPerSecond();
  setTimeout(Update, 1000 / fps);
}


// functions called by user control

function SellPlaceholders() {
  audio2.play();
  money += numOfPlaceholders * placeholderSellPrice;
  numOfPlaceholders = 0;
}

function Click() {
  if (acceptedOE) {

  //if (time > cooldownTime + (fps * cooldown)) {
  randomNumber = Math.floor(Math.random() * 100);
  if (randomNumber < successRate) {
    // Success
    document.getElementById("popupText").style.cssText = "transition-duration: 0s; margin-left: " + random(40, 53) + "vw; color: green;";
    document.getElementById("popupText").innerHTML = "Success!";
    window.setTimeout(Rise, 1);
    numOfPlaceholders += placeholderPerClick * clickMultiplier;
    clickMultiplier += (0.01 / (10^20));
    cooldownTime = time;
  } else {
    // Failed
    audio1.play();
    document.getElementById("popupText").style.cssText = "transition-duration: 0s; margin-left: " + random(40, 53) + "vw; color: red;";
    document.getElementById("popupText").innerHTML = "Failed!";
    window.setTimeout(Rise, 1);
    cooldownTime = time;
    Failed();
  }
  }
}

function Upgrade(type) {
  switch (type) {
    case "tool":
      if (money >= toolUpgradeCost) {
        placeholderPerClick += placeholderPerClick * 0.5;
        toolUpgradeTimes++;
        money -= toolUpgradeCost;
        toolUpgradeCost = toolUpgradeCost * (1.8 + (toolUpgradeTimes / 10));
      }
      break;
    case "seller":
      break;	
    case "successRate":
      if (money >= successRateCost) {
        successRate += 5;
        money -= successRateCost;
          successRateCost = successRateCost * (2 + (successRateTimes / 10));
      }
      break;
    case "moneyPerSecond":
        if (money >= workerCost) {
          money -= workerCost;
          moneyPerSecond += 1;
          workerCost = workerCost * (1.3 + (workerTimes / 3));
        }
      break;
  }
}



function MoneyPerSecond() {
	numOfPlaceholders += moneyPerSecond * timeSinceLastUpdate;
}

function RoundToInt(fuckfuck) {
  return numSimplify(fuckfuck);
}

// tedious csshtmldom styling functions

function UpdateDisplays() {
  // click
	document.getElementById("placeholderButton").style.marginTop = ((Math.sin(time / 10) * 2) + 10) + "vw";
  document.getElementById("placeholderButton").style.rotate = ((Math.sin(time / 20) * 4)) + "deg";

  // stats
  document.getElementById("placeholderDisplay").innerHTML = numSimplify(numOfPlaceholders).toString();
	document.getElementById("moneyDisplay").innerHTML = "$" + numSimplify(money).toString();

  if (!wheelSpinning) {
  document.getElementById("moneyRange").setAttribute("max", money);
  document.getElementById("moneyRangeDisplay").innerText = "Betting $" + numSimplify(document.getElementById("moneyRange").value);
  }
	
  // buttons
  document.getElementById("upgradeToolTimes").innerHTML = numSimplify(toolUpgradeTimes).toString();
	document.getElementById("upgradeToolCost").innerHTML = "$" + numSimplify(toolUpgradeCost).toString();
	document.getElementById("tool").innerHTML = "Current Tool: " + toolNames[toolUpgradeTimes];
	document.getElementById("upgradeSuccessRate").innerHTML = "$" + numSimplify(successRateCost).toString();
	document.getElementById("rate").innerHTML = "Success Rate: " + successRate + "%";
	document.getElementById("upgradeWorker").innerHTML = "$" + numSimplify(workerCost).toString();
}

function Rise() {
  document.getElementById("popupText").style.cssText = "transition-duration: 1s; margin-top: 25vh; opacity: 0; color: black; margin-left: " + random(40, 53) + "vw;";
}

function Failed() {
	
}




//this is called when the player presses "sell your soul"
function sellSoul1() {
  if (acceptedOE) {
  document.getElementById("question").style.opacity = "1";
  document.getElementById("question").style.marginTop = "20vh";
  document.getElementById("sellSoul").style.opacity = "0";
  document.getElementById("sellSoul").style.width = "0vw";
  document.getElementById("sellPlaceholder").style.left = "45%";
  // document.body.style.backgroundSize = "cover";
  // document.body.style.backgroundImage = "url(\"BackgroundArt/hell.gif\")";
  }
}

// this is called when the player presses "hell yeah!"
function sellSoul2() {
  explosion();
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundImage = "url(\"BackgroundArt/hell.gif\")";
  document.getElementById("question").style.opacity = "0";
  document.getElementById("question").style.marginTop = "-40vh";
  document.getElementById("gamblingCenter").style.marginLeft = "75vw";
}

function exitQuestion() {
  document.getElementById("question").style.opacity = "0";
  document.getElementById("question").style.marginTop = "-40vh";
  document.getElementById("sellSoul").style.opacity = "1";
  document.getElementById("sellSoul").style.width = "10vw";
  document.getElementById("sellPlaceholder").style.left = "40%";
}



let boomImg;

function explosion() {
  boomImg = document.createElement("img");
  boomImg.style.cssText = "width: 40vw; margin-left: 30vw; position: fixed; z-index: 100;";
  boomImg.src = "Art/explosion.gif";
  document.body.appendChild(boomImg);
  audio4.play();
  setTimeout(removeExplosion, 850);
}

function removeExplosion() {
  document.body.removeChild(boomImg);
}

function prestige() {
	money = 0;
	numOfPlaceholders = 0;
	placeholderPerClick = 1;
	placeholderPerSecond = 0;
	toolUpgradeTimes = 0;
	toolUpgradeCost = 10;
	successRate = 0;
	successRateCost = 500;
	workerTimes = 0;
	workerCost = 500;
	prestigePoints += money / 50000;
	clickMultiplier = 1 + prestigePoints / 100;
	
	
	
}

let wheelRotation = 0;
let wheelSpinning = false;
let timeToSpin;
let changeRotate;
let bet;
function spinWheel() {
  if (!wheelSpinning) {
    bet = document.getElementById("moneyRange").value;
    // alert(bet);
    money -= bet;
    document.getElementById("moneyRange").disabled = true;
    
    changeRotate = random(180, 3600);
    timeToSpin = changeRotate/180;
    // document.getElementById("wheel").style.transitionDuration = timeToSpin + "s";
    setTimeout(endSpin, 1800);
    wheelRotation += changeRotate;
    wheelSpinning = true;
    document.getElementById("wheel").style.rotate = -wheelRotation + "deg";
  }
}
// green 15deg,
//  red 45deg,
//  green 55deg,
//  red 85deg,
//  purple 95deg,
//  red 125deg,
//  green 135deg,
//  red 165deg,
//  green 195deg,
//  red 225deg,
//  green 240deg,
//  white 295deg,
//  green 310deg,
//  red 340deg,
//  green 360deg
function endSpin() {
  document.getElementById("moneyRange").disabled = false;
  wheelSpinning = false;
  wheelRotation = wheelRotation % 360;
  // i am fully aware how terrible this code is
  if (wheelRotation < 15) { win(4); }
  else if (wheelRotation < 45) { win(0.25); }
  else if (wheelRotation < 55) { win(4); }
  else if (wheelRotation < 85) { win(0.25); }
  else if (wheelRotation < 95) { win(25); }
  else if (wheelRotation < 125) { win(0.25); }
  else if (wheelRotation < 135) { win(4); }
  else if (wheelRotation < 165) { win(0.25); }
  else if (wheelRotation < 195) { win(4); }
  else if (wheelRotation < 225) { win(0.25); }
  else if (wheelRotation < 240) { win(4); }
  else if (wheelRotation < 295) { win(1); }
  else if (wheelRotation < 310) { win(4); }
  else if (wheelRotation < 340) { win(0.25); }
  else { win(4); }
}
function win(multiplier) {
  money += Math.round(bet * multiplier);
  if (multiplier == 1) {
    alert("You didn't win anything!");
  }
  else if (multiplier > 1) {
    alert("You won $" + numSimplify(Math.round(bet * (multiplier - 1))) + "!");
  }
  else {
    alert("You lost $" + numSimplify(Math.abs(Math.round((bet) * multiplier))) + "!");
    reassure();
  }
}
function reassure() {
  document.getElementById("reassurance").style.display = "block";
  setTimeout(deassure, 2000);
}
function deassure() {
  document.getElementById("reassurance").style.display = "none";
}
