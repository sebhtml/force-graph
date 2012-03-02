/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

var screen=new Screen();

var frequency=60;

var periodInMilliSeconds=1*1000/frequency;

var a=function(){
	screen.iterate();
}

setInterval(a,periodInMilliSeconds);



