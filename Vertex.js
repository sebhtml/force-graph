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
}

Vertex.prototype.draw=function(canvas){

	var context=canvas.getContext("2d");

	context.fillStyle = "rgb(128,229,150)";
	context.strokeStyle = "rgb(0,0,0)";
	context.beginPath();
	context.arc(this.x,this.y, this.radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	context.stroke();

	context.fillStyle    = '#000000';
	context.font         = 'bold 12px sans-serif';
	context.fillText(this.name, this.x-6, this.y+6);
}

Vertex.prototype.getX=function(){
	return this.x;
}

Vertex.prototype.getY=function(){
	return this.y;
}

Vertex.prototype.update=function(timeStep){
	this.x=this.x+this.velocityX*timeStep;
	this.y=this.y+this.velocityY*timeStep;
}

Vertex.prototype.updateVelocity=function(timeStep,force,damping){
	this.velocityX=(this.velocityX + timeStep*force[0])*damping;
	this.velocityY=(this.velocityX + timeStep*force[1])*damping;
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
