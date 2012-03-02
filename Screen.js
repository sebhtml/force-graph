/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */



function Screen(){
	this.canvas=document.createElement("canvas");

	var body=document.getElementsByTagName("body")[0];
	var center=document.createElement("center");
	center.appendChild(this.canvas);

	body.appendChild(center);

	this.canvas.width=1500;
	this.canvas.height=800;

	/* Coulomb's law */
	this.charge=100;
	this.forceConstant=1;

	/* Hooke's law */
	this.springConstant=0.01;
	this.arcLength=80;

	/* velocity update */
	this.timeStep=1;
	this.damping=0.8;

	/* number of vertices */
	this.n=16;
	this.degree=2;

	this.createGraph();

	//this.printGraph();
}

Screen.prototype.printGraph=function(){
	for(i in this.vertices){
		this.vertices[i].printArcs();
	}
}

Screen.prototype.createVertex=function(name){
	var radium=20;
	var vertex=new Vertex(this.getRandomX(),this.getRandomY(),radium,name);

	this.vertices.push(vertex);

	return vertex;
}

Screen.prototype.createArcs=function(v1,v2){
	v1.addArc(v2);
	v2.addArc(v1);
}

Screen.prototype.createGraph=function(){
	this.vertices=new Array();

	var n=this.n;
	var degree=this.degree;


	var i=0;

	while(i<n){
		var vertex=this.createVertex("v"+i);

		i++;
	}

	i=0;


	while(i<n){
		var j=0;
		while(j<degree){

			var next=Math.floor(Math.random()*n);

			if(next==i){
				continue;
			}

			this.createArcs(this.vertices[i],this.vertices[next]);

			j++;
		}
		i++;
	}

}

Screen.prototype.iterate=function(){
	
	this.applyForces();

	this.draw();
}

Screen.prototype.draw=function(){

	this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height);
	
	var context=this.canvas.getContext("2d");

	// move objects
	for(i in this.vertices){
		var vertex=this.vertices[i];
		vertex.update(this.timeStep);
	}

	// draw arcs
	for(i in this.vertices){
		var vertex=this.vertices[i];

		var arcs=vertex.getArcs();
		for(j in arcs){

			var vertex2=arcs[j];
	
			context.moveTo(vertex.getX(),vertex.getY());
			context.lineTo(vertex2.getX(),vertex2.getY());
			context.stroke();
		}
	}

	// draw vertices
	for(i in this.vertices){
		var vertex=this.vertices[i];
		vertex.update(this.timeStep);
		vertex.draw(this.canvas);
	}
}

/**
 * \see http://en.wikipedia.org/wiki/Force-based_algorithms_(graph_drawing)
 */
Screen.prototype.applyForces=function(){

	for(i in this.vertices){
		var force=[0,0];

		var vertex1=this.vertices[i];
		for(j in this.vertices){
			if(i==j){
				continue;
			}

			var vertex2=this.vertices[j];

			var force2=this.getRepulsionForce(vertex1,vertex2);

			force=this.addForces(force,force2);
		}

		var arcs=vertex1.getArcs();

		for(j in arcs){

			var vertex2=arcs[j];

			var force2=this.getAttractionForce(vertex1,vertex2);


			force=this.addForces(force,force2);
		}

		vertex1.updateVelocity(this.timeStep,force,this.damping);
	}

}

/**
 * \see http://en.wikipedia.org/wiki/Hooke%27s_law
 */
Screen.prototype.getAttractionForce=function(vertex1,vertex2){


	var dx=vertex2.getX()-vertex1.getX();
	var dy=vertex2.getY()-vertex1.getY();

	var distance=Math.sqrt(dx*dx+dy*dy);

	var displacement=distance-this.arcLength;


	var force=this.springConstant*displacement;

	// get a unit vector 
	dx=dx/distance;
	dy=dy/distance;


	dx=dx*force;
	dy=dy*force;

	return [dx,dy];
}

/**
 * \see http://en.wikipedia.org/wiki/Coulomb's_law
 */
Screen.prototype.getRepulsionForce=function(vertex1,vertex2){

	var dx=(vertex1.getX() - vertex2.getX());
	var dy=(vertex1.getY() - vertex2.getY());
	
	var length=Math.sqrt(dx*dx+dy*dy);

	dx=dx/length;
	dy=dy/length;

	var charge1=this.charge;
	var charge2=this.charge;
	var force=(this.forceConstant*charge1*charge2)/(length*length);

	dx=dx*force;
	dy=dy*force;

	return [dx,dy];
}



Screen.prototype.addForces=function(force,force2){
	return [force[0]+force2[0], force[1]+force2[1]]
}

Screen.prototype.getRandomX=function(){
	return Math.random()*(this.canvas.width-1);
}

Screen.prototype.getRandomY=function(){
	return Math.random()*(this.canvas.height-1);
}

