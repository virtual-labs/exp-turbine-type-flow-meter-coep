var flag = true;
var startLabel="";
var startImg="";
var fg = 0;
var flg = 0;
var animationStart=0;
var animationEnd=0;
var arrayJsonAnimation=[];
var masterJsonAnimation={};

function animateSimulation(  BladeShape,  pipeSize, noBlades,  time2,  materialType,  fluidType, supplierConstaint) {

//	$('#canvas-div').removeProp('width');
//	
//	$('#canvas-div').removeProp("height");
	$("#animateSimulation"). attr("disabled", true); 
	
	var w = 900;
	var h = 700;

	var width = $(window).width();

	if ($(window).width() < 500) {
		width = $(this).width();
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	} else{
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	}
	
//		paper = new Raphael(document.getElementById('canvas-div'), 900, 800);

	
     startImg = paper.image("images/start.png", 80, 50, 60, 60).attr({	"clip-rect" : "80,50,60,60"});
     startLabel=paper.text(105,30,'Start Process').attr({"font-size":20,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
	
	 stopImg = paper.image("images/stop1.png", 225, 45, 71, 71).attr({"clip-rect" : "225,45,71,71"});
	 stopLabel=paper.text(250,30,'Stop Process').attr({"font-size":20,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
	  
	var x1=10;
	var y1=200;
	var type=BladeShape;
	var blades=noBlades;
	var time=time2;
    var pipeSize;
	var materialType;
	var color1=fluidType;
	var unitCounter = 0;
	var counter = 0;
	var supplierConstaint1=supplierConstaint;

	console.log("BladeShape "+type);
	console.log("blades "+blades);
	var b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14;
	
		meterDesign();

	

	if (type==1 && blades==2) {	
		type1_b2();	
			
	}else if(type==1 && blades==4){
		type1_b4();	
			  
	}else if(type==1 && blades==6){
		type1_b6();
		
	}else if(type==2 && blades==2 ){
		type2_b2();
		
	}else if(type==2 && blades==4){
		type2_b4();
		
	}else if(type==2 && blades==6){
		type2_b6();
		 
	}else if(type==3 && blades==2){
		type3_b2();
		 
	}else if(type==3 && blades==4){
		type3_b4();
			
	}else if(type==3 && blades==6 ){
		type3_b6();
		
	}else if(type==4 && blades==2 ){
		type4_b2();
		
	}else if(type==4 && blades==4){
		type4_b4();
		
	}else if(type==4 && blades==6){
		type4_b6();
	}else if(type==5 && blades==2){
//		console.log("initial11");
		type5_b2();
	}else if(type==5 && blades==4){
		type5_b4();
	}
 var simuli = 0;
	
	
	
	function meterDesign (){
		var pipe = paper.rect(x1+100, y1+148, 500, 135) .attr({'stroke' : '#000' , 'stroke-width' : 5 });
		
		var btm_line = paper.path("M "+(x1+100)+" "+(y1+286)+" l 0 20 l 155 0 l 0 20 l 20 0 l 0 -10 l 150 0 l 0 10 l 20 0 l 0 -20 l 155 0 l 0 -20 z").attr({'stroke' : '#000' , 'stroke-width' : 4 , "fill":"#d5dcde"});
		 
		var top_line = paper.path(" M "+(x1+100)+" "+(y1+145)+" l 0 -20 l 154 0 l 0 -10 l 29 0 l 0 -10 l -10 0 l 0 -15 l 20 0 l 0 -10 l -20 0 l 0 -15 l 28 0 l 0 -20 "
		 +" l -12 0 l -15 -15 l 0 -38"
		 +" l 152 0"
		 +" l 0 38 l -15 15 l -12 0 l 0 20 l 28 0 l 0 15 l -20 0 l 0 10 l 20 0 l 0 15 l -10 0 l 0 10 l 29 0 l 0 10 l 154 0 l 0 20 z"
		 ).attr({'stroke' : '#000' , 'stroke-width' : 4 , "fill":"#d5dcde"});
		 
		var temp_rec = paper.rect(x1+310,y1+28,80,120).attr({"fill":"#acb5c2"});
		var sen_housing = paper.path("M "+(x1+305)+" "+(y1+148)+"l 0 -120 l 5 0 l 0 120 M "+(x1+390)+" "+(y1+150)+" l 0 -120 l 5 0 l 0 120 ").attr({'stroke' : '#000' , 'stroke-width' : 3 , "fill":"#63625f"});
		var sen_r1 = paper.rect(x1+290,y1+20,120,10).attr({'stroke' : '#000' , 'stroke-width' : 3 , "fill":"#f0e1d5"});
		var sen_r2 = paper.rect(x1+300,y1,100,20).attr({'stroke' : '#000' , 'stroke-width' : 3 , "fill":"#acb5c2"});
		 
		var arc = paper.path(" M "+(x1+357)+" "+(y1+20)+" "+"  A 55 108 2 0 0 "+(x1+325)+" "+(y1-115)+" M "+ (x1+343)+" "+(y1+20)+"  A 55 108 2 0 0 "+(x1+317)+" "+(y1-103)
		                           ).attr({'stroke' : '#000' , 'stroke-width' : 3});
	
	
		                           

  }
  
 var st = 1; 
 startImg.click(function() {
	 flg = 0;
		console.log("hiii ");
		if(st == 1){
		start();
		st++;
		}else{
			alert("Animation in process first click stop...");
		}
//					console.log("hiii ");
//					start();
//					fg=0;

			});


  function start(){
	  flg = 0;
	  $("#nextLevelMimc"). attr("disabled", true);
	  animationStart++;
//		animateSimulation(  BladeShape,  pipeSize, noBlades,  time1,  materialType,  fluidType) ;
	  
	  
	fg = 1;
		var circle,circle1;
		
		//Fluid Flow
		var cnt = 0;
		counter = 0;
		simuli=1;
		clearInterval(counter);
//		cnt = 0;
		
		
//		var color1= fluidType;
		var arr = [];	
		arr[0]=paper.path('M' +(x1+100)+ ' ' +(y1+215)+ 'l 20 0 ').attr({'stroke': color1,'stroke-width':130, 'stroke-opacity': 0.4});
		arr[0].animate({path :'M' +(x1+100)+ ' ' +(y1+215)+ 'l 241 0 '},time, function(){
		arr[1]=paper.path('M' +(x1+341)+ ' ' +(y1+215)+ 'l 0 0 ').attr({'stroke': color1,'stroke-width':130, 'stroke-opacity': 0.4});
		arr[1].animate({path :'M' +(x1+341)+ ' ' +(y1+215)+ 'l 259 0 '},time, function(){
		});
		
		keepRotating = Raphael.animation({ 'transform': 'r360' }, time ).repeat( 'Infinity' );
		
		function generateCircles2() {
			setTimeout(function() {
				totalDelay += 1;
				var yPos = y1 + Math.floor(Math.random() * (30 - 1 + 1) + 1);
				var size = Math.floor(Math.random() * (2 - 1 + 1) + 1);
				circle = paper.circle((x1 + 100), 170 + yPos, size);
				circle.attr('fill', "color");
				if (simuli == 1) {
					cirAni = Raphael.animation({ cy: 170 + yPos, cx: x1 + 600 }, time, generateCircles3());
					circle.animate(cirAni.delay(100));
				}
			}, 150);
		}

		function generateCircles3() {
			setTimeout(function() {
				var yPos = y1 + Math.floor(Math.random() * (30 - 1 + 1) + 1);
				var size = Math.floor(Math.random() * (2 - 1 + 1) + 1);
				circle1 = paper.circle((x1 + 100), 235 + yPos, size);
				circle1.attr("fill", "color");
				if (simuli == 1) {
					cirAni1 = Raphael.animation({ cx: x1 + 600, cy: yPos + 240 }, time, generateCircles2());
					circle1.animate(cirAni1.delay(100));
				}
			}, 150);
		}

	generateCircles2();




	var totalDelay = 0;
			
			if(type == 1 && blades == 2)
			{
					b1.animate(keepRotating);
					pluseUnit(2);
			}
			else if(type == 1 && blades == 4)
			{
				b2.animate(keepRotating);
				pluseUnit(4);
			}
			else if(type == 1 && blades == 6)
			{
				b3.animate(keepRotating);
				pluseUnit(6);
			}
			else if(type == 2 && blades == 2)
			{
				b4.animate(keepRotating);
				pluseUnit(2);
			}
			else if(type == 2 && blades == 4)
			{
				b5.animate(keepRotating);
				pluseUnit(4);
			}
			else if(type == 2 && blades == 6)
			{
				b6.animate(keepRotating);
				pluseUnit(6);
			}
			else if(type == 3 && blades == 2)
			{
				b7.animate(keepRotating);
				pluseUnit(2);
			}
			else if(type == 3 && blades == 4)
			{
				b8.animate(keepRotating);
				pluseUnit(4);
				
			}else if(type == 3 && blades == 6)
			{
				b9.animate(keepRotating);
				pluseUnit(6);
			}
			else if(type == 4 && blades == 2)
			{
			  	b10.animate(keepRotating);
			  	pluseUnit(2);
			}
			else if(type == 4 && blades == 4)
			{
			  	b11.animate(keepRotating);
			  	pluseUnit(4);
			}
			else if(type == 4 && blades == 6)
			{
			  	b12.animate(keepRotating);
			 	pluseUnit(6);	
			}
			else if(type == 5 && blades == 2)
			{
				
			  	b13.animate(keepRotating);
			 	pluseUnit(2);
			 	
			}else if(type == 5 && blades == 4)
			{
			  	b14.animate(keepRotating);
			 	pluseUnit(4);
			}
			});
			
				var pulse=paper.rect(520,190,100,60).attr({"stroke-width": 2,"font-size":25,"font-weight":"bold"});
				var n1=paper.text((x+420),(y+120),'PULSE').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				paper.text((x+410),(y+100),'Instantaneous Flow').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
//				var t1=paper.text(623,218,'0').attr({"font-size":25,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 30});
				var unit1=paper.rect(700,190,80,60).attr({"stroke-width": 2,"font-size":25,"font-weight":"bold"});
				var unit2=paper.rect(710,200,60,40).attr({"stroke-width": 2,"font-size":25,"font-weight":"bold","fill":"#000"});
				paper.text((x+595),(y+120),'UNIT').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				paper.text((x+580),(y+100),'Totalise Flow').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				var unitno=paper.text(740,218,'0').attr({"font-size":25,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 30});
				var r1=paper.rect(530,200,80,40).attr({"fill": "#000", "stroke-border":2,"stroke-width": 3});
                var t1=paper.text(570,218,'0').attr({"font-size":25,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 30});
//Pluse Calculation
function pluseUnit(noBlades)
		{
			tempJson={};
//			JsonArr = [];
								  tempJson.ActualanimationStart=animationStart;
								  tempJson.ExpectedanimationEnd=animationEnd;
								 JsonArr.push(tempJson);
//								 	 masterJson.demo = JsonArr;
								 	mainJson.animation=tempJson;
//								 	console.log(masterJson); 
//								 	console.log(masterJson);
			counter=0;
			unitCounter=0;
			myTimer = setInterval(function(){
				if(counter==supplierConstaint1){
					counter=0;
					unitCounter++;
					unitno.attr('text',unitCounter);
					//console.log(" Units ="+unitCounter);
				}
				counter++;
				t1.attr('text',counter);
//				console.log(" Counter= "+counter);
			},time/noBlades);
		}
//		function pluseUnit(noBlades)
//		{
//			
//			counter = 0;
//			var myTimer=setInterval(function(){
//				if(counter==supplierConstaint)
//				{
//					counter = 0;
//					unitCounter++;
//					unitno.attr('text',unitCounter);
//					console.log(" unit pulses "+unitCounter);
//				}counter++;
//				t1.attr('text',counter);
//				console.log(" counter pulses "+counter);
//		
//				
//			},time/noBlades);
//			
//		}
		stopImg.click(function() {
			flg = 1;
		    counter=0;
		   unitcounter = 0;
		      $("#nextLevelMimc").prop("disabled",false);
			$("#nextLevelMimc"). attr("disabled", false);
			clearInterval(myTimer);
					stop();
//					animationEnd++;
//					TempJsonAnimation= {};
//					
//					TempJsonAnimation.animationEnd = animationEnd;
//				
//					arrayJsonAnimation.push(TempJsonAnimation);
//					masterJsonAnimation.demo = arrayJsonAnimation;
//					console.log(masterJsonAnimation);
				});
		
}
	
	
	
//FIRST DESIGN BLADES    
		
		 //2 blades
		  
		 function type1_b2(x,y,t)
		 {
			 	var x= x1+150;
			 	var y=y1+165;
			 	b1 = paper.path('M'+(x+191)+' '+(y+39)+' l 0 -47 l 20 0 l 0 47    M '+(x+190)+' '+(y+61)+' l 0 47 l 20 0 l 0 -47      M'+(x+198)+' '+(y-5)+' l 5 1  l-5 1  l 5 1 l -5 0   M '+(x+198)+' '+(y+101)+' l 5 1 l -5 1 l 5 1 l -5 0').attr({'fill':'#e8e7e3','stroke':'black', 'stroke-width':'2'});
			 	paper.circle(x+200, y+50, 15).attr({'stroke':'black', 'stroke-width':'2','fill':'#abc'});
			 	paper.circle(x+200, y+50, 10).attr({'fill' :'#0a0302', "stroke-opacity": "0.4"});
		 }


		 //4 blades
		 function type1_b4(x,y,t)
		 {
			var x= x1-150;
			var y=y1+165;
		    b2 = paper.path('M'+(x+490)+' '+(y+39)+' l 0 -47 l 20 0 l 0 47    M'+(x+490)+' '+(y+61)+'l 0 47 l 20 0 l 0 -47   M'+(x+497)+' '+(y-5)+' l 5 1  l-5 1  l 5 1 l -5 0    M '+(x+497)+' '+(y+101)+' l 5 1 l -5 1 l 5 1 l -5 0'
		    				   +'M'+(x+511)+' '+(y+40)+' l 47 0 l 0 20 l -47 0    M'+(x+489)+' '+(y+40)+'l -47 0 l 0 20 l 47 0   M'+(x+551 )+' '+(y+47)+' l 1 5  l 1 -5 l 1 5 l 0 -5  M '+(x+445)+' '+(y+47)+' l 1 5 l 1 -5 l 1 5 l 0 -5 ').attr({'fill':'#e8e7e3','stroke':'black', 'stroke-width':'2'});
		 	paper.circle(x+500, y+50, 15).attr({'stroke':'black', 'stroke-width':'2','fill':'#abc'});
		 	paper.circle(x+500, y+50, 10).attr({'fill' :'#0a0302'});

		 }

		//6 blades 
		 function type1_b6(x,y,t)
		  { 
			var x= x1-450;
			var y=y1+165;	
		    b3 = paper.path('M'+(x+793)+' '+(y+36)+' l 0 -45 l 15 0 l 0 45         M '+(x+793)+' '+(y+63)+' l 0 46 l 15 0 l 0 -46       M'+(x+798)+' '+(y-5)+' l 5 1  l-5 1  l 5 1 l -5 0    M '+(x+798)+' '+(y+101)+'l 5 1 l -5 1 l 5 1 l -5 0 '
		    				   +'M '+(x+808)+' '+(y+36)+'l 38 -23 l 8 13 l -41 23      M '+(x+815)+' '+(y+49)+' l 40 23 l -8 13 l -38 -23   M'+(x+844 )+' '+(y+20)+' l 1 5  l 1 -5 l 1 5 l 0 -5  M '+(x+844)+' '+(y+73)+' l 1 5 l 1 -5 l 1 5 l 0 -5 '
		    				   +'M '+(x+793)+' '+(y+36)+'l -39 -23 l -8 13 l 41 23     M '+(x+785)+' '+(y+50)+' l -40 23 l 8 13 l 38 -23    M'+(x+753 )+' '+(y+20)+' l 1 5  l 1 -5 l 1 5 l 0 -5  M '+(x+750)+' '+(y+73)+' l 1 5 l 1 -5 l 1 5 l 0 -5 ').attr({'fill':'#e8e7e3','stroke':'black','stroke-width':'2'});    
		   
		    paper.circle(x+800, y+50, 15).attr({'stroke':'black', 'stroke-width':'2', 'fill':'#abc'});
		    paper.circle(x+800, y+50, 10).attr({'fill' :'#0a0302'});  

		 }  
// SECOND DESIGN BLADES 
		//2 blades
		function type2_b2(x,y,t)
		{
			var x= x1+150;
			var y=y1-50;
		    b4 = paper.path('M'+(x+198)+' '+(y+251)+' l -10 -46 l 25 0 l -10 46        M '+(x+198)+' '+(y+279)+' l -10 46 l 25 0 l -10 -46    M'+(x+198)+' '+(y+208)+' l 5 1  l-5 1  l 5 1 l -5 0   M '+(x+198)+' '+(y+318)+' l 5 1 l -5 1 l 5 1 l -5 0').attr({'fill':'#e8e7e3','stroke':'black', 'stroke-width':'2'});
			paper.circle(x+200, y+265, 15).attr({'stroke':'black', 'stroke-width':'2', 'fill':'#abc'});
			paper.circle(x+200, y+265, 10).attr({'fill' :'#0a0302'});
//			b4.animate( keepRotating.delay(2000) )
		}
		//4 blades
		function type2_b4(x,y,t){
			var x= x1-150;
			var y=y1-50;
			b5 = paper.path('M'+(x+496)+' '+(y+251)+' l -8 -46 l 25 0 l -8 46     M '+(x+496)+' '+(y+279)+' l -8 46 l 25 0 l -8 -46      M'+(x+498)+' '+(y+208)+' l 5 1  l-5 1  l 5 1 l -5 0    M '+(x+498)+' '+(y+318)+' l 5 1 l -5 1 l 5 1 l -5 0          '
		 				   +'M'+(x+514)+' '+(y+262)+' l 46 -8 l 0 25 l -46 -8     M '+(x+485)+' '+(y+262)+'  l -46 -8 l 0 25 l 46 -8     M'+(x+553 )+' '+(y+265)+' l 1 5  l 1 -5 l 1 5 l 0 -5   M '+(x+442)+' '+(y+265)+' l 1 5 l 1 -5 l 1 5 l 0 -5 ').attr({'fill':'#e8e7e3','stroke':'black', 'stroke-width':'2'});
			paper.circle(x+500, y+265, 15).attr({'stroke':'black', 'stroke-width':'2', 'fill':'#abc'});
			paper.circle(x+500, y+265, 10).attr({'fill' :'#0a0302'});

		}   

		//6 blades 

		function type2_b6(x,y,t)
		{
			var x= x1-450;
			var y=y1-50;
		     b6 = paper.path('M'+(x+796)+' '+(y+250)+' l -6 -45.5 l 21 0 l -6 45.5      M '+(x+796)+' '+(y+280)+' l -6 45.5 l 21 0 l -6 -45.5      M'+(x+798)+' '+(y+208)+' l 5 1  l-5 1  l 5 1 l -5 0     M '+(x+798)+' '+(y+318)+' l 5 1 l -5 1 l 5 1 l -5 0'
		 				   +'M '+(x+810)+' '+(y+255)+'l 36.5 -30 l 12 20 l -43 17      M '+(x+815)+' '+(y+269)+' l 43 17 l -12 20 l -37 -30       M'+(x+846 )+' '+(y+235)+' l 1 5  l 1 -5 l 1 5 l 0 -5    M '+(x+845)+' '+(y+290)+' l 1 5 l 1 -5 l 1 5 l 0 -5'
		 				   +'M '+(x+790)+' '+(y+255)+'l -36.5 -30 l -12 20 l 43 17     M '+(x+785)+' '+(y+269)+' l -43 17 l 12 20 l 37 -30        M'+(x+751 )+' '+(y+235)+' l 1 5  l 1 -5 l 1 5 l 0 -5    M '+(x+751)+' '+(y+290)+' l 1 5 l 1 -5 l 1 5 l 0 -5').attr({'fill':'#e8e7e3','stroke':'black','stroke-width':'2'});    

		    paper.circle(x+800, y+265, 15).attr({'stroke':'black', 'stroke-width':'2', 'fill':'#abc'});
		    paper.circle(x+800, y+265, 10).attr({'fill' :'#0a0302'});  


		}

//THIRD DESIGN BLADES
		//2 blades

		function type3_b2(x,y,t)
		{
			var x= x1+244;
			var y=y1+115;
			var small_circle = paper.circle(x+107, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":'#000'}); 
		 	var big_circle = paper.circle(x+107, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 });
				b7 = paper.path("m "+(x+98)+" "+(y+88)+" "+" l -5 -38  A 20 20 0 0 1 "+(x+120)+" "+(y+50)+" l -5 38 M "
		                         +(x+98)+" "+(y+112)+" "+" l -5 38 A 20 20 1 0 0 "+(x+120)+" "+(y+150)+" l -5 -38 M"
		                         +(x+108)+" "+(y+48)+"l 0 2 l -2 0 l 0 -2 l 3 0 M "
		                         +(x+108)+" "+(y+149)+"l 0 2 l -2 0 l 0 -2 l 3 0")
		  .attr({'stroke' : '#000' , 'stroke-width' : 2 , "fill":"#fae3d7"}); 
		  	var big_circle1 = paper.circle(x+107, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		    var small_circle1 = paper.circle(x+107, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 
		}

		//4 blades

		function type3_b4(x,y,t)
		{
			var x= x1+37;
			var y=y1+115;
			var small_circle = paper.circle(x+313, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":'#000'}); 
		    var big_circle = paper.circle(x+313, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});
			b8 = paper.path("M "+(x+305)+" "+(y+88)+" "+" l -5 -38  A 20 20 0 0 1 "+(x+330)+" "+(y+50)+"  l -7 38 M"
			                        +(x+305)+" "+(y+112)+" "+"l -5 38 A 20 20 1 0 0 "+(x+330)+" "+(y+150)+ "l -7 -38 M"
			                        +" "+(x+303)+" "+(y+110)+" "+"l -38 5 A 20 20 0 0 1 "+(x+264)+" "+" "+(y+85)+ "l 38 5 M"
			                        +(x+323)+" "+(y+110)+" "+"l 38 5 A 20 20 1 0 0 "+(x+363)+" "+(y+84)+" 184 l -38 7 M"
			                         +(x+316)+" "+(y+47)+"l 0 2 l -2 0 l 0 -2 l 3 0 M "
		                         +(x+316)+" "+(y+150)+"l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                         +(x+266)+" "+(y+100)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                         +(x+364)+" "+(y+99)+ "l 0 2 l -2 0 l 0 -2 l 3 0").attr({'stroke' : '#000' , 'stroke-width' : 2, "fill":"#f0eeed"}); 
			   
			 var big_circle1 = paper.circle(x+313, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		     var small_circle1 = paper.circle(x+313, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 
		}

		//6 blades

		function type3_b6(x,y,t)
		{
				var x= x1-166;
				var y=y1+115;
				var small_circle = paper.circle(x+515, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 , 'fill':'#000'}); 
				var big_circle = paper.circle(x+515, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});
			    b9 = paper.path("M "+(x+510)+" "+(y+86)+" "+" l -7 -38  A 20 20 0 0 1 "+(x+530)+" "+(y+50)+" 150  l -10 36 M"
			       	+(x+508)+" "+(y+113)+"l -10 38 A 20 20 1 0 0 "+(x+523)+" "+(y+153)+" 253 l -6 -39 M"
			       	+(x+505)+" "+(y+110)+"l -29 27 A 20 20 0 0 1 "+(x+463)+" "+(y+115)+" l 37 -13 M"
			       	+(x+525)+" "+(y+90)+"l 30 -23 A 20 20 0 0 1 "+(x+564)+" "+(y+95)+" l -34 5 M"
			       	+(x+528)+" "+(y+105)+"l 35 15 A 20 20 0 0 1 "+(x+545)+" "+(y+143)+" l -22 -31 M"
			       	+(x+501)+" "+(y+96)+"l -38 -9 A 20 20 0 0 1 "+(x+475)+" "+(y+63)+" l 30 25 M "
			       	+(x+517)+" "+(y+48)+"l 0 2 l -2 0 l 0 -2 l 3 0 M "
		         +(x+512)+" "+(y+150)+"l 0 2 l -2 0 l 0 -2 l 3 0 M "
		         +(x+470)+" "+(y+125)+"l 2 -2 l 1 1 l -2 2  M"
		         +(x+556)+" "+(y+82)+ "l 2 -2 l 1 1 l -2 2 M"
		         +(x+470)+" "+(y+78)+ " l 2 -2 l 1 1 l -2 2 M "
		         +(x+549)+" "+(y+130)+ "l 2 -2 l 1 1 l -2 2 M")
			       	.attr({'stroke' : '#000' , 'stroke-width' : 2, "fill":"#e6dddc"});     
			       	
			    var big_circle1 = paper.circle(x+515, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		        var small_circle1 = paper.circle(x+515, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 
		}

//FOURTH DESIGN BLADES
		//2 blades

		function type4_b2(x,y,t){
		var x= x1+244;
			var y=y1+115;
//		    var rectangle = paper.rect(x+40,y+35,130,130);
		    
		    var small_circle = paper.circle(x+107, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 , "fill":'#000'}); 
		 var big_circle = paper.circle(x+107, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});
		    
		     b10 = paper.path("M "+(x+96)+" "+(y+90)+ " l 0 -5 A 9 40 0 0 1 "+(x+118)+" "+(y+90)+" M "
		                            +(x+96)+" "+(y+110)+ " l 0 5  A 9 40 1 0 0 "+(x+118)+" "+(y+110)+ " M "
		                            +(x+108)+" "+(y+46)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                            +(x+107)+" "+(y+149)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"  ).attr({'stroke' : '#000' , 'stroke-width' : 2 , "fill":"#e8e7e3"}); 
		  
		  var big_circle1 = paper.circle(x+107, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		             var small_circle1 = paper.circle(x+107, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 

		  
		//var keepRotating = Raphael.animation({ 'transform': 'r360' }, 2000).repeat( 'Infinity' )
//			         b1.animate( keepRotating )
		  }
		  
		//4 blades

		function type4_b4(x,y,t){
			var x= x1+39;
			var y=y1+115;
			var small_circle = paper.circle(x+313, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 , "fill":'#000'}); 
		 var big_circle = paper.circle(x+313, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});
			b11 = paper.path("M "+(x+302)+" "+(y+90)+ " l 0 -5 A 9 40 0 0 1 "+(x+324)+" "+(y+90)+" M "
		                            +(x+302)+" "+(y+110)+ " l 0 5  A 9 40 1 0 0 "+(x+324)+" "+(y+110)+ " M "
		                            +" "+(x+302)+" "+(y+110)+" l -5 0 A 40 9 0 0 1 "+(x+303)+" "+" "+(y+89) +" M "
		                            +(x+325)+" "+(y+111)+" "+ " l -1 0 A 40 9 1 0 0 "+(x+324)+" "+(y+89)+" M "
		                            +(x+314)+" "+(y+46)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                            +(x+313)+" "+(y+149)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M "
		                            +(x+266)+" "+(y+99)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M "
		                            +(x+359)+" "+(y+99)+ "l 0 2 l -2 0 l 0 -2 l 3 0 " ).attr({'stroke' : '#000' , 'stroke-width' : 2 , "fill":"#e9daf0"});

		//	
		            var big_circle1 = paper.circle(x+313, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		             var small_circle1 = paper.circle(x+313, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 
		}
		//6 blades

		function type4_b6(x,y,t){
			var x= x1-158;
			var y=y1+115;
		         var small_circle = paper.circle(x+513, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 , "fill":'#000' }); 
		         var big_circle = paper.circle(x+513, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});
			

			 		b12 = paper.path("M "+(x+506)+" "+(y+87)+ "l 0 -10 A 6 39 0 0 1 "+(x+518)+" "+(y+77)+" l 0 9  M "
		                            +(x+506)+" "+(y+113)+ " l 0 10 A 6 39 1 0 0 "+(x+518)+" "+(y+123)+"l 0 -9 M " 
		                            +(x+503)+" "+(y+111)+"A 38 5 -32 1 1 "+(x+498)+" "+(y+99)+" M"
		                            +(x+528)+" "+(y+96)+ "A 38 5 -32 0 0 "+(x+520)+" "+(y+86)+" M"
		                            +(x+528)+" "+(y+100)+"l 5 3 A 37 5 28 0 1 "+(x+522)+" "+(y+111)+"   M"
		                            +(x+505)+" "+(y+88)+" A 32 4 28 0 0 "+(x+498)+" "+(y+98)+"   M"
		                            +(x+513)+" "+(y+45)+"l 0 2 l -2 0 l 0 -2 l 3 0 M "
		                            +(x+512)+" "+(y+151)+"l 0 2 l -2 0 l 0 -2 l 3 0 M" 
		                            +(x+471)+" "+(y+123)+"l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                            +(x+471)+" "+(y+75)+"l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                            +(x+552)+" "+(y+73)+"l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                            +(x+554)+" "+(y+120)+"l 0 2 l -2 0 l 0 -2 l 3 0 M").attr({'stroke' : '#000' , 'stroke-width' : 2 , "fill":"#d5dcde"});
			

			
			   var big_circle1 = paper.circle(x+513, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		    var small_circle1 = paper.circle(x+513, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 
		           
		}  
		
//FIFTH DESIGN BLADES
		//2 blades
//		var b13;
		function type5_b2(x,y,t){
		    var x= x1+248;
			var y=y1+115;
			var small_circle = paper.circle(x+107, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000" }); 
		    var big_circle = paper.circle(x+107, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});
		    b13 = paper.path("M "+(x+112)+" "+(y+88)+ " A 40 40 0 0 0 "+(x+80)+" "+(y+50)+" A 40 8 33 0 0 "+(x+87)+" "+(y+66)+ " A 40 33 30 0 1 "+(x+97)+" "+(y+89)+ " M "
		                                +(x+100)+" "+(y+113)+ "  A 40 40 0 0 0 "+(x+130)+" "+(y+150) +" A 40 10 30 0 0 "+(x+130)+" "+(y+140)+  "A 40 40 0 0 1 "+(x+116)+" "+(y+108)+" M "
		                                +(x+85)+" "+(y+55)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                                +(x+127)+" "+(y+143)+ "l 0 2 l -2 0 l 0 -2 l 3 0 ").attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#e9edf2' }); 
		       

		     var big_circle1 = paper.circle(x+107, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		     var small_circle1 = paper.circle(x+107, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 
		}
		//4 blades
//		var b14;
		
		function type5_b4(x,y, t){
			var x= x1+40;
			var y=y1+115;
//			var rectangle = paper.rect(x+247,y+35,130,130);
		    var small_circle = paper.circle(x+313, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 }); 
		    var big_circle = paper.circle(x+313, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2});       
//		    var circle = paper.circle(x+312,y+100, 58);
		     b14 = paper.path("M "+(x+318)+" "+(y+91)+ " A 40 40 0 0 0 "+(x+286)+" "+(y+50)+" A 40 8 33 0 0 "+(x+294)+" "+(y+65)+ " A 40 33 30 0 1 "+(x+306)+" "+(y+93)+" M "
		                               +(x+306)+" "+(y+108)+"   A 40 38 0 0 0 "+(x+338)+" "+(y+148) +" A 40 7 30 0 0 "+(x+338)+" "+(y+140)+  "A 40 38 0 0 1 "+(x+318)+" "+(y+108)+" M "
		                               +(x+306)+" "+(y+96)+ "A 40 30 0 0 0 "+(x+262)+" "+" "+(y+122)+"  A 40 6.4 -50 0 0 "+(x+278)+" "+(y+115)+" A 40 55 8 0 1 "+(x+306)+" "+(y+108)+" M "
		                               +(x+318)+" "+(y+106)+ " A 40 30 0 0 0 "+(x+359)+" "+" "+(y+69)+"  A 30 6 -80 0 0 "+(x+350)+" "+(y+79)+" A 40 35 40 0 1 "+(x+317)+" "+" "+(y+95)+ "M "
		                               +(x+292)+" "+(y+55)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                               +(x+336)+" "+(y+142)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                               +(x+269)+" "+(y+117)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M"
		                               +(x+356)+" "+(y+78)+ "l 0 2 l -2 0 l 0 -2 l 3 0 M")                               
		                                  .attr({'stroke' : '#000' , 'stroke-width' : 2  , 'fill':'#edd9d5'});   
		      var big_circle1 = paper.circle(x+313, y+100, 15).attr({'stroke' : '#000' , 'stroke-width' : 2 , 'fill':'#fff' });
		      var small_circle1 = paper.circle(x+313, y+100, 10).attr({'stroke' : '#000' , 'stroke-width' :2 ,"fill":"#000"}); 

		}
		
		
		
		 stop = function(){
			 animationEnd++;
				
			 flag=false;
		   fg=0;
           console.log("sneha stop");
			paper.clear();
	    	meterDesign();
	    	
	    	flag = false;
	    	simuli = 0;
	    	
	    	var pulse=paper.rect(520,190,100,60).attr({"stroke-width": 2,"font-size":25,"font-weight":"bold"});
				var n1=paper.text((x+420),(y+120),'PULSE').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				paper.text((x+410),(y+100),'Instantaneous Flow').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				var unit1=paper.rect(700,190,80,60).attr({"stroke-width": 2,"font-size":25,"font-weight":"bold"});
				var unit2=paper.rect(710,200,60,40).attr({"stroke-width": 2,"font-size":25,"font-weight":"bold","fill":"#000"});
				paper.text((x+595),(y+120),'UNIT').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				paper.text((x+580),(y+100),'Totalize Flow').attr({"font-size":20,"fill":"#000","stroke-width":10,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
				var unitno=paper.text(740,218,'0').attr({"font-size":25,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 30});
				var r1=paper.rect(530,200,80,40).attr({"fill": "#000", "stroke-border":2,"stroke-width": 3});
               t1= paper.text(570,218,'0').attr({"font-size":25,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 30});

	    
//	  startImg = paper.image("images/start.png", 80, 50, 60, 60).attr({	"clip-rect" : "80,50,60,60"});
//     startLabel=paper.text(100,30,'Start Process').attr({"font-size":20,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
//				
//	 
//	
//	 stopImg = paper.image("images/stop1.png", 600, 50, 70, 70).attr({"clip-rect" : "600,50,70,70"});
//	 stopLabel=paper.text(630,30,'Stop Process').attr({"font-size":20,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
//
			if (type==1 && blades==2) {	
				type1_b2(x,y,0);	
					console.log("type 1 blade 2");
						
				}else if(type==1 && blades==4){
					type1_b4(x,y,0);
					console.log("type 1 blade 4");
						  
				}else if(type==1 && blades==6){
					type1_b6(x,y,0);
					console.log("type 1 blade 6");
					
				}else if(type==2 && blades==2 ){
					type2_b2(x,y,0);
					console.log("type 2 blade 2");
					
				}else if(type==2 && blades==4 ){
					type2_b4(x,y,0);
					console.log("type 2 blade 4");
					
				}else if(type==2 && blades==6){
					type2_b6(x,y,0);
					console.log("type 2 blade 6");
				}else if(type==3 && blades==2){
					type3_b2(x,y,0);
					console.log("type 3 blade 2");
					 
				}else if(type==3 && blades==4){
					type3_b4(x,y,0);
					console.log("type 3 blade 4");	
					
				}else if(type==3 && blades==6 ){
					type3_b6(x,y,0);
					console.log("type 3 blade 6");
				}else if(type==4 && blades==2 ){
					type4_b2(x,y,0);
					console.log("type 4 blade 2");
				}else if(type==4 && blades==4){
					type4_b4(x,y,0);
					console.log("type 4 blade 4");
				}else if(type==4 && blades==6){
					type4_b6(x,y,0);
					console.log("type 4 blade 6");
				}else if(type==5 && blades==2){
					type5_b2(x,y,0);
					console.log("type 5 blade 2");
				}else if(type==5 && blades==4){
					type5_b4(x,y,0);
					console.log("type 5 blade 4");
				}
			startImg = paper.image("images/start.png", 80, 50, 60, 60).attr({	"clip-rect" : "80,50,60,60"});
     startLabel=paper.text(105,30,'Start Process').attr({"font-size":20,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
	
	 stopImg = paper.image("images/stop1.png", 225, 45, 71, 71).attr({"clip-rect" : "225,45,71,71"});
	 stopLabel=paper.text(250,30,'Stop Process').attr({"font-size":20,"fill":"#ff2019","stroke-width":15,"font-weight":"bold",'font-family':'digital-clock-font','font-size': 20});
	  
        startImg.click(function() {
        	
        	if(flg == 1)
            {
				start();
		      }else{
			alert("Animation in process first click stop...");
		}
        	
//					console.log("hiii ");
////					counter = 0;
//					start();
				
//					animateSimulation(  BladeShape,  pipeSize, noBlades,  time1,  materialType,  fluidType) ;
			});
			
		}	

}


 

  