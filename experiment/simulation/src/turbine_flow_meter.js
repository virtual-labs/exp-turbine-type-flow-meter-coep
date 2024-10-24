function turbineFlowMeter(){
var w = 1000;
var h = 800;

var width = $(window).width();

if ($(window).width() < 500) {
	width = $(this).width();
	paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
	paper.setViewBox(0, 0, w, h, true);
	paper.setSize('100%', '100%');
} else{
	paper = new Raphael(document.getElementById('canvas-div'), '85%', '95%');
	paper.setViewBox(0, 0, w, h, true);
	paper.setSize('85%', '95%');
}

//$("#canvas-div").html('');
// paper = new Raphael(document.getElementById('canvas-div'));
//if ($(window).width() < 600) {
//		width = $(this).width();
//
//		paper.setViewBox(0, 0, w, h, true);
//		paper.setSize('90%', '90%');
//	} else {
//
//		paper.setViewBox(0, 0, w, h, true);
//		paper.setSize('90%', '90%');
//	}


 x = 150;
 y = 50;
 
 
 
// $('#canvas-div').removeAttr('width');
// $('#canvas-div').removeAttr('height');
// $("#canvas-div").css("width","1000px");
//	$("#canvas-div").css("height","1000px");
 	paper.path('M'+(x)+' '+(y+50)+ 'l 0 520').attr({'stroke':'black', 'stroke-width':'1'});
 	paper.path('M'+(x)+' '+(y+50)+ 'l 100 0').attr({'stroke':'black', 'stroke-width':'1'});
 	paper.path('M'+(x)+' '+(y+80)+ 'l 10 10 l -10 -10 l -10 10 z').attr({'stroke':'black', 'stroke-width':'1'});
 	paper.path('M'+(x)+' '+(y+300)+ 'l 10 10 l -10 -10 l -10 10 z').attr({'stroke':'black', 'stroke-width':'1'});
 	
    paper.path('M'+(x+250)+' '+(y+50)+ 'l 100 0').attr({'stroke':'black', 'stroke-width':'1'});
  	
  	paper.path('M'+(x+450)+' '+(y+50)+'l 100 0 l 0 50 l 10 -10 l -10 10 l -10 -10 l 10 10').attr({'stroke':'black', 'stroke-width':'1'});
  	
  	 window.onload = function()  {
	 
	var lt_txtLabel = paper.text(x+680,y+430, "Level Transmitter").attr({'font-size': 20});
	var wt_txtLabel = paper.text(x+720,y+300, "Weight Transmitter").attr({'font-size': 20});
	
		var tank1 = tank(x,y);
		var tank2 = tank(x,y+310);
		Terbine_flow_Meter(x-50,y);
		Magnetic_flow_Meter(x,y);
		conection_WT(x,y);
		drain_valve(x,y-40);
		pump_control(x,y);
	}
	
  function tank(x,y){
  	paper.path('M'+(x+525)+' '+(y+100)+ 'l 50 0 l 0 30 l 40 30 l 0 150 l -130 0 l 0 -150 l 40 -30 z').attr({'stroke':'black', 'stroke-width':'3'});}
  	
  		function Terbine_flow_Meter(x,y){
	paper.rect(x+150, y, 150, 100).attr({ 'stroke-width':'1'}).toFront();
	paper.circle(x+230, y-30, 10);
//	paper.path('M'+(x+200)+' y l 0 30').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+230)+' '+(y-20)+ 'l  0 20').attr({'stroke':'black', 'stroke-width':'1'});
	var ellipse1 = paper.ellipse(x+230 , y+30 ,5 ,10);
	var ellipse2 = paper.ellipse(x+230 , y+50 ,5 ,10);
	paper.path('M'+(x+200)+' '+(y+40)+ 'l  60 0').attr({'stroke':'black', 'stroke-width':'1'});
	var text_terbine = paper.text(x+230,y+150, "Meter").attr({'font-size': 20});
	var text_terbine = paper.text(x+230,y+120, "Turbine Flow").attr({'font-size': 20});
	
}
	function Magnetic_flow_Meter(x,y){
 	paper.rect(x+350, y, 100, 100).attr({ 'stroke-width':'1',}).toFront();
	paper.circle(x+400, y-30, 10);
	paper.path('M'+(x+400)+' '+(y-20)+ 'l  0 20').attr({'stroke':'black', 'stroke-width':'1'});
	var text_M = paper.text(x+400,y+40, "M").attr({'font-size': 30}); 
	var text_Magne = paper.text(x+370,y+150, "Meter").attr({'font-size': 20});
	var text_Magne = paper.text(x+370,y+120, "Magnetic Flow").attr({'font-size': 20});
	
	}
		function conection_WT(x,y){
	  	paper.path('M'+(x+590)+' '+(y+310)+ 'l 0 40 l 50 0').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.circle(x+660, y+350, 20);
		paper.circle(x+700, y+350, 5).attr({'fill':'black'});
	  	var text_M = paper.text(x+660,y+350, "WT").attr({'font-size': 15});
	  	paper.path('M'+(x+545)+' '+(y+310)+ 'l 0 30 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+530)+' '+(y+340)+ 'l 30 0 l -30 20 l 30 0 z ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+545)+' '+(y+350)+ 'l 20 0 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.rect(x+565, y+343, 5, 15).attr({ 'stroke-width':'1','fill':'black'}).toFront();
	  	paper.path('M'+(x+545)+' '+(y+360)+ 'l 0 50 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+545)+' '+(y+385)+ 'l 10 -10 l -10 10 l -10 -10 z ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.circle(x+615, y+380, 20);
	  	var text_M = paper.text(x+615,y+380, "LT").attr({'font-size': 15});
//	  	paper.path('M'+(x+555)+' '+(y+415)+ 'l 20 20 ').attr({'stroke':'black', 'stroke-width':'1'});
//	  	paper.path('M'+(x+555)+' '+(y+435)+ 'l 20 -20 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+597)+' '+(y+380)+ 'l -35 0 l 0 30 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	
	  
	  	
	  	
	  	}
	  	
	  	function drain_valve(x,y){
	  	paper.path('M'+(x+545)+' '+(y+660)+ 'l 0 50 l 80 0 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+600)+' '+(y+710)+ 'l -10 -10 l 10 10 l -10 10 l 10 -10').attr({'stroke':'black', 'stroke-width':'1'});
	 	var outlet = paper.path('M'+(x+625)+' '+(y+695)+ 'l 0 30 l 30 -30 l 0 30z ').attr({'stroke':'black', 'stroke-width':'1'});
//	 	  outlet.animate({ 'cx': 100, 'cy': 90, 'fill': 'red' });
//	  	paper.path('M'+(x+665)+' '+(y+685)+ 'l 0 50 ').attr({'stroke':'black', 'stroke-width':'1'});
//	  	paper.path('M'+(x+625)+' '+(y+685)+ 'l 0 50 ').attr({'stroke':'black', 'stroke-width':'1'});
//	  	paper.circle(x+645, y+710, 20);
	  	paper.rect(x+632, y+685, 15, 5).attr({ 'stroke-width':'1','fill':'black'}).toFront();
		paper.path('M'+(x+655)+' '+(y+710)+ 'l 50 0 ').attr({'stroke':'black', 'stroke-width':'1'});
		paper.path('M'+(x+640)+' '+(y+688)+ 'l  0 20 ').attr({'stroke':'black', 'stroke-width':'1'});
		var drain_text = paper.text(x+600,y+750, "Drain Valve").attr({'font-size': 20});
	  	}
	  	
	  		
	
	  	  
	  	 function pump_control(x,y){
	  	 paper.circle(x+250, y+600, 30);
	  	paper.circle(x+250, y+600, 1);
//	  	paper.circle(x+250, y+600, 10).attr({'stroke':'red', 'stroke-width':'1','fill':'red'});
	  	paper.path('M'+(x+270)+' '+(y+620)+ 'l 20 20  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+230)+' '+(y+620)+ 'l -20 20  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+210)+' '+(y+640)+ 'l 80 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+150)+' '+(y+570)+ 'l 10 10 l -10 -10 l 10 -10 z  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+250)+' '+(y+600)+ 'l 83 0 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+300)+' '+(y+600)+ 'l 10 10 l -10 -10 l 10 -10 z  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+400)+' '+(y+600)+ 'l 10 10 l -10 -10 l 10 -10 z  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+335)+' '+(y+585)+ 'l 0 30 l 30 -30 l 0 30z ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+350)+' '+(y+570)+ 'l 0 30').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.rect(x+343, y+565, 15, 5).attr({ 'stroke-width':'1','fill':'black'}).toFront();
	  	paper.path('M'+(x+365)+' '+(y+600)+ 'l 120 0 ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+250)+' '+(y+520)+ 'l 0 50  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.circle(x+250, y+490, 30);
	  	var text_M = paper.text(x+250,y+490, "VFD").attr({'font-size': 15});
	    paper.path('M'+(x+250)+' '+(y+570)+ 'l -250 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	    paper.path('M'+(x+250)+' '+(y+430)+ 'l 0 20  ').attr({'stroke':'black', 'stroke-width':'1'});
	    paper.path('M'+(x+250)+' '+(y+450)+ 'l -10 -10  l 10 10 l 10 -10 l -10 10  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+250)+' '+(y+400)+ 'l 0 20  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+250)+' '+(y+360)+ 'l 0 20  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.path('M'+(x+250)+' '+(y+320)+ 'l 0 20  ').attr({'stroke':'black', 'stroke-width':'1'});
	  	paper.rect(x+225, y+260, 50, 50).attr({ 'stroke-width':'1',}).toFront();
	  	paper.path('M'+(x+225)+' '+(y+282)+ 'l 22 -22 l 26 22 l -25 25 z').attr({'stroke':'black', 'stroke-width':'1'});
	  	var pump_text = paper.text(x+250,y+700, "Pump").attr({'font-size': 20});
	  	var control_text = paper.text(x+400,y+700, "Control Valve").attr({'font-size': 20});
	  	var text_VPLC = paper.text(x+250,y+230, "VPLC").attr({'font-size': 20});
	  	}
}  		