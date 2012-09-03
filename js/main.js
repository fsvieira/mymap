function bw_data(imgd){
	var pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
		// var grayscale = pix[i] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
		var grayscale = (pix[i]+ pix[i+1]+ pix[i+2])/3;
		pix[i  ] = grayscale;   // red
		pix[i+1] = grayscale;   // green
		pix[i+2] = grayscale;   // blue
		// pix[i+3] = grayscale; // alpha
	}
};

function getPosition(e) {

			//this section is from http://www.quirksmode.org/js/events_properties.html
			var targ;
			if(!e){
				e = window.event;
			}
			
			if(e.target){
				targ = e.target;
			}else if (e.srcElement){
				targ = e.srcElement;
			}
				
			if (targ.nodeType == 3){ // defeat Safari bug
				targ = targ.parentNode;
			}

			// jQuery normalizes the pageX and pageY
			// pageX,Y are the mouse positions relative to the document
			// offset() returns the position of the element relative to the document
			x = e.pageX - $(targ).offset().left;
			y = e.pageY - $(targ).offset().top;
			
			return {'x': x, 'y': y}; 
};

$(document).ready(function(){
	var project = new Project(); 
	var ui = new UI_MapEditor(project, {}); 
});	


		
