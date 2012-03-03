/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

function Blit(x,y,width,height,canvas){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.canvas=canvas;
}

Blit.prototype.getX=function(){
	return this.x;
}

Blit.prototype.getY=function(){
	return this.y;
}

Blit.prototype.getWidth=function(){
	return this.width;
}

Blit.prototype.getHeight=function(){
	return this.height;
}

Blit.prototype.getCanvas=function(){
	return this.canvas;
}

Blit.prototype.print=function(){
	console.log("x "+this.x+" y "+this.y+" width "+this.width+" height "+this.height," canvas "+this.canvas.width+" "+this.canvas.height);
}
