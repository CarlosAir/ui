function SimpleTacho(){}

function pad1k(num) {
    var s = "0000" + num;
    return s.substr(s.length-4);
}

SimpleTacho.prototype.initialize = function(){
	this.canvas = $('<canvas></canvas>').appendTo(this.rootElement);
        
	this.canvas.width = 200;
	this.canvas.height = 65;

    this.loaded = false;
};

SimpleTacho.prototype.update = function(streams){
        
    //Get the values to work with, do rounding and stuff as needed
    rpm = Math.round(streams["engineInfo"][4]);
    rpmMax = streams["engineInfo"][1];
    rpmIdle = streams["engineInfo"][0];
    
    //start canvas stuff
    c = this.canvas[0];
	ctx = c.getContext('2d');
        
    //clear before drawing stuff on canvas
    ctx.clearRect(0,0,200,65);
        
    //work out what colour do do bar in TODO: Cleaner way of doing this?
    var rgba='RGBA';
    
    if(rpm < rpmIdle*1.25) {        //we are at idle, blue
        rgba+='(0,0,128,0.5)';
    } else if(rpm > rpmMax*0.9) {   //we are near redline, red
        rgba+='(128,0,0,0.5)';
    } else {                        //normal rpm, green
        rgba+='(0,128,0,0.5)';
    }
        
    ctx.fillStyle = rgba;
        
    //Make the bar
    ctx.fillRect(20,10,rpm/(rpmMax/160),25);
    
    //setup text
    ctx.font='20px "Lucida Console", Monaco, monospace';
    ctx.textAlign="center";
    
    //Add RPM value to bar
    ctx.fillStyle = "black";
    ctx.fillText(pad1k(rpm),100,30);
    
    //add border
    ctx.strokeRect(20,10,160,25);    
    
    //Add min/max values, label
    ctx.font='10px "Lucida Console", Monaco, monospace';
    ctx.fillText("0000",20,48);
    ctx.fillText(rpmMax,180,48);
    ctx.fillText("RPM",100,58);
    
};