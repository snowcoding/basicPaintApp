// Author: Vimal Shah 2017
// Taken from William Malone Article.

//Global Mouse Positions
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

//Adding colors
var colorBlue = "#0275d8";
var colorGrey = "#cccccc";
var colorGreen = "#5cb85c";
var colorSkyBlue = "#5bc0de";
var colorOrange = "#f0ad4e";
var colorRed = "#d9534f";

var curColor = colorBlue;
var clickColor = new Array();

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

context = document.getElementById('canvasDiv').getContext("2d");

//The Mouse Down event
$('#canvasDiv').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

//Mouse move event
$('#canvasDiv').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

//Mouse Up
$('#canvasDiv').mouseup(function(e){
  paint = false;
});

//Mouse Leave
$('#canvasDiv').mouseleave(function(e){
  paint = false;
});

$('#color-sel').click(function(e){
  if (e.target.innerHTML === "Blue"){
    curColor = colorBlue;
    $('#color-sel button.active').removeClass('active');
    $('#color-sel .btn-outline-primary').addClass('active');
  } else if (e.target.innerHTML === "Grey") {
    curColor = colorGrey;
    $('#color-sel button.active').removeClass('active');
    $('#color-sel .btn-outline-secondary').addClass('active');
  } else if (e.target.innerHTML === "Green"){
    curColor = colorGreen;
    $('#color-sel button.active').removeClass('active');
    $('#color-sel .btn-outline-success').addClass('active');
  } else if (e.target.innerHTML === "Sky Blue"){
    curColor = colorSkyBlue;
    $('#color-sel button.active').removeClass('active');
    $('#color-sel .btn-outline-info').addClass('active');
  } else if (e.target.innerHTML === "Orange"){
    curColor = colorOrange;
    $('#color-sel button.active').removeClass('active');
    $('#color-sel .btn-outline-warning').addClass('active');
  } else if (e.target.innerHTML === "Red"){
    curColor = colorRed;
    $('#color-sel button.active').removeClass('active');
    $('#color-sel .btn-outline-danger').addClass('active');
  }else {
    curColor = colorRed;
  }
})
                          
function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  //context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.stroke();
  }
}