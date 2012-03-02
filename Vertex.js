/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

function Vertex(x,y,radius,name){
	this.x=x;
	this.y=y;
	this.name=name;

	this.radius=radius;

	this.velocityX=0;
	this.velocityY=0;

	this.arcs=new Array();

	this.followMouse=false;

	this.updated=false;
}

Vertex.prototype.getColor=function(){

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

	if(this.followMouse){
		color = "rgb(255,255,255)";
	}
	
	return color;
}

Vertex.prototype.draw=function(context,originX,originY){

	context.fillStyle = this.getColor();

	
	context.strokeStyle = "rgb(0,0,0)";

	context.beginPath();

	context.arc(this.x-originX,this.y-originY, this.radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	context.stroke();

	context.fillStyle    = '#000000';
	context.font         = 'bold 12px sans-serif';
	context.fillText(this.name, this.x-originX-6, this.y-originY+6);
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

Vertex.prototype.handleMouseDown=function(x,y){
	
	var dx=x-this.x;
	var dy=y-this.y;

	if(dx*dx+dy*dy <= this.radius*this.radius){
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
