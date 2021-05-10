function draw() {
  const canvas = document.getElementById("canvas");
const lcontext = canvas.getContext("2d");

console.log("My Land Message");

if (canvas.getContext) {
  console.log("My Land in Message");
  var lcontext = canvas.getContext('2d');

  lcontext.fillRect(20,20,100,100);
  lcontext.clearRect(40,40,60,60);
  lcontext.strokeRect(45,45,50,50);
}  
}