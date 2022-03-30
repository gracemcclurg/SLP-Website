var vocab = [
  "ball",
  "candy",
  "day",
  "fairy",
  "goat",
  "hug",
  "meat",
  "nail",
  "party",
  "talk",
  "sing",
  "van",
  "wood",
  "zipper",
];
var testOff = 0;

var daysFilled = [];

var d = new Date();
d.setDate(d.getDate() + testOff);
var dayOfWeek = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
var dayOfWeekStr = dayOfWeek.toString();

var hoverYellow = "#f5dd5f";
var hoverGreen = "#62b570";
var hoverRed = "#f26ba5";

var activeYellow = "#ebcc2a";
var activeGreen = "#3e964d";
var activeRed = "#eb2a7d";

var stagnantYellow = "#f0e190";
var stagnantGreen = "#96e0a3";
var stagnantRed = "#f5a4c7";

function refreshVariables() {
  if (typeof Storage !== "undefined") {
    //var cnt = 0;
    //document.getElementById("warning").innerHTML =vocab.length;
    for (var i = 0; i < vocab.length; i++) {
      var checkBox = document.getElementById(vocab[i] + "Check");
      //cnt++;
      var key = vocab[i] + " " + dayOfWeekStr;
      var res = localStorage.getItem(key);
      if (res === null) {
        localStorage.setItem(key, "false");
        //var test = document.getElementById("talkCheck");
        //test.checked = true;
      } else if (res == "false") {
        checkBox.checked = false;
      } else {
        checkBox.checked = true;
      }
    }
  } else {
    document.getElementById("warning").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  updateTabs();
}

function updateTabs() {
  var day6 = new Date();
  day6.setDate(day6.getDate() - 1 + testOff);
  var day6Str = toDateString(day6);

  var day5 = new Date();
  day5.setDate(day5.getDate() - 2 + testOff);
  var day5Str = toDateString(day5);

  var day4 = new Date();
  day4.setDate(day4.getDate() - 3 + testOff);
  var day4Str = toDateString(day4);

  var day3 = new Date();
  day3.setDate(day3.getDate() - 4 + testOff);
  var day3Str = toDateString(day3);

  var day2 = new Date();
  day2.setDate(day2.getDate() - 5 + testOff);
  var day2Str = toDateString(day2);

  var day1 = new Date();
  day1.setDate(day1.getDate() - 6 + testOff);
  var day1Str = toDateString(day1);

  document.getElementById("day1").innerHTML = " <br/> " + day1Str;
  document.getElementById("day2").innerHTML = " <br/> " + day2Str;
  document.getElementById("day3").innerHTML = " <br/> " + day3Str;
  document.getElementById("day4").innerHTML = " <br/> " + day4Str;
  document.getElementById("day5").innerHTML = " <br/> " + day5Str;
  document.getElementById("day6").innerHTML = " <br/> " + day6Str;
  document.getElementById("day7").innerHTML =
    "Today:" + " <br/> " + dayOfWeekStr;

  var dayStrArr = [
    day1Str,
    day2Str,
    day3Str,
    day4Str,
    day5Str,
    day6Str,
    dayOfWeekStr,
  ];

  removeOldDates(day1Str);
  updateTabContent(dayStrArr);
}
function onHover(button, dNum) {
  if (dNum != activeButton) {
    var numComplete = daysFilled[dNum - 1];
    //none
    if (numComplete == 0) {
      button.style.background = hoverRed;
      //all
    } else if (numComplete == 14) {
      button.style.background = hoverGreen;
      //partial 4dbd72
    } else {
      button.style.background = hoverYellow;
    }
  }
}
function offHover(button, dNum) {
  if (dNum != activeButton) {
    var numComplete = daysFilled[dNum - 1];
    //none
    if (numComplete == 0) {
      button.style.background = stagnantRed;
      //all
    } else if (numComplete == 14) {
      button.style.background = stagnantGreen;
      //parial 5eeb8d
    } else {
      button.style.background = stagnantYellow;
    }
  }
}

function active(button, dNum) {
  var numComplete = daysFilled[dNum - 1];
  //none
  button.style.borderColor = "black";
  button.style.borderWidth = "3px";
  if (numComplete == 0) {
    button.style.background = activeRed;
    //all
  } else if (numComplete == 14) {
    button.style.background = activeGreen;
    //partial
  } else {
    button.style.background = activeYellow;
  }
}
var activeButton;

function removeOldDates(d1) {
  var d1Split = d1.split("-");
  var dayLowBound = parseInt(d1Split[1]);
  var monthLowBound = parseInt(d1Split[0]);
  var yearLowBound = parseInt(d1Split[2]);

  if (typeof Storage !== "undefined") {
    var len = localStorage.length;
    for (var i = 0; i < localStorage.length; i++) {
     
      var key = localStorage.key(i);
     
      var keyArr = key.split(" ");
      var monthDayYear = keyArr[1].split("-");
     
      
      var day = parseInt(monthDayYear[1]);
      var month = parseInt(monthDayYear[0]);
      var year = parseInt(monthDayYear[2]);
      
    
      if (year < yearLowBound) {
        localStorage.removeItem(key);
        i--;
        //year is same and month is older
      } else if (year == yearLowBound && month < monthLowBound) {
        localStorage.removeItem(key);
        i--;
        //same month and day is less than
      } else if (
        year == yearLowBound &&
        month == monthLowBound &&
        day < dayLowBound
      ) {
        localStorage.removeItem(key);
        i--;
      }
    }
  } else {
    document.getElementById("warning").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
}

function updateTabContent(dayStrArr) {
  /*document.getElementById("d1".toString()).innerHTML =
    "<wrongvocab> talk </wrongvocab> <br/> ";*/
  if (typeof Storage !== "undefined") {
    //var cnt = 0;
    //document.getElementById("warning").innerHTML =vocab.length;
    for (var i = 0; i < dayStrArr.length; i++) {
      var vocabList = "";
      var numComplete = 0;

      //iterate through vocab
      for (var j = 0; j < vocab.length; j++) {
        var key = vocab[j] + " " + dayStrArr[i];
        var res = localStorage.getItem(key);

        if (res === null) {
          vocabList = vocabList.concat(
            "<wrongvocab> " + vocab[j] + " ✘ " + "</wrongvocab> <br/> "
          );
        } else if (res == "false") {
          vocabList = vocabList.concat(
            "<wrongvocab> " + vocab[j] + " ✘ " + "</wrongvocab> <br/> "
          );
        } else {
          vocabList = vocabList.concat(
            "<correctvocab> " + vocab[j] + " ✓ " + "</correctvocab> <br/> "
          );
          numComplete++;
        }
      }

      document.getElementById("d" + (i + 1).toString()).innerHTML =
        "<center>" + vocabList + "</br></center>";

      daysFilled[i] = numComplete;

      if (numComplete === 0) {
        document.getElementById("day" + (i + 1).toString()).style.background =
          stagnantRed;
      } else if (numComplete < 14) {
        document.getElementById("day" + (i + 1).toString()).style.background =
          stagnantYellow;
      } else {
        document.getElementById("day" + (i + 1).toString()).style.background =
          stagnantGreen;
      }
    }
  } else {
    document.getElementById("warning").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
}

document.getElementById("defaultOpen").click();

function toDateString(d) {
  return (
    d.getMonth() +
    1 +
    "-" +
    d.getDate() +
    "-" +
    d.getFullYear()
  ).toString();
}

function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, pillButton;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  pillButton = document.getElementsByClassName("pillButton");
  for (i = 0; i < pillButton.length; i++) {
    pillButton[i].className = pillButton[i].className.replace(" active", "");
    // pillButton[i].style.borderColor = "black";
    //pillButton[i].style.borderWidth="1px"
    //pillButton[i].style.borderRadius="16px";
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";

  if (cityName == "Progress") {
    document.getElementById("day7").click();
  }
}

function openDay(evt, cityName, button, dayNum) {
  activeButton = dayNum;

  // Declare all variables
  var i, dayTabcontent, dayTablinks;
  // Get all elements with class="tabcontent" and hide them
  dayTabcontent = document.getElementsByClassName("dayTabcontent");
  for (i = 0; i < dayTabcontent.length; i++) {
    dayTabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  dayTablinks = document.getElementsByClassName("dayTablinks");
  for (i = 0; i < dayTablinks.length; i++) {
    offHover(dayTablinks[i], i + 1);
    dayTablinks[i].style.borderColor = "black";
    dayTablinks[i].style.borderWidth = "1px";
    //dayTablinks[i].className = dayTablinks[i].className.replace(" active", "");
  }
  active(button, dayNum);

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function ballCheckBox() {
  var checkBox = document.getElementById("ballCheck");
  var key = "ball " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function candyCheckBox() {
  var checkBox = document.getElementById("candyCheck");
  var key = "candy " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function dayCheckBox() {
  var checkBox = document.getElementById("dayCheck");
  var key = "day " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function fairyCheckBox() {
  var checkBox = document.getElementById("fairyCheck");
  var key = "fairy " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function goatCheckBox() {
  var checkBox = document.getElementById("goatCheck");
  var key = "goat " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function hugCheckBox() {
  var checkBox = document.getElementById("hugCheck");
  var key = "hug " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function meatCheckBox() {
  var checkBox = document.getElementById("meatCheck");
  var key = "meat " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function nailCheckBox() {
  var checkBox = document.getElementById("nailCheck");
  var key = "nail " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}
function partyCheckBox() {
  var checkBox = document.getElementById("partyCheck");
  var key = "party " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}

function singCheckBox() {
  var checkBox = document.getElementById("singCheck");
  var key = "sing " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}

function talkCheckBox() {
  var checkBox = document.getElementById("talkCheck");
  var key = "talk " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}

function vanCheckBox() {
  var checkBox = document.getElementById("vanCheck");
  var key = "van " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}

function woodCheckBox() {
  var checkBox = document.getElementById("woodCheck");
  var key = "wood " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}

function zipperCheckBox() {
  var checkBox = document.getElementById("zipperCheck");
  var key = "zipper " + dayOfWeekStr;
  if (typeof Storage !== "undefined") {
    if (checkBox.checked == false) {
      localStorage.setItem(key, "false");
    } else {
      localStorage.setItem(key, "true");
    }
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
  refreshVariables();
}

//speech word buttons
var ballBtn = document.getElementById("ball");
var candyBtn = document.getElementById("candy");
var dayBtn = document.getElementById("day");
var fairyBtn = document.getElementById("fairy");
var goatBtn = document.getElementById("goat");
var hugBtn = document.getElementById("hug");
var meatBtn = document.getElementById("meat");
var nailBtn = document.getElementById("nail");
var partyBtn = document.getElementById("party");
var singBtn = document.getElementById("sing");
var talkBtn = document.getElementById("talk");
var vanBtn = document.getElementById("van");
var woodBtn = document.getElementById("wood");
var zipperBtn = document.getElementById("zipper");

//vocabulary modals/subscreens
var ballModal = document.getElementById("ballModal");
var candyModal = document.getElementById("candyModal");
var dayModal = document.getElementById("dayModal");
var fairyModal = document.getElementById("fairyModal");
var goatModal = document.getElementById("goatModal");
var hugModal = document.getElementById("hugModal");
var meatModal = document.getElementById("meatModal");
var nailModal = document.getElementById("nailModal");
var partyModal = document.getElementById("partyModal");
var singModal = document.getElementById("singModal");
var talkModal = document.getElementById("talkModal");
var vanModal = document.getElementById("vanModal");
var woodModal = document.getElementById("woodModal");
var zipperModal = document.getElementById("zipperModal");

//close button
var ballClose = document.getElementById("ballClose");
var candyClose = document.getElementById("candyClose");
var dayClose = document.getElementById("dayClose");
var fairyClose = document.getElementById("fairyClose");
var goatClose = document.getElementById("goatClose");
var hugClose = document.getElementById("hugClose");
var meatClose = document.getElementById("meatClose");
var nailClose = document.getElementById("nailClose");
var partyClose = document.getElementById("partyClose");
var singClose = document.getElementById("singClose");
var talkClose = document.getElementById("talkClose");
var vanClose = document.getElementById("vanClose");
var woodClose = document.getElementById("woodClose");
var zipperClose = document.getElementById("zipperClose");

//ball
ballBtn.onclick = function () {
  ballModal.style.display = "block";
};
ballClose.onclick = function () {
  ballModal.style.display = "none";
};

//candy
candyBtn.onclick = function () {
  candyModal.style.display = "block";
};
candyClose.onclick = function () {
  candyModal.style.display = "none";
};

//day
dayBtn.onclick = function () {
  dayModal.style.display = "block";
};
dayClose.onclick = function () {
  dayModal.style.display = "none";
};

//fairy
fairyBtn.onclick = function () {
  fairyModal.style.display = "block";
};
fairyClose.onclick = function () {
  fairyModal.style.display = "none";
};

//goat
goatBtn.onclick = function () {
  goatModal.style.display = "block";
};
goatClose.onclick = function () {
  goatModal.style.display = "none";
};

//hug
hugBtn.onclick = function () {
  hugModal.style.display = "block";
};
hugClose.onclick = function () {
  hugModal.style.display = "none";
};

//meat
meatBtn.onclick = function () {
  meatModal.style.display = "block";
};
meatClose.onclick = function () {
  meatModal.style.display = "none";
};

//nail
nailBtn.onclick = function () {
  nailModal.style.display = "block";
};
nailClose.onclick = function () {
  nailModal.style.display = "none";
};

//party
partyBtn.onclick = function () {
  partyModal.style.display = "block";
};
partyClose.onclick = function () {
  partyModal.style.display = "none";
};

//sing
singBtn.onclick = function () {
  singModal.style.display = "block";
};
singClose.onclick = function () {
  singModal.style.display = "none";
};

//talk
talkBtn.onclick = function () {
  talkModal.style.display = "block";
};
talkClose.onclick = function () {
  talkModal.style.display = "none";
};

//van
vanBtn.onclick = function () {
  vanModal.style.display = "block";
};
vanClose.onclick = function () {
  vanModal.style.display = "none";
};

//wood
woodBtn.onclick = function () {
  woodModal.style.display = "block";
};
woodClose.onclick = function () {
  woodModal.style.display = "none";
};

//zipper
zipperBtn.onclick = function () {
  zipperModal.style.display = "block";
};
zipperClose.onclick = function () {
  zipperModal.style.display = "none";
};

/*
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  switch(event.target){
    case ballModal:
      ballModal.style.display="none";
       //break;
    case candyModal:
      candyModal.style.display="none";
       //break;
    case dayModal:
      dayModal.style.display="none";
       //break;
    case fairyModal:
      fairyModal.style.display="none";
       //break;
    case goatModal:
      goatModal.style.display="none";
       //break;
    case hugModal:
      hugModal.style.display="none";
       //break;
    case meatModal:
      meatModal.style.display="none";
       //break;
    case nailModal:
      nailModal.style.display="none";
      // break;
    case partyModal:
      partyModal.style.display="none";
       //break;
    case singModal:
       singModal.style.display="none";
       //break;
    case talkModal:
      talkModal.style.display="none";
       //break;
    case vanModal:
      vanModal.style.display="none";
       //break;
    case woodModal:
      woodModal.style.display="none";
       //break;
    case zipperModal:
      zipperModal.style.display="none";
       //break;
  }
  */

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == ballModal) {
    ballModal.style.display = "none";
  }
  if (event.target == candyModal) {
    candyModal.style.display = "none";
  }
  if (event.target == dayModal) {
    dayModal.style.display = "none";
  }
  if (event.target == fairyModal) {
    fairyModal.style.display = "none";
  }
  if (event.target == goatModal) {
    goatModal.style.display = "none";
  }
  if (event.target == hugModal) {
    hugModal.style.display = "none";
  }
  if (event.target == meatModal) {
    meatModal.style.display = "none";
  }
  if (event.target == nailModal) {
    nailModal.style.display = "none";
  }
  if (event.target == partyModal) {
    partyModal.style.display = "none";
  }
  if (event.target == singModal) {
    singModal.style.display = "none";
  }
  if (event.target == talkModal) {
    talkModal.style.display = "none";
  }

  if (event.target == vanModal) {
    vanModal.style.display = "none";
  }
  if (event.target == woodModal) {
    woodModal.style.display = "none";
  }
  if (event.target == zipperModal) {
    zipperModal.style.display = "none";
  }
};
