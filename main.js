/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

/**
 * \see http://www.html5canvastutorials.com/advanced/html5-canvas-animation-stage/
 */
window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 24);
    };
})();


var gameFrequency=60;

var screen2=new Screen(gameFrequency);

var periodInMilliSeconds=16;

var a=function(){
	screen2.iterate();
}

setInterval(a,periodInMilliSeconds);

function animate(){
	requestAnimFrame(animate);

	screen2.draw();
}

window.onload=animate;
