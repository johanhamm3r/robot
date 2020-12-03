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
  'N': [0,1],
  "E": [1,0],
  "S": [0,-1],
  "W": [-1,0]
};

//DIRECTIONS DEPENDING ON PREVIOUS DIRECTION
var direction = {
  'N': {"H" : "E", "V" : "W"},
  'E': {"H" : "S", "V": "N"},
  'S': {"H" : "W", "V": "E"},
  'W': {"H" : "N", "V": "S"}
};

//CALCULATE ALLOWED VECTORS IN THE CIRCLE ROOM BY FINDING THE LENGTH OF THE CHORD
//BASED ON CARTESIAN COORDINATE SYSTEM
var calcNoCircleVectors = function (radius,list) {  
  let r = radius*radius;
  for (let i = 0; i < radius; i++)
  {
      let ie=i+1;
      let distR=i+1;
      distR = Math.sqrt(r-(distR*distR));
      distR = Math.floor(distR);

      for (let e = 0; e < distR+1; e++) {
          let vector = [ie,e];
          list = list.concat([vector]);
      }
  }
  list = list.concat([center]);
  console.log("There are "+list.length+" possible vectors in the room");
  return list;
}

//FUNCTION TO MOVE ROBOT
var input = function (command,limit) {  
  var limit = limit;
  var crash = false;
  var startDir = dir;
  var newVector = [0, 0];
 
  for (let i = 0; i < command.length; i++) {

      if (rightLeft.includes(command[i])) {
        dir = direction[dir][command[i]];

      } else if (command[i] in english)  {
        let x = english[command[i]];
        dir = direction[dir][x];
   
      } else if (move.includes(command[i])) {
        let x = vectors[dir];
        var sum = x.map(function (num, idx) {
          return num + newVector[idx];
        });
        newVector = sum;    

      } else {
        console.log("incorrect command");
      }
    
  }

  //CHECK IF NEW VECTOR IS ALLOWED (WITHIN CIRCLE)
  const absoluteValueArray = (array) => {
    return array.map(Math.abs);
  }
  let newVector2 = absoluteValueArray(newVector);

  let arrayLength = circleVectors.length
  let testf = false
  for (var i = 0; i < arrayLength; i++) {

    let one = circleVectors[i]
    var sum2 = one.map(function (num, idx) {
      return num - newVector2[idx];
    });

    checkVector = sum2;
    const isAllZero = checkVector.every(item => item === 0);
    isZero = isAllZero

    if (isZero == true) {
      var sum = location.map(function (num, idx) {
        return num + newVector[idx];
      });
      location = sum
      crash = false
      } 
    }

  if (crash == true){
    console.log("You crash")
    console.log("You are back at " +location+" "+dir)
    dir = startDir
    location = location
    
  }
return location
}

//CALC ALLOWED VECTORS IN CIRCLE ROOM
var circleLimit = 10 //10 radius circle room
var center = [0,0]
var allowedVectors = []
var circleVectors = calcNoCircleVectors(circleLimit,allowedVectors);

//PARAMS
var location = [0,0]; // START LOCATION (CENTER OF CIRCLE)
var dir = "N" //START DIRECTION
var dirInput = "RRFLFFLRF" //INSTRUCTION COMMANDS = RRFLFFLRF

var moveRobot = input(dirInput,circleLimit);
console.log("You are now at "+ location+" "+dir)