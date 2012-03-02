/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

function Button(x,y,width,height,name,defaultState){
	this.x=x;
	this.y=y;
	this.name=name;
	this.width=width;
	this.height=height;

	this.state=defaultState;

	this.x1=x-width/2;
	this.y1=y-height/2;
	this.x2=x+width/2;
	this.y2=y-height/2;
	this.x3=x+width/2;
	this.y3=y+height/2;
	this.x4=x-width/2;
	this.y4=y+height/2;
}

Button.prototype.handleMouseDown=function(x,y){
	if(!(x>=this.x1 && x<= this.x2 && y >= this.y1 && y <= this.y4)){
		return false;
	}

	//console.log("handleMouseClick");
	this.state=!this.state;
	
	return true;
}

Button.prototype.getState=function(){
	return this.state;
}

Button.prototype.draw=function(context){
	context.fillStyle = "rgb(220,220,220)";
	context.strokeStyle = "rgb(0,0,0)";

	if(this.state){
		context.fillStyle = "rgb(200,250,200)";
	}

	context.beginPath();
	context.moveTo(this.x1,this.y1);
	context.lineTo(this.x2,this.y2);
	context.lineTo(this.x3,this.y3);
	context.lineTo(this.x4,this.y4);
	context.lineTo(this.x1,this.y1);
	context.fill();
	context.stroke();
	context.closePath();

	context.fillStyle    = '#000000';
	context.font         = 'bold 12px sans-serif';
	context.fillText(this.name, this.x-(this.width/2)*0.7, this.y+6);

}

Button.prototype.resetState=function(){
	this.state=false;
}

Button.prototype.activateState=function(){
	this.state=true;
}
