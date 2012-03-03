/* yet another force-directed graph viewer */
/* the code is GPL */
/* author: Sébastien Boisvert */

function Grid(step){

	this.cells=new Object();
	this.step=step;

	this.keyCells=new Object();
}

Grid.prototype.removeEntry=function(key){
	
	if(!(key in this.keyCells)){
		return;
	}

	var cells=this.keyCells[key];

	for(i in cells){
		delete cells[i][key];
	}

	this.keyCells[key]=new Array();
}

Grid.prototype.addEntry=function(key,centerX,centerY,width,height){

	//console.log("addEntry "+key+" "+centerX+" "+centerY+" "+width+" "+height);

	var cells=this.getCells(centerX,centerY,width,height);
	var keyCells=new Array();

	//console.log(cells.length+" cells to process");
	for(i in cells){
		var cell=cells[i];
		cell[key]=4096;

		//console.log("Added "+key);
		keyCells.push(cell);
	}

	this.keyCells[key]=keyCells;
}

Grid.prototype.getEntries=function(centerX,centerY,width,height){


	var cells2=this.getCells(centerX,centerY,width,height);
	var entries=new Object();

	//console.log(cells.length+" cells to scan");

	var i=0;

	//console.log(cells2);

	while(i<cells2.length){
		var cell=cells2[i];
		for(key in cell){
			if(!(key in entries) && cell.hasOwnProperty(key) && cell[key]==4096){
				entries[key]=1;

				//console.log("Fetched from cell: "+key+" value= "+cell[key]);
			}
		}

		i++;
	}

	//console.log("Got "+added+" hits");

	var value=new Array();

	for(i in entries){
		value.push(i);
	}

	return value;
}

Grid.prototype.getCells=function(centerX,centerY,width,height){

	//console.log("getCells"+" "+centerX+" "+centerY+" "+width+" "+height);

	var minX=Math.floor(centerX-width/2);
	minX=minX - minX%this.step;
	var maxX=Math.floor(centerX+width/2);
	maxX=maxX- maxX%this.step+this.step;
	var minY=Math.floor(centerY-height/2);
	minY=minY - minY%this.step;
	var maxY=Math.floor(centerY+height/2);
	maxY=maxY - maxY%this.step+this.step;
	
	var cells=new Array();

	//console.log("Range "+minX+" "+maxX+" "+minY+" "+maxY);

	var i=minX;
	while(i<=maxX){
		var j=minY;

		if(!(i in this.cells)){
			this.cells[i]=new Object();
		}

		while(j<=maxY){
			
			if(!(j in this.cells[i])){
				this.cells[i][j]=new Object();
			}

			var cell=this.cells[i][j];

			cells.push(cell);

			j+=this.step;
		}

		i+=this.step;
	}

	return cells;
}
