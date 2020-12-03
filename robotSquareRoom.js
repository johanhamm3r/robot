//TURN COMMANDS IN ORIGINAL LANGUAGE (SWEDISH)
var rightLeft = ["H","V"]

//MOVE COMMANDS IN ALL AVAILABLE LANGUAGES
var move = ["G","F"]

var english = {
  'L': 'V',
  "R": 'H',
};

//VECTORS DEPENDING ON DIRECTION
var vectors = {
  'N': [0,-1],
  "E": [1,0],
  "S": [0,1],
  "W": [-1,0]
};

//DIRECTIONS DEPENDING ON PREVIOUS DIRECTION
var direction = {
  'N': {"H" : "E", "V" : "W"},
  'E': {"H" : "S", "V": "N"},
  'S': {"H" : "W", "V": "E"},
  'W': {"H" : "N", "V": "S"}
};

//FUNCTION TO MOVE ROBOT
var input = function (command,limit) {  
  limit = limit;
  var crash = false;
  var startDir = dir;
  var newVector = [0, 0];
 
  for (let i = 0; i < command.length; i++) {

      if (rightLeft.includes(command[i])) {
        dir = direction[dir][command[i]];

      } else if (command[i] in english)  {
        let x = english[command[i]];
        dir = direction[dir][x];

      } else if (move.includes(command[i]))  {
        let x = vectors[dir];
        var sum = x.map(function (num, idx) {
          return num + newVector[idx];
        });
        newVector = sum;
      }
      else {
        console.log("incorrect command");
      }
  }

  var sum2 = newVector.map(function (num, idx) {
    if (num + location[idx] <0) {
      console.log("You crash")
      console.log("You are back at " +location+" "+dir)
      crash = true

    } else if (num + location[idx] >limit) {
      console.log("You crash")
      console.log("You are back at " +location+" "+dir)
      crash = true
      
    } else {
      return num + location[idx];
    }
    });

  if (crash == false){
    location = sum2

  } else {
    location = location
  }
}

//PARAMS
var limit = 5 //5x5 room
var location = [1, 2]; //START LOCATION
var dir = "N" //START DIRECTION
var dirInput = "HGHGGHGHG" //INSTRUCTION COMMANDS = HGHGGHGHG

//TEST
var moveRobot = input(dirInput,limit); 
console.log("You are now at "+ location+" "+dir)