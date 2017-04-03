function init() {
  window.requestAnimationFrame(draw);
}

/*
    This draw() function is for 2D Canvas operations.
*/

/*
** Define some global variables
*/

var screenWidth = 1280;
var screenHeight = 800;

var globalCenterX = screenWidth/2;
var globalCenterY = screenHeight/2;

var globalMoveByX = 8 ;
var globalMoveByXmag = 1;

var globalMoveByY = 8;
var globalMoveByYmag = 1;

var globalAngle = 0.0;
var oneDegree = 0.0174533; // radians per degree
var vangle = 1 * oneDegree;

var globalClearScreen = true;
var globalDoStroke = true;    // stroke outline, or fill area
var globalStrokeColor = '#ff0000';
var globalRadius = 475.0;
var globalBegin = true;
var globalPause = false;

var lastX = globalCenterX;
var lastY = globalCenterY;
var lastAngle;
var lastRadius;


var colors = { "red":'#ff0000', "green":'#00ff00', "blue":'#0000ff' };

/*
** Define the various callback functions
*/

function togglePause() {
    globalPause = ! globalPause;
    
    if ( globalPause ) {
        $("input[id=pause]").val("Go");
        
    } else {
         $("input[id=pause]").val("Pause");
    }
}

function plusvx(amount) {
    globalMoveByX = globalMoveByX + amount;
    $("label[id=vx]").html( globalMoveByX );
}

function plusvy(amount) {
    globalMoveByY = globalMoveByY + amount;
    $("label[id=vy]").html( globalMoveByY  );
}

function plusAngleDegree(amount) {
    vangle = vangle + amount * oneDegree ;
    $("label[id=degree]").html( Math.ceil( vangle/ oneDegree));
}

function clearScreen() {
    globalClearScreen = true;
}

function colorChanged() {
    
    var tocolor = $("#selectColor").val();
    var rgb = colors[tocolor];
    globalStrokeColor = rgb;

}

function plusRadius(amount) {
    globalRadius += amount * 25;
    $("label[id=radius]").html( globalRadius  );
}


/*
** The main starting point of the program
*/

function app() {
    $("label[id=vx]").html( globalMoveByX );
    $("label[id=vy]").html( globalMoveByY );
    $("label[id=degree]").html( vangle / 0.0174533);
    $("label[id=radius]").html(  globalRadius);
 
    lastX = globalCenterX + Math.cos(globalAngle) * globalRadius ;
    lastY = globalCenterY + Math.sin(globalAngle) * globalRadius ;

    
    draw();
}


/*
** The canvas drawing function
*/
var gnum=0;
function draw() {
    var canvas2d;   
    var x ;
    var y ;
    
    if ( globalPause ) {
        window.requestAnimationFrame(draw);
        return;
    }
    
    canvas2d = document.getElementById('mycanvas');
    if (canvas2d.getContext) {

        var ctx = canvas2d.getContext('2d');
  
        ctx.fillStyle =   globalStrokeColor ;
        ctx.strokeStyle = globalStrokeColor ; //rgb(200,0,0)";

        if ( globalClearScreen   ) {
            
            ctx.clearRect(0,0, screenWidth, screenHeight); // clear canvas
            globalClearScreen = false;        
        }
        
        ctx.beginPath();
        
        globalCenterX = globalCenterX + globalMoveByX * globalMoveByXmag;
        globalCenterY = globalCenterY + globalMoveByY * globalMoveByYmag;
        
        x = globalCenterX + Math.cos(lastAngle) * lastRadius;
        y = globalCenterY + Math.sin(lastAngle) * lastRadius;
        ctx.moveTo( x, y);
        
        if ( globalCenterX > screenWidth || globalCenterX < 0) {
            globalMoveByXmag = -1 * globalMoveByXmag;
            globalCenterX = globalCenterX + (globalMoveByX * globalMoveByXmag);
        }
        
        if ( globalCenterY > screenHeight || globalCenterY < 0) {
            globalMoveByYmag = globalMoveByYmag * -1;
            globalCenterY = globalCenterY + (globalMoveByY * globalMoveByYmag) ;
        }
        
        lastRadius = globalRadius;
        
        for( var i=0; i < 360 ; i++ ) {
            
            globalAngle = globalAngle + vangle;
            x = globalCenterX + Math.cos(globalAngle) * globalRadius ;
            y = globalCenterY + Math.sin(globalAngle) * globalRadius ;

            ctx.lineTo(x,y);
            
            lastAngle = globalAngle;
        }
        
         
        ctx.closePath();


        if ( globalDoStroke ) {
            ctx.stroke();
        } else {
            ctx.fill();
        }
        
    
        window.requestAnimationFrame(draw);
        
    } else {
        alert("Unable to grab mycanvas handle.");
    }
}
