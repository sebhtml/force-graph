/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

function Vertex(x,y,name){
	this.x=x;
	this.y=y;
	this.name=name;

	this.velocityX=0;
	this.velocityY=0;

	this.arcs=new Array();

	this.followMouse=false;

	this.updated=false;

	this.twopi=Math.PI*2;
	this.canChangeColor=true;
	this.cacheCanvas=false;

	if(this.cacheCanvas){
		this.buffers=new Array();
	}
}

Vertex.prototype.getColor=function(){
	if(this.followMouse){
		return "rgb(255,255,255)";
	}
	
	if(!this.canChangeColor){
		return "rgb(255,255,240)";
	}

	var red=Math.floor(10*Math.sqrt(this.velocityX*this.velocityX+this.velocityY*this.velocityY))+150;
	var green=Math.floor(10*this.velocityX*this.velocityX)+150;
	var blue=Math.floor(10*this.velocityY*this.velocityY)+150;

	if(red>255){
		red=255;
	}

	if(green>255){
		green=255;
	}

	if(blue>255){
		blue=255;
	}

	var color="rgb("+red+","+green+","+blue+")";


	return color;
}

Vertex.prototype.draw=function(context,originX,originY,radius,canvas){

	var theColor= this.getColor();

	var key=theColor+radius;

	/* use cached information */
	if(this.cacheCanvas && key in this.buffers){
		var buffer=this.buffers[key];
		context.drawImage(buffer,originX-2*radius+this.x,originY-2*radius+this.y);
		return;
	}

	var x=2*radius;
	var y=2*radius;

	if(!this.cacheCanvas){
		x=this.x-originX;
		y=this.y-originY;
	}

	var context2=context;
	if(this.cacheCanvas){
		var canvas2=document.createElement('canvas');
		canvas2.width=canvas.width;
		canvas2.height=canvas.height;

		context2=canvas2.getContext('2d');
	}

	context2.beginPath();
	context2.fillStyle = theColor;
	context2.strokeStyle = "rgb(0,0,0)";
	context2.arc(x,y,radius, 0, this.twopi, true);
	context2.fill();
	context2.stroke();
	context2.closePath();

	context2.fillStyle    = '#000000';
	context2.font         = 'bold 12px sans-serif';
	context2.fillText(this.name,x-6,y+6);

	if(this.cacheCanvas){
		this.buffers[key]=canvas2;

		this.draw(context,originX,originY,radius);
	}
}

Vertex.prototype.getX=function(){
	return this.x;
}

Vertex.prototype.getY=function(){
	return this.y;
}

Vertex.prototype.update=function(timeStep,timeState){
	if(!this.followMouse && timeState){
		this.x=this.x+this.velocityX*timeStep;
		this.y=this.y+this.velocityY*timeStep;
	}
}

Vertex.prototype.updateVelocity=function(timeStep,force,damping){

	this.velocityX=(this.velocityX + timeStep*force[0])*damping;
	this.velocityY=(this.velocityX + timeStep*force[1])*damping;

	this.updated=true;
}

Vertex.prototype.getArcs=function(){
	return this.arcs;
}

Vertex.prototype.addArc=function(vertex){

	if(this.getName()==vertex.getName()){
		return;
	}

	for(i in this.arcs){
		if(this.arcs[i].getName()==vertex.getName()){
			return;
		}
	}

	this.arcs.push(vertex);

	//this.printArcs();
}

Vertex.prototype.getName=function(){
	return this.name;
}

Vertex.prototype.printArcs=function(){
	console.log("Name "+this.getName());

	for(i in this.arcs){
		console.log(this.arcs[i].getName());
	}
}

Vertex.prototype.isInside=function(x,y,radius){

	var dx=x-this.x;
	var dy=y-this.y;
	
	return (dx*dx+dy*dy <= radius*radius);
}

Vertex.prototype.handleMouseDown=function(x,y,radius){

	if(this.isInside(x,y,radius)){
		//console.log(this.name+" follows");
		this.followMouse=true;

		return true;
	}

	return false;
}

Vertex.prototype.handleMouseUp=function(x,y){
	if(this.followMouse){
		this.followMouse=false;

		return true;
	}
	
	return false;
}

Vertex.prototype.handleMouseMove=function(x,y){
	if(this.followMouse && this.updated){
/*
		console.log("mouse "+x+" "+y);
		console.log("self "+this.x+" "+this.y);
		console.log("new velocity= "+(x-this.x)+" "+(y-this.y));
*/

		var velocityX=x-this.x;
		var velocityY=y-this.y;

		this.x=x;
		this.y=y;

		this.updated=false;

		return true;
	}

	return false;

}

Vertex.prototype.removeArc=function(vertex){
	var newArcs=new Array();

	for(i in this.arcs){
		var candidate=this.arcs[i];
		if(candidate.getName()!=vertex.getName()){
			newArcs.push(candidate);
		}
	}
	this.arcs=newArcs;
}
