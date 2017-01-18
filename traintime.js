// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between first and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
// var config = {
//   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };

  var config = {
    apiKey: "AIzaSyBC925mH-avWbTriiJrRkkHi30RmnSjWS0",
    authDomain: "traintime-6d9ad.firebaseapp.com",
    databaseURL: "https://traintime-6d9ad.firebaseio.com",
    storageBucket: "traintime-6d9ad.appspot.com",
    messagingSenderId: "946926893779"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function() {

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  // Prettify the first train format
  var trainFirstPretty = moment.unix(trainFirst).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainNext = moment().diff(moment.unix(trainFirst, "X"), "months");
  console.log(trainNext);

  // Calculate the total billed freq
  var trainMinsAway = trainNext * trainFreq;
  console.log(trainMinsAway);

  // Add each train's data into the table
  $("#train-schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + trainNext + "</td><td>" + trainMinsAway + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee first date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case