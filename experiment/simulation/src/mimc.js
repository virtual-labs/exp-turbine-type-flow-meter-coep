function nextLevelMimc(BladeShape, pipeSize, noBlades, time2, materialType, fluidType, supplierConstaint, time1) {
	$('#canvas-div').removeAttr('width');
	$('#canvas-div').removeAttr('height');
	var w = 900;
	var h = 900;

	var width = $(window).width();

	if ($(window).width() < 500) {
		width = $(this).width();
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	} else {
		paper = new Raphael(document.getElementById('canvas-div'), '75%', '90%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('75%', '90%');
	}

	x = 50;
	y = 105;

	ht1 = 1;
	flag = 0;
	count = 0;
	reset = 1;
	var countwt = 1;
	var wt = 0;
	var color;
	var weight_correct = 0;
	r = 0;
	var id;
	var percent = 100;
	var weight;
	var graphData = [];
	var xdata = [];
	var ydata = [];
	var AnswerCounter = 0;
	var checkAns = 0;
	var checkAlert = 0;
	var checkDrain = 0;

	var reset_btn_click_counter = 0;
	var plus_click_counter = 0;
	var minus_click_counter = 0;
	var V1_click_counter = 0;
	var V2_click_counter = 0;
	var pump_click_counter = 0;
	var DrainV_click_counter = 0;
	var pulses=[];
	var resultJson = {};
	var resultMasterJson = {};

	var ActualAnsSubmit=0;
	var zeroErrorCounter=0;
	var spanErrorCounter=0;
	var accurancyCounter=0;
	var lineralityCounter=0;
		
	
	resultJson = {};
	var masterResultJson={};
	var resultArrayJson = [];
	var errorAttemptCounter=0;
	var flg = 0;
    var tm=0, sec=time1, seconds = 0, minutes = 0, hours = 0,    h1= "00:00:00",RealTimer;
//     console.log("SECONDS="+sec);
    var RealTimerSet=paper.rect(x + 130, y+740, 120, 30).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
	
	//for fluid type color change 
	if (fluidType == "#0592f0") { // water 
		color = "#0592f0";
	}

	if (fluidType == "#694F04") { // Muddy Water
		color = "#694F04";
	}

	if (fluidType == "#6b6a64") { // gas
		color = "#6b6a64";
	}

	if (fluidType == "#B0BF1A") { // acid
		color = "#B0BF1A";
	}

	var wtJson = {};
	var masterJson = {};
	var arrayJson = [];
	$("#CalculateActualFlow").hide();
	var stepText = paper.text(x + 680, 70, "").attr({
		'font-size': 15,
		'font-weight': "bold",
		'fill': "red"
	});

	var res_text = paper.text(x + 730, y + 260, "Reset Tare Weight").attr({ 'fill': 'red', 'font-weight': 'bold' });
	res_text.animateWith(control_button2, null, { "font-size": 25 }, 6000, "bounce")

	var per;
	var min1 = 0, max1 = 0;
	var min2 = 0, max2 = 0;

	// Ranges for pipsize
	if (pipeSize == 1) {
		min1 = 0.05; max1 = 0.85;
		min2 = 0.05; max2 = 0.85;
	}
	else if (pipeSize == 2) {
		min1 = 0.22; max1 = 2.22;
		min2 = 0.22; max2 = 2.22;
	}
	else if (pipeSize == 3) {
		min1 = 0.52; max1 = 5.27;
		min2 = 0.52; max2 = 5.27;
	}
	else if (pipeSize == 4) {
		min1 = 0.97; max1 = 9.70;
		min2 = 0.97; max2 = 9.70;
	}

//	console.log(" min1" + min1);
//	console.log(" max1" + max1);

	paper.path('M' + (x) + ' ' + (y + 50) + 'l 0 520').attr({ 'stroke': 'black', 'stroke-width': '2' });
	paper.path('M' + (x) + ' ' + (y + 50) + 'l 100 0').attr({ 'stroke': 'black', 'stroke-width': '2' });
	paper.path('M' + (x + 250) + ' ' + (y + 50) + 'l 100 0').attr({ 'stroke': 'black', 'stroke-width': '2' });

	paper.path('M' + (x + 450) + ' ' + (y + 50) + 'l 100 0 l 0 50 ').attr({ 'stroke': 'black', 'stroke-width': '2' });

	var tank1 = tank(x, y);
	var tank2 = tank(x, y + 310);
	Terbine_flow_Meter(x - 50, y);
	Magnetic_flow_Meter(x, y);
	conection_WT(x, y);
	drain_valve(x, y - 40);
	pump_control(x, y);
	water(x, y + 310);
	water1(x, y + 219);
	speed_meter(x, y);

	paper.rect(x + 225, y + 390, 50, 30).attr({ 'stroke-width': 2, 'fill': 'white' }).toFront();
	var selectedRange = paper.text(x + 260, y + 405, " %").attr({
		'font-size': 18,
		'font-weight': "bold"
	});

	var selectedRange = paper.text(x + 240, y + 405, "1").attr({
		'font-size': 18,
		'font-weight': "bold"
	});

	var maxText = paper.text(x + 364, y + 535, 'Selected Flow Range 0 -' + max1).attr({
		'font-size': 17, 'font-weight': "bold"
	});

	var mcText = paper.text(x + 170, y + 180, 'Selected Meter Constant ' + supplierConstaint + ' pulses').attr({
		'font-size': 17, 'font-weight': "bold"
	});

	//Drain valve (v3)
	var drain_button1 = paper.path(
		'M' + (x + 640) + ' ' + (y + 670) + 'l -15 -15 l 0 30 l 30 -30 l 0 30 l -15 -15 l 0 -25 l -10 0 l 0 -8 l 20 0 l 0 8 l -10 0')
		.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'red'
		});
	// Sv valve (v1)
	var control_button2 = paper.path(
		'M' + (x + 350) + ' ' + (y + 600) + 'l -15 -15 l 0 30 l 30 -30 l 0 30 l -15 -15 l 0 -25 l -10 0 l 0 -8 l 20 0 l 0 8 l -10 0')
		.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'red'
		});
	// v2 valve botton
	var WT_button3 = paper.path(
		'M' + (x + 530) + ' ' + (y + 340) + 'l 30 0 l -30 20 l 30 0 l -30 -20 + M' + (x + 545) + ' ' + (y + 350) + ' l 20 0 l 0 10 l 10 0 l 0 -20 l -10 0 l 0 10 ')
		.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'red'
		});

	var pump = paper.circle(x + 250, y + 600, 30).attr({ 'stroke-width': '2', 'fill': 'white' });

	var blade_type = BladeShape;
	var pipe_size = pipeSize;
	var time;
	var meter_constant = supplierConstaint;
	var weight;
	var delay = 8000;
	var speed1 = 0.03;
	var Magne_pulses = "";

	var img = paper.image("images/knob.png", (x+215), 560, 70, 70);

	var plus = paper.image("images/plus.png", (x+300), 580, 30, 30);

	var minus = paper.image("images/minus.png", (x+170), 580, 30, 30);

	var reset_button = paper.image("images/Reset.png", (x+680), 400, 100, 100);

	paper.rect(x + 200, y + 700, 100, 30).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
	var tank_text = paper.text(x + 240, y + 715, time1 + '  sec').attr({ 'font-size': 20 });

	var st1;
	var std ;
	var st;
	var anim;
	var ct1 = 1;

	st = paper.text(x + 370, y + 700, '');
	st1 = paper.text(x + 350, y + 640, '')
	res_after = paper.text(x + 715, y + 265, '');
    st2 = paper.text(x + 260, y + 365, '');
    st8 = paper.text(x + 100, y + 620, '');
    std12 = paper.text(x + 350, y + 640, '');
    
     std = paper.text(x + 350, y + 640, "(V1)").attr({ 'font-size': 20, 'font-weight': 'Bold' });
			std.animateWith(control_button2, null, { "font-size": 20, "fill": "#000" }, 500);
   
	// Reset tare weight function
	reset_button.click(function(event) {
//		std.hide();
//		res_text.hide();
		std.remove();
		st1.remove();
		res_text.remove();
		res_after.remove();
		res_after = paper.text(x + 715, y + 265, "Tare weight reset").attr({ 'font-size': 22, 'font-weight': 'Bold' });
		if(flg == 0){
			if (ct1 == 1) {
				st = paper.text(x + 370, y + 700, 'Click on V1').attr({ 'fill': 'red', 'font-weight': 'bold' });
				st.animateWith(control_button2, null, { "font-size": 23 }, 100);
	
				st1 = paper.text(x + 350, y + 640, "(V1)").attr({ 'font-size': 20, 'font-weight': 'bold' });
				st1.animateWith(control_button2, null, { "font-size": 30, "fill": "red" }, 5000, "elastic");
				ct1++;
			} else {
				std12.remove();
				std12 = paper.text(x + 350, y + 640, "(V1)").attr({ 'font-size': 20, 'font-weight': 'Bold' });
				std12.animateWith(control_button2, null, { "font-size": 20, "fill": "#000" }, 500);
			}
		}

		paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
		tank_text = paper.text(x + 720, y + 200, "0").attr({ 'font-size': 20 });
		reset = reset + 1;
//		console.log(reset);
		reset_btn_click_counter++;
//		console.log("reset_btn_click_counter=" + reset_btn_click_counter);
	}, 3000);

	var cnt = 1;
	var pp = 0;
	// set flow 	 
	plus.click(function(event) {st.remove();st1.remove();
		$("#btnAnsCheck").prop("disabled", true);
		$("#flowAns").prop("disabled", true);
		
		std = paper.text(x + 350, y + 640, "(V1)").attr({ 'font-size': 20, 'font-weight': 'Bold' });
			std.animateWith(control_button2, null, { "font-size": 20, "fill": "#000" }, 500);

		if(flg == 1)
		  {
		
		st2.remove();

		if (ct == 1) {

			st8 = paper.text(x + 100, y + 620, 'Click on pump').attr({ 'fill': 'red', 'font-weight': 'bold' });
			st8.animateWith(control_button2, null, { "font-size": 25 }, 500);
			pump.animate({ 'cx': x + 250, 'cy': y + 600, "fill": "#adaca8", "r": 40, 'stroke': '#000', 'stroke-width': 5 }, 5000, "bounce", function() {
              })
			ct++;
		} else {
//			st8.remove();
          pump.animate({ 'cx': x + 250, 'cy': y + 600, "fill": "#fff", "r": 30 }, 3000, "bounce", function() {
			})
		}

		count = count + 1;
		if (pp >= 100) {


		alert("Max limit");
//			var str='<img src="images/info.png" class=" img-fluid " />'
//				+'<b id="errorText" style="color:red;margin-left:10px;" >Max limit...</b> '
//				$("#mimicModelMessage").html(str); 

		}
		else {

			if (r < 1000) {
				r = r + 5;
				img.animate({ 'transform': 'r' + r }, 500);
			}
			
			pp = pp + 5;
			
			selectedRange.attr('text', pp);
		}
		}else
		   {
			alert("Turn on SV valve");
//			var str='<img src="images/info.png" class=" img-fluid " />'
//				+'<b id="errorText" style="color:red;margin-left:10px;" >Turn on SV valve...</b> '
//				$("#mimicModelMessage").html(str); 
		}
	});

	minus.click(function(event) {
		$("#btnAnsCheck").prop("disabled", true);
		$("#flowAns").prop("disabled", true);
//			st2.hide();
			st2.remove();
		if (r > 0) {
			r = r - 5;
			img.animate({ 'transform': 'r' + r }, 500);
			count = count + 1;
			if (count == 0) {
				tank_fill(x, y + 30);
				tank_emp(x, y - 30);
				water_weight_inc();
			}
		} else {
			alert("Minimum limit ");
//			var str='<img src="images/info.png" class=" img-fluid " />'
//				+'<b id="errorText" style="color:red;margin-left:10px;" >Min limit...</b> '
//				$("#mimicModelMessage").html(str); 
			
		}

		if (pp >  0) {
			pp = pp - 5;
			selectedRange.attr('text', pp);
		}
		if (pp == 0){
				selectedRange.attr('text', "");
			 selectedRange = paper.text(x + 240, y + 405, "1").attr({
		'font-size': 18,
		'font-weight': "bold"
	});
			
		}
			
		st7 = " ";
	});


	var y1 = y;

	var speed_15;
	var c;
	var sp;
	// pump on off functions
	var vt_text;
	function pumpStatusOff(event) {
//       add1();
		var c = paper.circle(x + 250, y + 600, 10);
		c.animate({ 'fill': 'red', 'stroke': 'red', opacity: 1 }, 1000, "bounce");

		if (v2n == 1) {
			m.animateWith(control_button2, null, { "font-size": 30, "fill": "red" }, 1000, " bounce");

			v2n++;
		} else { }

		if (noBlades == 4) {
			b1.remove();
			smallblades4(x, y);
		}

		else if (noBlades == 2) {
			b1.remove();
			smallblades2(x, y);
		}

		else if (noBlades == 6) {
			b1.remove();
			smallblades6(x, y);
		}
		$("#CalculateActualFlow").show();
	}

	function pumpStatusOn(event) {
        $("#flowAns").val("");
		id = 1;
		var c = paper.circle(x + 250, y + 600, 10);
		c.animate({ 'fill': 'green', 'stroke': 'green', opacity: 1 }, (time1 + 100), "bounce");
	}

	var v2n = 1;
	var t1;
	let xf;


	function Magetic_pulses(x, y) {
		tmp = speed_15 * meter_constant;
		Magne_pulses = tmp.toFixed(2);
		xf = (pp * (max1 - min1) / 100) + min1;

		paper.rect(x + 350, y - 100, 80, 50).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
		var text_LT = paper.text(x + 390, y - 80, xf.toFixed(2)).attr({ 'font-size': 20 });
		var text_LT = paper.text(x + 470, y - 80, 'lit/sec').attr({ 'font-size': 20, 'font-weight': 'bold' });
	}

	var ht = 0;
	var ht2 = 0;
	var h2 = 0;
	var htv2 = 0;
	var array = [];
	
    
	
	function add() {
//		console.log("Add function");
	    RealTimer=paper.text(x + 185, y +755 ,'');
	          
        RealTimer.remove();
		RealTimerSet1 = setInterval(function(){
		seconds++;
   	    if(tm < sec){
//	    console.log("SECONDS in if="+sec);
   			if (seconds >= 60){	
     			seconds = 0;
        		minutes++;
       		if (minutes >= 60){
       			 minutes = 0;
        		hours++;
        	}
     } tm++;
        RealTimer.remove();
   		h1 = (hours+":"+minutes+":"+seconds);
//   		console.log("REALTIME:"+hours+" : "+minutes+" : "+seconds); 
   		
 		
   		RealTimer = paper.text(x + 185, y +755,h1).attr({ 'font-size': 30, 'stroke': 'red'});
   		
    }else{
	clearInterval(RealTimerSet1);
		RealTimer.remove();		

}
},time1+1000);
//    	RealTimer.remove();

	seconds = 0 ; minutes = 0; hours = 0;
	tm = 0;
//	console.log("sneha timer : "+RealTimer); 	
}

//function add1(){
//	hours = 0;
//	minutes = 0;
////	seconds = 0;
//	tm = 0; 		
//
//	h1 = (hours+":"+minutes+":"+seconds);
//   		console.log("REALTIME:"+hours+" : "+minutes+" : "+seconds); 
//   		RealTimer.remove();
//}
	// pump click function	
	pump.click(function(event) {
		st2.remove();
		st8.remove();
		event.preventDefault();
//		if(checkAns == 0){
		$("#btnAnsCheck").prop("disabled", false);
		$("#flowAns").prop("disabled", false);
		if (checkDrain == 1) {
			pumpStatusOff();
			if(v2Check == 0){ 
			alert("Tank is empty ");
//			var str='<img src="images/info.png" class=" img-fluid " />'
//				+'<b id="errorText" style="color:red;margin-left:10px;" >Tank is empty ...</b> '
//				$("#mimicModelMessage").html(str);
			
			}
			if(v2Check == 1){
//				var str='<img src="images/info.png" class=" img-fluid " />'
//					+'<b id="errorText" style="color:red;margin-left:10px;" >Tank is empty or there is no enough water to continue your process please go back to previous page...</b> '
//					$("#mimicModelMessage").html(str);	
			alert("Tank is empty or there is no enough water to continue your process please go back to previous page.");	
			}
		} else {
//			add();
			pump.animate({ 'cx': x + 250, 'cy': y + 600, "fill": "#fff", "r": 30, 'stroke': '#000', 'stroke-width': 3 }, 6000, function() { })

			
			if (pp == 0){
				ht = ht1 * 1;
//				console.log("height" + ht);	
			}else{ 

			ht = ht1 * pp;
//			console.log("height" + ht);
			}
			setTimeout(function() {
				flag = 0, pumpStatusOff();
			}, (time1 * 100 * 10));

			array.push(pp); // insert pp value in an array
//			console.log("pp array : " + array);
			array.sort((a, b) => a - b); //sort the array in ascending order
//			console.log("sorted array : " + array);

			for (var i = 0; i < array.length; i++) {
				if ((array[i] - array[i + 1]) == 0) {
					//alert that duplicate is present
//					console.log("Duplicate values present in array..");
					alert("Please provide unique percent values !!");
					pumpStatusOff();
						keepRotating = Raphael.animation({ 'transform': 'r0' }, time1 + 1000);
			b1.animate(keepRotating);
//					var str='<img src="images/info.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" >Please provide unique percent values ...</b> '
//						$("#mimicModelMessage").html(str);	
					
					 checkAlert = 1;
					array = array.filter((a, b) => array.indexOf(a) == b); //remove the duplicate value from the array
//					console.log("After duplicate removal :" + array);
//					ht2 = ht2 - ht;
					
				}else{
				checkAlert = 0;
				}
//				console.log("Original array :" + array);
			}

			if (array.length == 5) {
				//check if first value is 1 in the sorted array
				if (array[0] != 0) {
					//alert user to provide 1 as one of the remaining 2 values
					alert(" You need to provide one of the remaining input value as 1 !! ");
//					var str='<img src="images/info.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" >You need to provide one of the remaining input value as 1 ...</b> '
//						$("#mimicModelMessage").html(str);	
					 checkAlert = 1;
					 const index1 = array.indexOf(pp);
							if (index1 > -1) { 
 							 array.splice(index1, 1); 
								}
//							console.log("array value in else array"+array);	
//					console.log("Current array elements : " + array);
				}
				else{
					 checkAlert = 0;
				}
				
			}

			if (array.length == 6) //check for last value
			{
				if (array[array.length - 1] != 100) {
					//alert user to provide 100 as one of the remaining 2 values
					alert(" You need to provide next input value as 100 !! ");
//					var str='<img src="images/info.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" > You need to provide next input value as 100 ...</b> '
//						$("#mimicModelMessage").html(str);	
					
					 checkAlert = 1;
					  const index1 = array.indexOf(pp);
							if (index1 > -1) { 
 							 array.splice(index1, 1); 
								}
//					console.log("current array elements : " + array);
				}
				else if (array[0] != 0) {
					//alert user to enter last input value as 1
					alert(" You need to provide next input value as 1 !! ");
//					var str='<img src="images/info.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" > You need to provide next input value as 1...</b> '
//						$("#mimicModelMessage").html(str);	
					 checkAlert = 1;
					  const index1 = array.indexOf(pp);
							if (index1 > -1) { 
 							 array.splice(index1, 1); 
								}
//					console.log("current array elements : " + array);
				}
				else{
					 checkAlert = 0;
				}
			}
	
		if (flag == 0) {
				
			if 	( checkAlert == 0){
				keepRotating = Raphael.animation({ 'transform': 'r360' }, time1 + 1000).repeat('Infinity');
			b1.animate(keepRotating);
				pumpStatusOn();
				if (control_flag == 1) {
				
					

					Magetic_pulses(x, y);
					// or ht < 120
					if (p1 == 100) {
						water_weight_inc();
						tank_fill(x, y);
						setTimeout(function() { tank_emp(x, y1) }, time1 * 10);
						LT_percent_std(x, y);
						setTimeout(function() {
						Turbine_pulses(x, y)
					}, time1);
					} else {
						var htCheck = ht2+ht;
						if (htCheck < 100) {
							htCheck = 0;
							h2 = ht2;
//							console.log("height ht2 " + h2);
							water_weight_continue();
							tank_fill1(x, y);
							setTimeout(function() { tank_emp1(x, y) }, time1 * 10);
								LT_percent(x, y);
								setTimeout(function() {
						Turbine_pulses(x, y)
					}, time1);
						}
						else {
							ht2 = ht2-ht;
//							console.log("array value in else"+pp);
							const index = array.indexOf(pp);
							if (index > -1) { 
 							 array.splice(index, 1); 
								}
//							console.log("array value in else array"+array);	
							
							alert("There is not enough water to start the pump ... click on V2 and complete the process");
//							var str='<img src="images/info.png" class=" img-fluid " />'
//								+'<b id="errorText" style="color:red;margin-left:10px;" > There is not enough water to start the pump ... click on V2 and complete the process..</b> '
//								$("#mimicModelMessage").html(str);
							
						}
						
					}

					Magetic_pulses(x, y);
					ht2 += ht;
//					htv2 -= ht;
				
//					console.log("last height value " + ht2);
				}
				
				 else if (control_flag == 0) {
					alert("Turn on the SV valve ");
//					var str='<img src="images/info.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" > Turn on the SV valve..</b> '
//						$("#mimicModelMessage").html(str);
				}
				add();
				
			}
			
		}
		else{
			checkAlert = 1;
			keepRotating = Raphael.animation({ 'transform': 'r360' }, time1 + 1000).repeat(0);
			b1.animate(keepRotating);
			
		}
			
			
			flag = 1;
			pump_click_counter++;
		}
			
		
		
	});

	var ft;
	var v2_t;

	var m = paper.text(x + 500, y + 350, "(V2)").attr({ 'font-size': 20, 'font-weight': 'bold' });

	function tank_fill(x, y) {
		var b = paper.path('M' + (x + 550) + ' ' + (y + 470) + 'l 0 0').attr({ 'stroke': 'white', 'stroke-width': '124' });
		level = b.animate({
			path: "M" + (x + 550) + " " + (y + 470) + "  l 0  " + (ht) + "", 'stroke-width': '124', 'stroke': 'white',
			opacity: 1
		}, time1 * 1000)
	};

	function tank_emp(x, y) {
		var a = paper.path('M' + (x + 550) + ' ' + (y + 308) + 'l 0 0').attr({ 'stroke': color, 'stroke-width': '124' });
		level = a.animate({
			path: "M" + (x + 550) + " " + (y + 308) + "  l 0" + -ht, 'stroke-width': '124', 'stroke': color,
			opacity: 0.5
		}, time1 * 1000)
	};

	function tank_fill1(x, y) {
		y = y + h2;
		var b = paper.path('M' + (x + 550) + ' ' + (y + 470) + 'l 0 0').attr({ 'stroke': 'white', 'stroke-width': '124' });
		level = b.animate({
			path: "M" + (x + 550) + " " + (y + 470) + "  l 0  " + ht + "", 'stroke-width': '124', 'stroke': 'white',
			opacity: 1
		}, time1 * 1000)
	};

		function tank_fillV2(x, y) {
		y = y + ht2;
		var b = paper.path('M' + (x + 550) + ' ' + (y + 470) + 'l 0 0').attr({ 'stroke': 'white', 'stroke-width': '124' });
		level = b.animate({
			path: "M" + (x + 550) + " " + (y + 470) + "  l 0  " + (-ht2), 'stroke-width': '124', 'stroke': color,
			opacity: 0.5
		}, 500)
	};

	// Tank 2 fill function after v2 is not click
	function tank_emp1(x, y) {
		y = y - h2;
		var a = paper.path('M' + (x + 550) + ' ' + (y + 308) + 'l 0 0').attr({ 'stroke': color, 'stroke-width': '124' });
		level = a.animate({
			path: "M" + (x + 550) + " " + (y + 308) + "  l 0" + (-ht), 'stroke-width': '124', 'stroke': color,
			opacity: 0.5
		}, time1 * 1000)
	};

	var weight_txt;

	function water_weight_inc() {

		sp = xf * 0.001;  // for converting flow lit/sec to cubic meter /sec 
		if (fluidType == "#0592f0") { //for  water 
			let wet_W = xf * 1000 * time1;
			tmp1 = Math.round(wet_W);
		}

		if (fluidType == "#694F04") { // for Muddy Water
			let wet_M = (sp * 1730 * time1) * 1000;
			tmp1 = Math.round(wet_M);
		}

		if (fluidType == "#6b6a64") { //for  gas
			let wet_G = (sp * 16 * time1) * 1000;
			tmp1 = Math.round(wet_G);
		}

		if (fluidType == "#B0BF1A") { // for acid
			let wet_A = (sp * 1840 * time1) * 1000;
			tmp1 = Math.round(wet_A);
		}

		weight_correct = tmp1.toFixed(2);
		res = weight_correct;

		if (reset == 1) {
			weight = parseInt(weight_correct) + errorwt;
		}
		if (reset >= 2) {
			weight = weight_correct;
		}

		intFact = 0;
		intFact = weight / time1;

		wt = 0;
//		console.log("sneha weight : " + weight);
		wt_interval = setInterval(function() {

			if (wt < weight) {

				wt = wt + intFact;
//				console.log("sneha weight in interval : " + weight);
				paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
				weight_txt = paper.text(x + 720, y + 200, Math.round(wt)).attr({ 'font-size': 20 });
			}else
			   {
				clearInterval(wt_interval);
			}
		}, 1000);
	}

	var x1 = 0;
	var ww = 0;
	var y2 = 0;
var weigth_temp=0;
var gud ;
	function water_weight_continue() {
		sp = xf * 0.001;  // for converting flow lit/sec to cubic meter /sec 
		if (fluidType == "#0592f0") { //for  water 
			let wet_W = xf * 1000 * time1;
			tmp1 = Math.round(wet_W);
		}

		if (fluidType == "#694F04") { // for Muddy Water
			let wet_M = (sp * 1730 * time1) * 1000;
			tmp1 = Math.round(wet_M);
		}

		if (fluidType == "#6b6a64") { //for  gas
			let wet_G = (sp * 16 * time1) * 1000;
			tmp1 = Math.round(wet_G);
		}
		if (fluidType == "#B0BF1A") { // for acid
			let wet_A = (sp * 1840 * time1) * 1000;
			tmp1 = Math.round(wet_A);
		}

		weight_correct = tmp1.toFixed(2);
		res = weight_correct;

		if (reset == 1) {
			weight = parseInt(weight_correct) + errorwt;
		}

		if (reset >= 2) {
			weight = weight_correct;
		}

		intFact1 = 0;
		intFact1 = weight / time1;
//       console.log("wt Value is :"+wt);
		let wt1 = Math.round(weight);
		
                 
 
			weigth_temp = (wt1+wt);
//			
//			console.log(" previous weight is :"+wt);
//			
//			console.log(" next weight is :"+wt1);
//
//             console.log(" Value of surbhi weight is :"+weigth_temp);
     

		wt_int = setInterval(function() {
            				wt1 = wt1 + intFact1;

			if (wt1 < weigth_temp) {
				paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
				weight_txt = paper.text(x + 720, y + 200, Math.round(wt1)).attr({ 'font-size': 20 });
				//console.log("value of added wt aaaa:"+wt1);
			}else
			   {
				clearInterval(wt_int);
				weight_txt.remove();
				
				paper.text(x + 720, y + 200, Math.round(weigth_temp)).attr({ 'font-size': 20 });
                
			}
		}, 1000);
		wt = weigth_temp;
		//console.log("value of wt is ababab " +wt);
	}

	var wx;
	function water_weight_dec() {
		wx = wt;

		intFact2 = 0;
		intFact2 = wx / time1;

		decInt = setInterval(function() {
			if (wx > 0) {
				wx = wx - intFact2;
				paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
				weight_txt = paper.text(x + 720, y + 200, Math.round(wx)).attr({ 'font-size': 20 })
			} else {
				clearInterval(decInt);
				paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
				weight_txt = paper.text(x + 720, y + 200, 0).attr({ 'font-size': 20 })
			};
		}, 500);
	}

	wt = 0;
	var perc = 100;
	var ct = 1;
	var p1 = 100;
	var std1;
	var p2;
	var txt12;
	var txt13;
var intFact3 = 0;
	function LT_percent(x, y) {
//		console.log("value of pp is" + pp);

//		per.hide();
		per.remove();

//		p2 = p1;
		if (perc < 100) {
			
			 
			        perc1 = perc;
            if(pp == 0)
              {
			perc12 = perc1 - 1;
			intFact3 = 1 / time1;
			  }else{
				perc12 = perc1 - pp; 
               intFact3 = pp / time1;				
			  }
//			console.log("value of perc1 is " + perc1);
			
			//intFact3 = pp / time1;
			lt_int = setInterval(function() {
				if (perc12 < perc) {
					perc = perc - intFact3;
					paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
					txt13 = paper.text(x + 635, y + 425, Math.round(perc) + '%').attr({ 'font-size': 20 });
				}else
				   {
					clearInterval(lt_int);
				}
			}, 1000); 
//			perc = perc - pp;
		}
		
		}
		function LT_percent_std(x, y){ 
			p1 = 100;
		if (perc == 100) {
//			console.log("value of perc is " + perc);
//			std1 = perc;
          intF3 = 0;
           if(pp == 0)
              {
	           perc = perc-1;
               intF3 = 1 / time1;
              }else{
	         	perc = perc-pp;
                intF3 = pp / time1;
                  }
                          
               
//			console.log("value of st is " + std1);
			
//			intF3 = pp / time1;
			lt_int1 = setInterval(function() {
				if (perc < p1) {
					p1 = p1 - intF3;
					paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
					txt12 = paper.text(x + 635, y + 425, Math.round(p1) + '%').attr({ 'font-size': 20 });
				}else
				   {
					clearInterval(lt_int1);
				}
			}, 1000);
//			perc = perc - pp;
           
		}
	}

	var x2;
	var yx;
	var perc1;
	var p3;
	var px;
	function LT_V2(x, y) {
       var p4= perc.toFixed(0);
	       p1 = parseInt(p4);
		 
		if (p1 < 100) {
			px = Math.round(p1);
			intFac1 = 0;

			if(pp == 0)
			 {
			  x2 = perc1 - 1;
			  intFac1 = 1/time1;
			  yx = 1 + x2;

			}else
			  {
			x2 = perc1 - pp;
			intFac1 = pp/time1;
			yx = pp + x2;
			  }
			
			p3 = yx;
//			intF1 = 0;
           
			LT_dec_res = setInterval(function() {
				if (p3 < 100) {

					p3 = p3 + intFac1;
					paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
					paper.text(x + 635, y + 425, Math.round(p3) + '%').attr({ 'font-size': 20 });
//					console.log("value of p3 is :" + p3);
				} else {
					clearInterval(LT_dec_res);
					 paper.text(x + 635, y + 425, ' ').attr({ 'font-size': 20 });
			 paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
			paper.text(x + 635, y + 425, '100 %').attr({ 'font-size': 20 });
				}
			}, 500);
		}


		p1 = 100, perc = 100;
	}

	var turbine_pulses = "";
	let turbine_pulses_corr;
	var flowI;
	var p;
	var flowU;
	var ft;
	var pulseInt;
	var pulseTimer;
	incFactor = 0;
	var wterr = 0;

	// pulses count 
	function Turbine_pulses(x, y) {
//		console.log("Turbine function");
		var pulse = 0;
		let min , max, min1,max1 ; 
		turbine_pulses_corr = (xf * meter_constant) * time1;
	if (meter_constant >= 100 && meter_constant < 200){
		 min = -8;
		 max = -10;

		 min1 = 8;
		 max1 = 10;
	}
	
	if (meter_constant >= 200 && meter_constant < 300){
		 min = -18;
		 max = -20;

		 min1 = 18;
		 max1 = 20;
	}
	if (meter_constant >= 300 && meter_constant < 400){
		 min = -28;
		 max = -30;

		 min1 = 28;
		 max1 = 30;
	}
	if (meter_constant >= 400 && meter_constant < 500){
		 min = -38;
		 max = -40;

		 min1 = 38;
		 max1 = 40;
	}
	if (meter_constant >= 500 && meter_constant < 600){
		 min = -48;
		 max = -50;

		 min1 = 48;
		 max1 = 50;
	}
	if (meter_constant >= 600 && meter_constant < 700){
		 min = -58;
		 max = -60;

		 min1 = 58;
		 max1 = 60;
	}
		if (meter_constant >= 700 && meter_constant < 800){
		 min = -68;
		 max = -70;

		 min1 = 68;
		 max1 = 70;
	}
		if (meter_constant >= 800 && meter_constant < 900){
		 min = -78;
		 max = -80;

		 min1 = 78;
		 max1 = 80;
	}
		if (meter_constant == 900 ){
		 min = -88;
		 max = -90;

		 min1 = 88;
		 max1 = 90;
	}
		
		
		let i = 0;
		let num;
		let randomNum = Math.random() * (max - min) + min;
		let randomNum1 = Math.random() * (max1 - min1) + min1;
		
		
 		let min_range = turbine_pulses_corr * (5 / 100);
		
		if ( pp == 0 ){
		 randomNum2 = Math.random() * (max1 - min1) + min1;
			num = - min_range ; 
		}
		else if ( pp == 100 ){
			num =  min_range; 
		}	
		else  {
			if (pump_click_counter >= 2 && pump_click_counter <= 4) {
			num = - min_range;
			}

			else {
			num = min_range;
			}
		}	
			
		
			

		p = num ;
//		p = min_range;
//		console.log(p);

		turbine_pulses = Math.round(turbine_pulses_corr + p);

		// CALCULATE FOR ACTUAL FLOW AFTER ADDING ERROR
		ft = (xf * turbine_pulses) / turbine_pulses_corr;
		wterr = (weight_correct * turbine_pulses  )/turbine_pulses_corr;
		//console.log("user flow "+ ft);
		//console.log("user weight "+ wterr);

		incFactor = turbine_pulses / time1;

		var text_LT = paper.text(x + 100, y - 80, 'Pulses').attr({ 'font-size': 20 });

		turbineInt = setInterval(function() {
			if (pulse < turbine_pulses) {
				pulse = pulse + incFactor;

				paper.rect(x + 150, y - 100, 80, 50).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
				text_LT = paper.text(x + 190, y - 80, Math.round(pulse)).attr({ 'font-size': 20 });
				pulseInt = Math.round(pulse);

			} else {
				clearInterval(turbineInt);

			}
		}, 1000);
	};

	flowU = parseFloat($("#flowAns").val().trim());
	//console.log("in Flow user " + flowU);

	var res_after;
	let errorwt = 5000;
	// Tear weight rectangle and tare weight reset text
	paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();
	tank_text = paper.text(x + 720, y + 200, errorwt).attr({ 'font-size': 20 });
	tank_text = paper.text(x + 810, y + 200, "grams").attr({ 'font-size': 20, 'font-weight': 'Bold' });

	paper.path('M' + (x + 720) + ' ' + (y + 280) + 'l 0 30 l 10 -10 l -10 10 l -10 -10 l 10 10  ').attr({ 'stroke': 'black', 'stroke-width': '2' });

	function drain_on(x, y) {
		drain_button1.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'green'
		});
	};

	function drain_off(x, y) {
		drain_button1.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'red'
		});
	};

	var drain_flag = 0;
	var drain_percent;
	// DRAIN TANK FUNCTION	  
    var txt_drain = paper.text(x + 635, y + 425, '');
	drain_button1.click(function(event) {

		drain_on(x, y);
		if (drain_flag = 1) {
//			console.log(drain_flag);
			drain_on(x, y);
			checkDrain = 1;

			var b = paper.path('M' + (x + 550) + ' ' + (y + 470) + 'l 0 0').attr({ 'stroke': 'white', 'stroke-width': '125' });
			level = b.animate({
				path: "M" + (x + 550) + " " + (y + 470) + "  l 0  150 ", 'stroke-width': '125', 'stroke': 'white',
				opacity: 1
			}, 5000);

			drain_percent = perc;
//			console.log("percent1 wt" + drain_percent);

			drain_it = setInterval(function() {
				if (drain_percent >= 0) {
				drain_percent = drain_percent - 10;

					paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
					txt_drain = paper.text(x + 635, y + 425, drain_percent + '%').attr({ 'font-size': 20 });
				}else
				    {
					txt_drain.remove();
					clearInterval(drain_it);
					paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
					 paper.text(x + 635, y + 425, ' 0 %').attr({ 'font-size': 20 });
			
				}
			}, 500);

			setTimeout(function() { drain_flag = 0, drain_off(x, y); }, 5000);
//			drain_percent = 0 ;
//			ht2 = 0; 
		}else{
				checkDrain = 0;
		}
	});

	function control_on(x, y) {
		control_button2.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'green'
		});
	};

	function control_off(x, y) {
		control_button2.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'red'
		});
	};

	var control_flag = 0;
	var st2;
	var ct2 = 1;
	
	// SV BUTTON CLICK 
	control_button2.click(function(event) {
		st1.remove();
 
		
		
		control_on(x, y);
        flg = 1;
//		st1.hide();
//		st.hide();
//		st.remove();
//		st1.remove();
		
		if (ct2 == 1) {
			st2 = paper.text(x + 260, y + 365, "Set flow").attr({ 'fill': 'red', 'font-weight': 'bold' });
			st2.animateWith(control_button2, null, { "font-size": 30, "fill": "red" }, 2000, "elastic");
			ct2++;
		} else {
			st2.remove();
		}
     
		if (control_flag == 0) {
			var outlet1 = paper.path('M' + (x + 335) + ' ' + (y + 585) + 'l 0 30 l 30 -30 l 0 30z ').attr({ 'stroke': 'black', 'stroke-width': '2' });
//			console.log(control_flag);
			drain_off(x, y);
		}
		control_flag = 1;
//		console.log(control_flag);
		V1_click_counter++;
		st.remove();
		st1.remove();
	});

	function WT_on(x, y) {

		WT_button3.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'green'
		});
	}

	function WT_off(x, y) {
		WT_button3.attr({
			'stroke': 'black',
			'stroke-width': '2',
			'fill': 'red'
		});
	}

	var st7;
	var table;
	var v2Check = 0 ; 
	WT_button3.click(function(event) {
		if(checkAns == 1){
			
		$("#btnAnsCheck").prop("disabled", true);
		$("#flowAns").prop("disabled", true);
		checkAns = 0;
		//	v2_t.hide();
		$("#flowAns").val("");
//		m.hide();
		m.remove();
		var n = paper.text(x + 500, y + 350, "(V2)").attr({ 'font-size': 20, 'font-weight': 'bold' });
		n.animateWith(control_button2, null, { "font-size": 20, "fill": "black" });

		//console.log("value of height1" + ht);

		if(checkDrain == 0){ 
		if (ht > 0) {
			WT_on(x, y);
			drain_off(x, y);

			if (weight > 10) {
				WT_on(x, y);
				var b = paper.path('M' + (x + 550) + ' ' + (y + 158) + 'l 0 0').attr({ 'stroke': 'white', 'stroke-width': '126' });
				level = b.animate({
					path: "M" + (x + 550) + " " + (y + 158) + "  l 0  150", 'stroke-width': '126', 'stroke': 'white',
					opacity: 1
				},  500);
				if (ht2 > 0) {
					tank_fillV2(x, y);
					setTimeout(function() { WT_off(x, y) }, 500);
					
				}
				else {
					
				}
				ht = 0, ht2 = 0;
				water_weight_dec();
			}	
			
		}
			
		LT_V2(x, y);
		};
		
	if(checkDrain == 1){ 
		v2Check = 1;
		if (ht > 0) {
			WT_on(x, y);
			drain_off(x, y);

			if (weight > 10) {
				WT_on(x, y);
				var b = paper.path('M' + (x + 550) + ' ' + (y + 158) + 'l 0 0').attr({ 'stroke': 'white', 'stroke-width': '126' });
				level = b.animate({
					path: "M" + (x + 550) + " " + (y + 158) + "  l 0  150", 'stroke-width': '126', 'stroke': 'white',
					opacity: 1
				},  500);
				if (ht2 > 0) {
					tank_fillV2(x, y+150-ht2);
					
					 paper.text(x + 635, y + 425, ' ').attr({ 'font-size': 20 });
					 paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
					paper.text(x + 635, y + 425, pp+'%').attr({ 'font-size': 20 });
					
					setTimeout(function() { WT_off(x, y) }, 500);
					
				}
				else {
					
				}
				ht = 0, ht2 = 100;
				water_weight_dec();
			}	
			
		}
		
		};
		
	

	

		paper.rect(x + 670, y + 180, 100, 50).attr({ 'stroke-width': '1', 'fill': 'white' }).toFront();

		paper.rect(x + 150, y - 100, 80, 50).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
		var text_LT = paper.text(x + 190, y - 80, 0).attr({ 'font-size': 20 });
		drain_off(x, y);

		paper.rect(x + 350, y - 100, 80, 50).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
		text_LT = paper.text(x + 390, y - 80, 0).attr({ 'font-size': 20 });

		countwt = countwt + 1;
		V2_click_counter++;
		}else{
			  alert("check answer first ...");
			  
			}

	});
	function tableCreationOnSubmit()
	{
		
		
		
		let wtc = Math.round(weight_correct);
		let wt = Math.round(weight);
		let mp = Math.round(Magne_pulses);
		let turbine = Math.round(turbine_pulses_corr);
		let error = Math.round(wterr - weight_correct);
		let flowI = ft.toFixed(3);
		let flowErr = ft - xf ;
//		console.log("json in flow" + flowI);
		
		wtJson = {};
		wtJson.flow = xf.toFixed(2);
		wtJson.time = time1;
		wtJson.wtc = weight_correct;
		wtJson.wt = weight;
		wtJson.percent = pp;
		wtJson.tpc = parseInt(turbine_pulses_corr);
		wtJson.ef = p.toFixed(2);
		//console.log(" original Error "+ error);
		
		if(error<0)
		{
			if(error % 2 !=0)
			{
				wtJson.err1 = error-1;
				//console.log("add wtJson.err1  "+ wtJson.err1 );
			}
			else
			{	wtJson.err1 = error;
			//console.log("wtJson.err1  "+ wtJson.err1 );
			}
				
		}
			
		else if(error>0)
			{
				if(error % 2 !=0)
				{	
					wtJson.err1 = error+1;
					//console.log("add wtJson.err1  "+ wtJson.err1 );
				}
				else
				{	
					wtJson.err1 = error;	
				//console.log("wtJson.err1  "+ wtJson.err1 );
				}
			}
		else if(error==0){
			wtJson.err1 = error+1;
		}
		
			
		wtJson.tp = pulseInt;
		wtJson.iFlowt = flowI;
		wtJson.iFlow = ft;
		wtJson.flowError = flowErr.toFixed(3);
//		var minuspulwt=(parseInt(wtJson.wtc) + parseInt(wtJson.err1));
//		if(wtJson.err1>0){
//			wtJson.pulwt =wtJson.wtc-wtJson.err1;
//			console.log("wtc " + wtJson.wtc);
//			console.log("Pulwt " + wtJson.pulwt);
//		}
//		else
//			{
//		wtJson.pulwt =minuspulwt;
//		console.log("wtc " + wtJson.wtc);
//		console.log("Pulwt " + wtJson.pulwt);
//			}
//		
//		
		var minuspulwt=(parseInt(wtJson.wtc) + parseInt(wtJson.err1));
		wtJson.pulwt =minuspulwt;
		//console.log("Flow " + wtJson.flow);
		arrayJson.push(wtJson);
		var table = "";

		//console.log(arrayJson);
		masterJson.demo = arrayJson;
		for (var i = 0; i < masterJson.demo.length; i++) {
		pulses[i]= masterJson.demo[i].tp; 
		}
		console.log("pulses  "+pulses);
		$("#tableDesign").html("");
		masterJson.demo.sort(function(a, b){
		    return a.tp - b.tp;
		});

		
		var tableMainDiv = '<br><div class="row" id="tableDesign">'
		table = '<table class="table table-dark" style="margin-left:15px;margin-right:15px;">'
			+ ' <thead>'
			+ '  <tr>'
			+ '   <th scope="col">Magnetic Standard Flow(lit/sec)</th>'
			+ '  <th scope="col">Instantaneous Flow(lit/sec)</th>'
			+ '    <th scope="col">Weight(Grams)</th>'
			+ '    <th scope="col">Pulses</th>'
			+ '   </tr>'
			+ '  </thead>'
			+ '   <tbody>'
		for (var i = 0; i < masterJson.demo.length; i++) {
			table += '    <tr>'

				+ '   <td>' + masterJson.demo[i].flow + '</td>'
				+ '   <td>' + masterJson.demo[i].iFlowt + '</td>'
				+ '    <td>' + parseInt(masterJson.demo[i].wt) + '</td>'
				+ '    <td>' + masterJson.demo[i].tp + '</td>'
				+ '     </tr>'
				
		}
		table += ' </tbody>'
			+ '  </table>'

		$("#main-div-conf").append(tableMainDiv);
		$("#tableDesign").html(table);
		var submit = '<div class="row container">'

			+ '<div class="col-sm-12">'
			+ '<button type="button"  class="btn btn-primary btnStyle" id="showGraph"  > GRAPH</button>'
			+ '</div>'
			+ '</div>'

		$("#tableDesign").append(submit);
		
		var read = "";
		$("#showGraph").click(function() {
			if (masterJson.demo.length >= 6) {
				graphCreation(masterJson);
				$("#main-div-conf").html('');

				tableCreation(masterJson);
				$("#spanError").hide();
				$("#Linerality").hide();
				$("#accuracy").hide();
				
				$("#errorZeroAlert").hide();
				$("#spanErrorAlert").hide();
				$("#zeroErrorAlert2").hide();
				$("#plusMinusCalibrationZero").hide();
				$("#plusMinusCalibrationSpan").hide();
				
				$("#linearAlgo1").hide();
				$("#linearAlgo2").hide();
				$("#linearAlgo3").hide();
				
				
				$("#algorithmAlert1").hide();
				$("#algorithmAlert2").hide();
				$("#algorithmAlert3").hide();
				$("#algorithmAlertDanger2").hide();
				
				
				$("#zeroPanel").hide();
				$("#spanPanel").hide();
				$("#algo1Panel").hide();
				$("#algo2Panel").hide();
				$("#algo3Panel").hide();
				
				$("#success").hide();
			}
		 else {
			alert("take at list 6 readings...");
		}
			
			
		});
		
	}
	
	
	var chart="";
	var tpcArr=[];
	function graphCreation(masterJson){
		
			$("#canvas-div").html("");
			$("#canvas-div").css("height", '10');
			$("#canvas-div").css("width", '10');
//			$("#container panel-body").html("");
//			$('.container panel-body').removeAttr('width');
//			$('.container panel-body').removeAttr('height');
//			$("#container-graph1").css("height", '500');
			$("#container-graph1").css("width", '800');
//			$("#container-graph2").css("height", '500');
			$("#container-graph2").css("width", '800');

			

			for (var i = 0; i < masterJson.demo.length; i++) {
				xdata[i] = parseInt(masterJson.demo[i].wt);
				ydata[i] = parseInt(masterJson.demo[i].pulwt);
				tpcArr[i]= parseInt(masterJson.demo[i].wtc);
			}

//			tempArr = [];
//			tempArr[0] = 0;
//			tempArr[1] = 0;
//			graphData.push(tempArr);
			for (var j = 0; j < masterJson.demo.length; j++) {
				tempArr = [];
				tempArr[0] = xdata[j];
				tempArr[1] = ydata[j];

				graphData.push(tempArr);

			}
			ydata.sort(function(a, b) { return a - b });
			xdata.sort(function(a, b) { return a - b });
			tpcArr.sort(function(a, b) { return a - b });
//			console.log(" Weight(Gram) & pulses  graphData X " + xdata);
//			console.log(" Weight(Gram) & pulses  graphData Y" + ydata);
//			console.log(" Weight(Gram) & pulses  tpc arrary  " + tpcArr);
//			console.log(" Weight(Gram) & pulses  tpcArr max " + tpcArr[tpcArr.length - 1]);
		
		
			XaxisminW=xdata[0];
			XaxismaxW=xdata[ydata.length - 1];
			YaxisminP=ydata[0];
			YaxismaxP=ydata[ydata.length - 1];
			tpcArrMin=tpcArr[0];
			tpcArrMax=tpcArr[tpcArr.length - 1];
			
//			console.log(" XaxisminW " + XaxisminW);
//				console.log(" XaxismaxW   " + XaxismaxW);
//				console.log(" YaxisminP " + YaxisminP);
//					console.log(" YaxismaxP   " + YaxismaxP);
//					console.log(" tpcArrMin " + tpcArrMin);
//					console.log(" tpcArrMax   " + tpcArrMax);
					var varifiedMin=0;
					var varifiedMax=0;
					if(YaxisminP<tpcArrMin)
						{
						varifiedMin=YaxisminP;
						}
					else
						{
						varifiedMin=tpcArrMin;
						}
					
					if(YaxismaxP<tpcArrMax)
					{
						varifiedMax=tpcArrMax;
					}
				else
					{
					varifiedMax=YaxismaxP;
					}
					
//					console.log(" varifiedMin " + varifiedMin);
//					console.log(" varifiedMax   " + varifiedMax);
			 chart=Highcharts.chart('container-graph1', {
//			    chart: {
//			      type: 'bar'
//			    },
			
				title: {
					text: ' Graph of Weight(Gram) & pulses of turbine flow meter '
				},
				subtitle: {
					text: 'Meter Constant is ' + supplierConstaint + ' pulses (per/ltr)'
				},
				xAxis: {
					min: XaxisminW,
					max: XaxismaxW,
					title: {
						text: 'Weight'
					}
				},
				yAxis: {
					min: varifiedMin,
					max: varifiedMax,
					title: {
						text: 'Pulses'
					}
				},
				series: [
					{
						type: 'line',
						name: 'Standard value',
						data: [[XaxisminW, tpcArrMin], [XaxismaxW, tpcArrMax]],
						marker: {
							enabled: false
						},
						states: {
							hover: {
								lineWidth: 0
							}
						},
						enableMouseTracking: false
					},
					{
						type: 'scatter',
						name: 'Observation value',

						data: graphData,
						marker: {
							radius: 4
						}
					}]
			});
			 var graphData1=[];
			//Turbine Flow graph
		

			for (var i = 0; i < masterJson.demo.length; i++) {
				xdata[i] = parseFloat(masterJson.demo[i].flow);
				temp = masterJson.demo[i].iFlow;
				ydata[i] = parseFloat(temp.toFixed(3));
			}

//			tempArr = [];
//			tempArr[0] = 0;
//			tempArr[1] = 0;
//			graphData1.push(tempArr);
			for (var j = 0; j < masterJson.demo.length; j++) {
				tempArr = [];
				tempArr[0] = xdata[j];
				tempArr[1] = ydata[j];
				graphData1.push(tempArr);

			}
			ydata.sort(function(a, b) { return a - b });
			xdata.sort(function(a, b) { return a - b });
			Xmax = parseFloat(xdata[xdata.length - 1]);
			Ymax = parseFloat(ydata[ydata.length - 1]);
			//console.log(" turbine flow meter & magnatic flow meter  " + graphData1);
			Highcharts.chart('container-graph2', {
				title: {
					text: ' Graph of turbine flow meter & magnatic flow meter '
				},
				subtitle: {
					text: 'Meter Constant is ' + supplierConstaint + ' pulses (per/ltr)'
				},
				xAxis: {
					min: 0.01,
					max: Xmax,
					title: {
						text: 'Magnatic flow meter'
					}
				},
				yAxis: {
					min: 0.01,
					max: Ymax,
					title: {
						text: 'Turbine flow meter'
					}
				},
				series: [
					{
						type: 'line',
						name: 'Standard value',
						data: [[0.01, 0.01], [Xmax, Ymax]],
						marker: {
							enabled: false
						},
						states: {
							hover: {
								lineWidth: 0
							}
						},
						enableMouseTracking: false
					},

					{
						type: 'scatter',
						name: 'Observation value',

						data: graphData1,
						marker: {
							radius: 4
						}
					}]

			});
			
			console.log(masterJson);
		
	}
	
	function tableCreation(masterJson) {
		$("#centerText1").html('CALIBRATION');
		table = '<table class="table  table-dark" >'
			+ ' <thead>'
			+ '  <tr  >'
			+ '   <th colspan="4" class="" ><center>Meter Constant is ' + supplierConstaint + ' pulses (per/ltr)</center></th>'
			+ '  </tr>'
			+ '  <tr>'
			+ '   <th scope="col">Magnetic Standard Flow(lit/sec)</th>'
			+ '  <th scope="col">Instantaneous Flow(lit/sec)</th>'
			+ '    <th scope="col">Weight(Grams)</th>'
			+ '    <th scope="col">Pulses</th>'
			+ '   </tr>'
			+ '  </thead>'
			+ '   <tbody>'
		for (var i = 0; i < masterJson.demo.length; i++) {
			table += '    <tr>'

				+ '   <td>' + masterJson.demo[i].flow + '</td>'
				+ '   <td>' + masterJson.demo[i].iFlowt + '</td>'
				+ '    <td>' + parseInt(masterJson.demo[i].wt) + '</td>'
				+ '    <td>' + masterJson.demo[i].tp + '</td>'
				+ '     </tr>'
				
		}
		table += ' </tbody>'
			+ '  </table>'
		$("#main-div-conf").html(table);
		calibration(masterJson);
	
		
	}
	var zeroErrorDiv="";
	var flagZeroErrorAttend=0;
	function calibration(masterJson) {
		var error = '<div class="row " >'
			+ '<div class=" col-sm-3" id="zeroError">'
			+ ' <label >ZERO ERROR<i class="fa fa-check" id="iconCorrectZero" aria-hidden="true" style="color:green;margin-left:10px;" ></i></label>'
			+ ' <input type="number"  class="form-control" id="textZeroError" data-toggle="tooltip" title="Hooray!">'
			+ '<br>'
			+ '<button type="button"  class="btn btn-primary btnStyle" id="submitZeroError" data-toggle="modal" data-target="#myModal" > SUBMIT</button>'
//			 +'<div class="row">'
//			   +'<div class="col-sm-12">'
//			   +'<button type="button" class="btn btn-danger btnStyle" id="checkConfg" data-toggle="modal" data-target="#myModal" disabled>CHECK CONFIGURATION </button>'
//			   +'<div class="modal fade" id="Errors" role="dialog">'
//			   +'<div class="modal-dialog">'
//			   +'<!-- Modal content-->'
//			   +' <div class="modal-content">'
//			   +'<div class="modal-header bg-info"  >'
//			  
//			   +'<h4 class="modal-title">Message box</h4>'
//			   +'<button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
//			   +'</div>'
//			   +'<div class="modal-body" id="ErrorsMsg" >'
//			 
//			   
//			   +'</div>'
//			   +'<div class="modal-footer">'
//			   +'<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
//			   +'</div>'
//			   +'</div>'
//			   +'</div>'
//			   +'</div>'
//			   +'</div>'
//			   +'</div>'
//			+'</div>'
			+ '</div>'
			+ '<div class=" col-sm-3" id="spanError" >'
			+ ' <label >SPAN ERROR<i class="fa fa-check" id="iconCorrectSpan" aria-hidden="true" style="color:green;margin-left:10px;" ></i> </label>'
			+ ' <input type="number"  class="form-control" id="textSpanError"  title="Hooray!">'
			+ '<br>'
			+ ' <button type="button" class="btn btn-primary btnStyle" id="submitSpanError" data-toggle="modal" data-target="#myModal">SUBMIT</button>'
			+ '</div>'
			+ '<div class=" col-sm-3"  id="Linerality">'
			+ ' <label >LINEARITY <i class="fa fa-check" id="iconCorrectLinerality" aria-hidden="true" style="color:green;margin-left:10px;" ></i> </label>'
			+ ' <input type="text"  class="form-control"  id="textLineralityeError"  title="Hooray!">'
			+ '<br>'
			+ ' <button type="button" class="btn btn-primary btnStyle" id="lineralitySubmit" data-toggle="modal" data-target="#myModal" >SUBMIT</button>'
			+ '</div>'
			+ '<div class=" col-sm-3"  id="accuracy">'
			+ ' <label >ACCURACY (%)<i class="fa fa-check" id="iconCorrectAccuracy" aria-hidden="true" style="color:green;margin-left:10px;" ></i></label>'
			+ ' <input type="text"  class="form-control"  id="textaccuracy"  title="Hooray!">'
			+ '<br>'
			+ ' <button type="button" class="btn btn-primary btnStyle" id="accuracySubmit" data-toggle="modal" data-target="#myModal">SUBMIT</button>'
			+ '</div>'
			
			+ '</div>'
			+'<br>'
			+ '<div class=" col-sm-4" id="CalibrateCheckbox">'
			+ '<div class=" form-check">'
			+ '  <label class=" form-check-label" for="flexRadioDefault1">'
			+ ' <h5 style="color:red;"> DO YOU WANT TO CALIBRATE ?  '
			+ '  <input class=" form-check-input" type="radio" name="flexRadioDefault" id="CalibrateRadiobox" style="margin-left:20px;"></h5>'
			+ '  </label>'
			
			+ '</div>'
			+ '</div>'
			+ '</div>'
			
			+'<br>'
			
			
		$("#main-div-conf").append(error);
		$("#iconCorrectZero").hide();
		$("#iconCorrectSpan").hide();
		$("#iconCorrectLinerality").hide();
		$("#iconCorrectAccuracy").hide();
		$("#CalibrateCheckbox").hide();
		var plusMinus='<br><br>'
			+'<div class="row cantainer " id="calibrationPanel">'
				+'<div class="col-sm-4 " id="zeroPanel" >'
					+'<div class="panel panel-primary">'
				      +' <div class="panel-heading">ZERO ERROR</div>'
				     	+' <div class="panel-body" id="plusMinusCalibrationZero">'
					      	+'<img src="images/minus.png" class="imgPlusMinus1 img-fluid" id="minusZero"></img>'
							+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="knobZero"></img>'
							+'<img src="images/plus.png" class="imgPlusMinus1 img-fluid" id="plusZero"></img>'
						 +'</div>'
						 +'<div class="alert alert-success" role="alert"  id="errorZeroAlert">'
							+' <b id="errorZeroText">Zero Adjusted Successfully ...</b>'
						+'</div>'
					 +'</div>'
			 +'</div>'
			+'<div class="col-sm-4 "   id="spanPanel" >'
					+'<div class="panel panel-primary">'
				      +' <div class="panel-heading">SPAN ERROR</div>'
				     	+' <div class="panel-body" id="plusMinusCalibrationSpan">'
					     	+'<img src="images/minus.png"class="imgPlusMinus1 img-fluid"  id="minusMax"></img>'
							+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="knobSpan"></img>'
							+'<img src="images/plus.png"  class="imgPlusMinus1 img-fluid" id="plusMax"></img>'
						+'</div>'
						+'<div class="alert alert-success" role="alert"  id="spanErrorAlert" >'
							+' <b id="spanErrorText">Span Adjusted Successfully ...</b>'
						+'</div>'
						+'<div class="alert alert-danger" role="alert"  id="zeroErrorAlert2">'
							+' <b id="zeroErrorText2">But zero disturbs ...</b>'
						+'</div>'
				     +'</div>'
			+'</div>'
			+'<div class="col-sm-4 "  id="algo1Panel">'
				+'<div class="panel panel-primary">'
					+' <div class="panel-heading">LINEARITY ALGORITHM - 1</div>'
						+' <div class="panel-body" id="linearAlgo1">'
				     		+'<img src="images/minus.png"class="imgPlusMinus1 img-fluid"  id="minusLinearAlgo1"></img>'
							+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="LinearAlgoKnob1"></img>'
							+'<img src="images/plus.png"  class="imgPlusMinus1 img-fluid" id="plusLinearAlgo1"></img>'
						+'</div>'
						+'<div class="alert alert-success" role="alert"  id="algorithmAlert1">'
						+' <b id="algorithmText1">Algorithm - 1 Adjusted Successfully ...</b>'
						+'</div>'
			       +'</div>'
			+'</div>'
		 +'</div>' 
		 +'<div class="row ">'
				+'<div class="col-sm-4 " id="algo2Panel">'
					+'<div class="panel panel-primary">'
				      +' <div class="panel-heading">LINEARITY ALGORITHM - 2</div>'
				     	+' <div class="panel-body" id="linearAlgo2">'
					     
							+'<img src="images/minus.png"class="imgPlusMinus1 img-fluid"  id="minusLinearAlgo2"></img>'
							+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="LinearAlgoKnob2"></img>'
							+'<img src="images/plus.png"  class="imgPlusMinus1 img-fluid" id="plusLinearAlgo2"></img>'
						+'</div>'
						+'<div class="alert alert-success" role="alert"  id="algorithmAlert2">'
						+' <b id="errorZeroText2">Algorithm - 2 Adjusted Successfully ...</b>'
						+'</div>'
						+'<div class="alert alert-danger" role="alert"  id="algorithmAlertDanger2">'
						+' <b id="zeroErrorText2">But Algorithm -1 is disturbs set all point into 3 Algorithm...</b>'
					+'</div>'
					+'</div>'
			    +'</div>'
			    +'<div class="col-sm-4 " id="algo3Panel">'
					+'<div class="panel panel-primary">'
				      +' <div class="panel-heading">LINEARITY ALGORITHM - 3</div>'
				     		+' <div class="panel-body" id="linearAlgo3">'
						     	
								+'<img src="images/minus.png"class="imgPlusMinus1 img-fluid"  id="minusLinearAlgo3"></img>'
								+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="LinearAlgoKnob3"></img>'
								+'<img src="images/plus.png"  class="imgPlusMinus1 img-fluid" id="plusLinearAlgo3"></img>'
							+'</div>'
							+'<div class="alert alert-success" role="alert"  id="algorithmAlert3">'
							+' <b id="spanErrorText2">Algorithm - 3 Adjusted Successfully ...</b>'
							+'</div>'
					+'</div>'
				+'</div>'
				
			
			+'</div>'
//			 +'<div class="row " id="success">'
//			 +'<b style="font-size:30px">Hurry your task is completed.... go home</b>'
//			 +'</div>'
		
			$("#main-div-conf").append(plusMinus);
			

		var rotate=0;
		var minusZeroValue=parseInt(masterJson.demo[0].err1/5);
		$("#minusZero").click(function() {
			var ydataPulse=[];
		
//			console.log("minusZeroValue  "+minusZeroValue);
			$("#canvas-div").html(" ");
			$("#knobZero").css({ transform: 'rotate('+rotate+'deg)' });
			var TPC=parseInt(masterJson.demo[0].wtc);
			var TP=parseInt(masterJson.demo[0].pulwt);
			var error=parseInt(masterJson.demo[0].err1);
			 console.log("TPC "+TPC+" TP "+TP);
			
			 
			 
				for(i=0;i< masterJson.demo.length;i++){
						 if(TP==TPC ||TP==TPC-1 || TP==TPC-2 || TP==TPC-3 || TP==TPC+4 ||TP==TPC+1 || TP==TPC+2 || TP==TPC+3|| TP==TPC-4)
						 {
							    console.log("TPC "+TPC+" TP "+TP);
							   $("#plusMinusCalibrationZero").html("");
							   $("#plusMinusCalibrationSpan").show();
							   $("#errorZeroAlert").show();
								$("#spanPanel").show();
								$(".highcharts-point").css("fill", "red");
							 temp= parseInt(masterJson.demo[i].pulwt);
							ydataPulse[i]=masterJson.demo[i].pulwt=temp;
							
						 }
						 
						 else{
							 temp= parseInt(masterJson.demo[i].pulwt)-5;
							ydataPulse[i]=masterJson.demo[i].pulwt=temp;
							
						 }
					}	

			var chart = $('#container-graph1').highcharts();
	        chart.series[1].setData(ydataPulse, false);
	        $('#container-graph1').highcharts().redraw();
	        
	       
			 rotate-=10;
		});
//		plusZeroValue=parseInt(masterJson.demo[0].err1)/5;
		$("#plusZero").click(function() {
			var ydataPulse=[];
			var minusVlaue=0;
			$("#canvas-div").html(" ");
			$("#knobZero").css({ transform: 'rotate('+rotate+'deg)' });
			var TPC=parseInt(masterJson.demo[0].wtc);
			var TP=parseInt(masterJson.demo[0].pulwt);
	
		//	console.log("TPC "+TPC);
		//	console.log("TP "+TP);
				
			
					for(i=0;i<masterJson.demo.length;i++){
						
					
							 if(TP==TPC ||TP==TPC-1 || TP==TPC-2 || TP==TPC-3 || TP==TPC+4 ||TP==TPC+1 || TP==TPC+2 || TP==TPC+3|| TP==TPC-4)
							{
	
								$("#plusMinusCalibrationZero").html("");
								$("#errorZeroAlert").show();
								$("#plusMinusCalibrationSpan").show();
									flagZeroErrorAttend=2;
									$("#spanPanel").show();
									$(".highcharts-point").css("fill", "red");
								 temp= parseInt(masterJson.demo[i].pulwt);
								ydataPulse[i]=masterJson.demo[i].pulwt=temp;
						 }
							
						else
						{
							 temp= parseInt(masterJson.demo[i].pulwt)+5;
							 ydataPulse[i]=masterJson.demo[i].pulwt=temp;
							
						}
					}
					
		var chart = $('#container-graph1').highcharts();
        chart.series[1].setData(ydataPulse, false);
        $('#container-graph1').highcharts().redraw();
	
				 
			
			 rotate+=10;
			
		});
		
		$("#minusMax").click(function() {
			var ydataPulse=[];
			var ydataTurbine=[];
			var length= masterJson.demo.length-1;
			$("#canvas-div").html(" ");
			$("#knobSpan").css({ transform: 'rotate('+rotate+'deg)' });
			minusZeroValue=parseInt(masterJson.demo[length].err1/5);
			var TPC=parseInt(masterJson.demo[length].wtc);
			var TP=parseInt(masterJson.demo[length].pulwt);
			//console.log("TPC "+TPC+" plus minus");
			//console.log("TP "+TP+" plus minus");
			 for(i=0;i< masterJson.demo.length;i++){
				
				 if(TP==TPC ||TP==TPC-1 || TP==TPC-2 || TP==TPC-3 || TP==TPC+4 ||TP==TPC+1 || TP==TPC+2 || TP==TPC+3|| TP==TPC-4)
					 {
					 //console.log("TPC "+TPC+" TP "+TP);
					    $("#plusMinusCalibrationSpan").hide();
					    $("#zeroErrorAlert").hide();
					    $("#errorZeroAlert").hide();
						$("#spanLabel").hide();
						$("#zeroPanel").show();
						 $("#spanErrorAlert").show();
						$("#zeroErrorAlert2").show();
						
					 $("#plusMinusCalibrationZero").html("");
					 var str='<img src="images/minus.png" class="imgPlusMinus1 img-fluid" id="minusZero2"></img>'
						+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="knobZero2"></img>'
						+'<img src="images/plus.png" class="imgPlusMinus1 img-fluid" id="plusZero2"></img>'
						 $("#plusMinusCalibrationZero").html(str);
					
					 temp= parseInt(masterJson.demo[i].pulwt);
					 ydataPulse[i]=masterJson.demo[i].pulwt
				
					 
					 }
				
				 else{
							 temp= parseInt(masterJson.demo[i].pulwt)-10;
							ydataPulse[i]=masterJson.demo[i].pulwt=temp;
				 }
			 }	

				 var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			          $('#container-graph1').highcharts().redraw();

			
			 rotate-=10;
			 $("#plusZero2").click(function() {
				 	var ydataPulse=[];
					var ydataTurbine=[];
					
					$("#canvas-div").html(" ");
					$("#knobZero2").css({ transform: 'rotate('+rotate+'deg)' });
					
					var TPC=parseInt(masterJson.demo[0].wtc);
					var TP=parseInt(masterJson.demo[0].pulwt);
					minusZeroValue=parseInt(masterJson.demo[0].err1/5);
					// console.log("TPC "+TPC+" TP "+TP);
					for(i=0;i< masterJson.demo.length;i++){
						 
						if(masterJson.demo.length-1==i)
						{
							ydataPulse[i]=masterJson.demo[i].pulwt=parseInt(masterJson.demo[i].wtc);
						
						}
						else if(TP==TPC ||TP==TPC-1 || TP==TPC-2 || TP==TPC-3 || TP==TPC+4 ||TP==TPC+1 || TP==TPC+2 || TP==TPC+3|| TP==TPC-4)
						{
							temp= parseInt(masterJson.demo[i].pulwt);
							ydataPulse[i]=masterJson.demo[i].pulwt=temp;
							
							$("#spanErrorAlert").show();
								$("#linearAlgo1").show();
								$("#errorZeroAlert").show();
								 $("#zeroErrorAlert").show();
								$("#spanLabel").hide();
								$("#plusMinusCalibrationZero").html("");
								$("#algo1Panel").show();
								
								$("#zeroErrorAlert2").hide();
							 }
						
						 else{
									 temp= parseInt(masterJson.demo[i].pulwt)+10;
									ydataPulse[i]=masterJson.demo[i].pulwt=temp;
									
						 }
					 }	
					var chart = $('#container-graph1').highcharts();
					chart.series[1].setData(ydataPulse, false);
					 $('#container-graph1').highcharts().redraw();

					
					 rotate+=10;
			 });
			 $("#minusZero2").click(function() {
				 	var ydataPulse=[];
					var ydataTurbine=[];
					minusZeroValue=parseInt(masterJson.demo[0].err1/5);
					 console.log("TPC "+TPC+" TP "+TP);
					$("#canvas-div").html(" ");
					$("#knobZero2").css({ transform: 'rotate('+rotate+'deg)' });
					
					var TPC=parseInt(masterJson.demo[0].wtc);
					var TP=parseInt(masterJson.demo[0].pulwt);
					for(i=0;i< masterJson.demo.length;i++){
						 
						if(masterJson.demo.length-1==i)
						{
							ydataPulse[i]=masterJson.demo[i].pulwt=parseInt(masterJson.demo[i].wtc);
							
						}
						
						else if(TP==TPC ||TP==TPC-1 || TP==TPC-2 || TP==TPC-3 || TP==TPC+4 ||TP==TPC+1 || TP==TPC+2 || TP==TPC+3|| TP==TPC-4)
						{
							temp= parseInt(masterJson.demo[i].pulwt);
							ydataPulse[i]=masterJson.demo[i].pulwt=temp;	
							$("#spanErrorAlert").show();
								$("#linearAlgo1").show();
								$("#errorZeroAlert").show();
								 $("#zeroErrorAlert").show();
								$("#spanLabel").hide();
								$("#plusMinusCalibrationZero").html("");
								
								$("#algo1Panel").show();
								$("#zeroErrorAlert2").hide();
							 }
						
						 else{
									 temp= parseInt(masterJson.demo[i].pulwt)-10;
									ydataPulse[i]=masterJson.demo[i].pulwt=temp;
						 }
					 }	

						 var chart = $('#container-graph1').highcharts();
					        chart.series[1].setData(ydataPulse, false);
					          $('#container-graph1').highcharts().redraw();

					
					 rotate-=10;
			 });
			 
			 
		});
		$("#plusMax").click(function() {

			var ydataPulse=[];
			var ydataTurbine=[];
			var length= masterJson.demo.length-1;
			$("#canvas-div").html(" ");
			$("#knobSpan").css({ transform: 'rotate('+rotate+'deg)' });
			
			var TPC=parseInt(masterJson.demo[length].wtc);
			var TP=parseInt(masterJson.demo[length].pulwt);
			
			// console.log("TPC "+TPC+" TP "+TP);
			 for(i=0;i< masterJson.demo.length;i++){
				
				
					 
				 if(TP==TPC ||TP==TPC-1 || TP==TPC-2 || TP==TPC-3 || TP==TPC+4 ||TP==TPC+1 || TP==TPC+2 || TP==TPC+3|| TP==TPC-4)
					 {
					// console.log("TPC "+TPC+" TP "+TP);
					    $("#plusMinusCalibrationSpan").hide();
					    $("#zeroErrorAlert").hide();
					    $("#errorZeroAlert").hide();
						$("#spanLabel").hide();
						$("#zeroPanel").show();
						 $("#spanErrorAlert").show();
						$("#zeroErrorAlert2").show();
						
					 $("#plusMinusCalibrationZero").html("");
					 var str='<img src="images/minus.png" class="imgPlusMinus1 img-fluid" id="minusZero2"></img>'
						+'<img src="images/moveButton.png" class="imgPlusMinus img-fluid img-circle" id="knobZero2"></img>'
						+'<img src="images/plus.png" class="imgPlusMinus1 img-fluid" id="plusZero2"></img>'
						 $("#plusMinusCalibrationZero").html(str);
					
					 temp= parseInt(masterJson.demo[i].pulwt);
					ydataPulse[i]=masterJson.demo[i].pulwt
				 }
				 
				 else{
							 temp= parseInt(masterJson.demo[i].pulwt)+10;
							ydataPulse[i]=masterJson.demo[i].pulwt=temp;
						
				 }
			 }	

				 var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			          $('#container-graph1').highcharts().redraw();

			
			 rotate+=10;
			 console.log(" After Span And Zero " +masterJson);
				 
			 
		});
		
		
		$("#minusLinearAlgo1").click(function() {
			var greaterCounter=0;
			var ydataPulse=[];
			var TPC=0;
			var TP=0;
			$("#canvas-div").html(" ");
			$("#LinearAlgoKnob1").css({ transform: 'rotate('+rotate+'deg)' });
			for(i=0;i< masterJson.demo.length;i++){
				
				 TPC=parseInt(masterJson.demo[i].wtc);
				 TP=parseInt(masterJson.demo[i].pulwt);
				 if(TP>TPC)
					 {
					 greaterCounter++;
					 }
			}
			console.log("greaterCounter "+greaterCounter);
			for(i=0;i< masterJson.demo.length;i++){
				
				 TPC=parseInt(masterJson.demo[i].wtc);
				 TP=parseInt(masterJson.demo[i].pulwt);
				 var minusValue=parseInt(TP/50);
				 var error =parseInt(masterJson.demo[i].err1);
				console.log("algo 1 TPC "+TPC+" TP "+TP);
				if(i==0)
				{
					ydataPulse[i]=masterJson.demo[i].pulwt=parseInt(masterJson.demo[i].wtc);

				}
			    else if(masterJson.demo.length-1==i)
				{
					ydataPulse[i]=masterJson.demo[i].pulwt=parseInt(masterJson.demo[i].wtc);

				}
			    else if(error>0)
			    {
					if(TP>TPC)
					{
						temp= parseInt(masterJson.demo[i].pulwt)-minusValue;
						ydataPulse[i]=masterJson.demo[i].pulwt=temp;

			    	}
					else if(TP<=TPC)
					{
						ydataPulse[i]=masterJson.demo[i].pulwt=TPC;
						greaterCounter--;
						console.log("greaterCounter "+greaterCounter);
					}	
			    
			    }
				else
		    	{
			    	temp= parseInt(masterJson.demo[i].pulwt)-minusValue;
			    	ydataPulse[i]=masterJson.demo[i].pulwt=temp;
		    	}
				if(greaterCounter==0)
				{console.log("greaterCounter "+greaterCounter);
					$("#linearAlgo1").hide();
					$("#linearAlgo2").show();
					$("#algorithmAlert1").show();
					$("#algoPanel").show();
					$("#algo2Panel").show();
				}

			}
					var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			        $('#container-graph1').highcharts().redraw();
					 rotate-=10;
			
		});
//		var position=[];
		$("#plusLinearAlgo1").click(function() {
			
			var ydataPulse=[];
			var ydataTurbine=[];
			$("#canvas-div").html(" ");
			$("#LinearAlgoKnob1").css({ transform: 'rotate('+rotate+'deg)' });
			
			for(i=0;i< masterJson.demo.length;i++){
				
				var TPC=parseInt(masterJson.demo[i].wtc);
				var TP=parseInt(masterJson.demo[i].pulwt);
				 var minusValue=parseInt(TP/50);
				// console.log("algo 1 TPC "+TPC+" TP "+TP);
				var error=parseInt(masterJson.demo[i].err1);

				
				if(i==0)
				{
				
				ydataPulse[i]=masterJson.demo[i].pulwt=TPC;

				}
				else if(masterJson.demo.length-1==i)
				{
				
				ydataPulse[i]=masterJson.demo[i].pulwt=TPC;

				}
				else if(error<0)
				{
					
						temp= parseInt(masterJson.demo[i].pulwt)+minusValue;
						 ydataPulse[i]=masterJson.demo[i].pulwt=temp;
				}
				else
					{
					temp= parseInt(masterJson.demo[i].pulwt)+minusValue;
					 ydataPulse[i]=masterJson.demo[i].pulwt=temp;
					}
					
			}
					var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			        $('#container-graph1').highcharts().redraw();
					 rotate+=10;
			
			
		});
		// Algorithm -2 
		$("#minusLinearAlgo2").click(function() {
			var ydataPulse=[];
			var ydataTurbine=[];
			$("#canvas-div").html(" ");
			$("#LinearAlgoKnob2").css({ transform: 'rotate('+rotate+'deg)' });
			
			for(i=0;i< masterJson.demo.length;i++){
				
				var TPC=parseInt(masterJson.demo[i].wtc);
				var TP=parseInt(masterJson.demo[i].pulwt);
				 var minusValue=parseInt(TP/50);
				// console.log(" algo 2 TPC "+TPC+" TP "+TP);
				var error=parseInt(masterJson.demo[i].err1);

				
				if(i==0)
				{
				
				ydataPulse[i]=masterJson.demo[i].pulwt=TPC;
			
				}
				else if(masterJson.demo.length-1==i)
				{
				
				ydataPulse[i]=masterJson.demo[i].pulwt=TPC;

				}
				else if(error<0)
				{
					
						temp= parseInt(masterJson.demo[i].pulwt)-minusValue;
						 ydataPulse[i]=masterJson.demo[i].pulwt=temp;
				}
				else
					{
					temp= parseInt(masterJson.demo[i].pulwt)-minusValue;
					 ydataPulse[i]=masterJson.demo[i].pulwt=temp;
					}
					
			}
					var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			        $('#container-graph1').highcharts().redraw();
					 rotate-=10;
			
	
	
		});

		$("#plusLinearAlgo2").click(function() {
			var ydataPulse=[];
			var greaterCounter=0;
			$("#canvas-div").html(" ");
			$("#LinearAlgoKnob2").css({ transform: 'rotate('+rotate+'deg)' });

			for(i=0;i< masterJson.demo.length;i++){
				
				 TPC=parseInt(masterJson.demo[i].wtc);
				 TP=parseInt(masterJson.demo[i].pulwt);
				 if(TP<TPC)
					 {
					 greaterCounter++;
					 }
			}
			console.log("greaterCounter "+greaterCounter);
			for(i=0;i< masterJson.demo.length;i++){
				
				 TPC=parseInt(masterJson.demo[i].wtc);
				 TP=parseInt(masterJson.demo[i].pulwt);
				 var minusValue=parseInt(TP/50);
				 var error =parseInt(masterJson.demo[i].err1);
				//console.log("algo 1 TPC "+TPC+" TP "+TP);
				if(i==0)
				{
					ydataPulse[i]=TP=TPC;

				}
			    else if(masterJson.demo.length-1==i)
				{
					ydataPulse[i]=masterJson.demo[i].pulwt=TPC;

				}
			    else if(error<0)
			    {
					if(TP<TPC)
					{
						temp= TP+minusValue;
						ydataPulse[i]=masterJson.demo[i].pulwt=temp;

			    	}
					else if(TP>=TPC)
					{
						ydataPulse[i]=masterJson.demo[i].pulwt=TPC;
						greaterCounter--;
						console.log("greaterCounter "+greaterCounter);
					}	
			    
			    }
				else
		    	{
			    	temp= parseInt(masterJson.demo[i].pulwt)+minusValue;
			    	ydataPulse[i]=masterJson.demo[i].pulwt=temp;
		    	}
				if(greaterCounter==0)
				{
					console.log("greaterCounter "+greaterCounter);
						$("#linearAlgo2").hide();
						$("#linearAlgo3").show();
						$("#algorithmAlert2").show();
						$("#algo3Panel").show();
						$("#algorithmAlertDanger2").show();
				}

			}
					var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			        $('#container-graph1').highcharts().redraw();
					 rotate+=10;
			
		});
		// Algorithm -3
		var allPointSetOnLine=0;
		$("#minusLinearAlgo3").click(function() {
			var greaterCounter=0;
			var ydataPulse=[];
			var TPC=0;
			var TP=0;
			$("#canvas-div").html(" ");
			$("#LinearAlgoKnob1").css({ transform: 'rotate('+rotate+'deg)' });
			for(i=0;i< masterJson.demo.length;i++){
				
				 TPC=parseInt(masterJson.demo[i].wtc);
				 TP=parseInt(masterJson.demo[i].pulwt);
				 if(TP>TPC)
					 {
					 greaterCounter++;
					 }
			}
			console.log("greaterCounter "+greaterCounter);
			for(i=0;i< masterJson.demo.length;i++){
				
				 TPC=parseInt(masterJson.demo[i].wtc);
				 TP=parseInt(masterJson.demo[i].pulwt);
				 var minusValue=parseInt(TP/50);
				 var error =parseInt(masterJson.demo[i].err1);
				//console.log("algo 1 TPC "+TPC+" TP "+TP);
				if(i==0)
				{
					ydataPulse[i]=masterJson.demo[i].pulwt=TPC;

				}
			    else if(masterJson.demo.length-1==i)
				{
					ydataPulse[i]=masterJson.demo[i].pulwt=TPC;

				}
			    else if(error>0)
			    {
					if(TP>TPC)
					{
						temp= parseInt(masterJson.demo[i].pulwt)-minusValue;
						ydataPulse[i]=masterJson.demo[i].pulwt=temp;

			    	}
					else if(TP<=TPC)
					{
						ydataPulse[i]=masterJson.demo[i].pulwt=TPC;
						greaterCounter--;
						console.log("greaterCounter "+greaterCounter);
					}	
			    
			    }
				else
		    	{
					ydataPulse[i]=masterJson.demo[i].pulwt=TPC;
		    	}
				if(greaterCounter==0)
							{console.log("greaterCounter "+greaterCounter);
							$("#linearAlgo3").hide();
							$("#algorithmAlert3").show();
							$("#success").hide();
							$("#calibrationPanel").html(" ");
							$("#algo3Panel").show();
						 correctionTable(masterJson);
				}

			}
					var chart = $('#container-graph1').highcharts();
			        chart.series[1].setData(ydataPulse, false);
			        $('#container-graph1').highcharts().redraw();
					 rotate-=10; 
				
			});
			var pulseAlgoCounter=0;
			$("#plusLinearAlgo3").click(function() {
				pulseAlgoCounter++;
				if(pulseAlgoCounter>5)
					{
						alert(" Need to click on minus");
					}
						 
				
			});
			function  correctionTable(masterJson)
			{
				$("#CalibrateCheckbox").hide();
				$("#algo2Panel").hide();
				$("#algo3Panel").hide();
				var blink='<div class="row col-sm-12 blink" style="margin:10px;"><center> Zero , Span & Linearity Adjusted successfully   !!!</center> </div>'
				 $("#calibrationPanel").html(blink);
				var tableMainDiv = '<br>'
					
					+'<br>'
					
					+'<div class="col-sm-12" id="tableDesign">'
					+ '<table class=" table table-dark" style="margin:10px;">'
						+ ' <thead>'
						+ '  <tr>'
						+ '   <th scope="col">Magnetic Standard Flow(lit/sec)</th>'
						+ '  <th scope="col">Instantaneous Flow(lit/sec)</th>'
						+ '    <th scope="col">Weight(Grams)</th>'
						+ '    <th scope="col">Pulses</th>'
						+ '   </tr>'
						+ '  </thead>'
						+ '   <tbody>'
					for (var i = 0; i < masterJson.demo.length; i++) {
						tableMainDiv += '    <tr>'

							+ '   <td>' + masterJson.demo[i].flow + '</td>'
							+ '   <td>' + masterJson.demo[i].flow + '</td>'
							+ '    <td>' + parseInt(masterJson.demo[i].wt) + '</td>'
							+ '    <td>' +parseInt(masterJson.demo[i].wtc) + '</td>'
							+ '     </tr>'
					}
				tableMainDiv += ' </tbody>'
						+ '  </table>'
						+'<br><div classcol-sm-12">'
						+'<b>After few months it is observed that Turbine flow meter is not working properly. As a maintenance engineer, please identify and rectify the fault.</b>'
						+'<button type="button" class="btn btn-danger btnStyle" id="ErrorFault" >NEXT LEVEL </button>'
						+'</div>'
						 $("#calibrationPanel").append(tableMainDiv);
				 
				
				
				 
					$("#ErrorFault").click(function() {
						//ResultJson
						
						resultJson.resetExptd = 1;
						resultJson.resetActul = reset_btn_click_counter;
						resultJson.V1Exptd = 1;
						resultJson.V1Actual = V1_click_counter;
						resultJson.V2Exptd = masterJson.demo.length;
						resultJson.V2Actual = V2_click_counter;
						resultJson.pumpExptd = masterJson.demo.length;
						resultJson.pumpActual = pump_click_counter;
						
						resultJson.ExptAnsSubmit = masterJson.demo.length;
						resultJson.ActualAnsSubmit = ActualAnsSubmit;
						resultJson.actualZeroErrorCounter=zeroErrorCounter;
						resultJson.ExptZeroErrorCounter=masterJson.demo.length;
						resultJson.spanErrorCounter=spanErrorCounter;
						resultJson.ExptspanErrorCounter=masterJson.demo.length;
						resultJson.accurancyCounter=accurancyCounter;
						resultJson.ExptAccurancyCounter=masterJson.demo.length;
						resultJson.lineralityCounter=lineralityCounter;
						resultJson.ExptlineralityCounter=masterJson.demo.length;
						
						resultArrayJson.push(resultJson);
						masterResultJson.demo = resultArrayJson;
						mainJson.mimic=resultJson;
						console.log( masterResultJson);
						//End ResultJson
						
						
						
						$("#centerText2").html("FAULT IDENTIFY");
							
							$("#canvas-div").html("");
							$("#canvas-div").css("height", '800');
							$("#canvas-div").css("width", '800');
							
							$("#container-graph1").html("");
							$("#container-graph2").html("");

							var j=0;
							 errorTpye=1;
							 
							var min,max,temp;
							
							
							if(pipeSize == 1) {
						    	  
						    	   min=0.05;
									max=5.8;
							}
						       else if(pipeSize == 2)
						       {
						    	   min=0.22;
									max=2.2;
								 }
						       else if(pipeSize == 3)
						       {
						    	   min=0.52;
									max=5.27;
								}
						       else if(pipeSize == 4)
						       {
						    	   min=0.97;
									max=9.7;
								}
							
							 ErrorTableCreation(min,max,BladeShape, pipeSize, noBlades, time2, materialType, fluidType, supplierConstaint, time1);	
							
								
					
					
							function ErrorTableCreation(min,max,BladeShape, pipeSize, noBlades, time2, materialType, fluidType, supplierConstaint, time1,errorType){
								
								var reading=[];
								var expectedPulses=[];
								var actualPulses=[];
								console.log( masterResultJson);
//								var errorSolveNo[0]=4;
								
								
								var errorType= Math.floor(Math.random() * (4 - 1)) + 1;
							//	console.log(" errorType table " +errorType);
								function readingRandom(min,max) {
								
									
							
								    let temp =parseFloat( Math.floor(Math.random() * (max - min)) + min);
								    let random=temp.toFixed(2);
								    return random;
								}
											

											var tableError='<h3><center style="color:#5c412b;">In this level detect the fault in turbine flow meter</center></h3>'
												+'<h5><center style="color:#5c412b;">The output of the turbine flow meter is as shown in the table. Identify the Fault</center></h5>'
												+'<div class="col-sm-12 col-lg-12 col-md-12 " id="errorTable">'
												+ '<table class=" table table-hover table-bordered " style="margin:10px;">'
													+ ' <thead>'
													+ '  <tr class="success">'
													+ '   <th scope="col">FLOW(lit/sec)</th>'
													+ '  <th scope="col">EXPECTED PULSES(per/lit)</th>'
													+ '    <th scope="col">ACTUAL PULSES(per/lit)</th>'
													+ '   </tr>'
													+ '  </thead>'
													+ '   <tbody>'
											for(i=0;i<5;i++){
												
												reading[i]= readingRandom(min,max);
												expectedPulses[i] =parseInt(reading[i]*supplierConstaint*time1);
												//Blade missing
												if(errorType==1)
													{
														
															temp=parseInt(expectedPulses[i])/noBlades-1;
															actualPulses[i]=temp.toFixed(2);
													}
												// error for shaft is stuck / rotation is slow
												else if(errorType==2)
												{
													temp = parseInt(expectedPulses[i] * 5/100);
													actualPulses[i] = expectedPulses[i] - temp;
												}
												// error for sensor is displaced
												
												else if(errorType==3)
													{
														actualPulses[i] =0;
													}
											
													
													tableError+= '    <tr>'
														+ '   <td>' + reading[i] + '</td>'
														+ '   <td>' + Math.round(expectedPulses[i]) + '</td>'
														+ '    <td>' +Math.round(actualPulses[i])+ '</td>'
														
														+ '     </tr>'
												
												
											}
											tableError += ' </tbody>'
												+ '  </table>'
												+'<div>'
												$("#canvas-div").html(tableError);
											
												CreateDropdown(min,max,BladeShape, pipeSize, noBlades, time2, materialType, fluidType, supplierConstaint, time1,errorType);
							}			
								
							function CreateDropdown(min,max,BladeShape, pipeSize, noBlades, time2, materialType, fluidType, supplierConstaint, time1,errorType){
								var errorDropDown=' <div class="row">'
									+'<div class="col-sm-12">'
								   +'<label for="errorType">SELECT CORRECT ERROR TYPE</label>'
								   +'</div>'
									   
								   +'<div class="col-sm-12" >'
								   +'<select  class="form-control form-control-lg bg-info selectStyle"  id="errorCheck" >'
								   +'<option value="0">--- SELECT CORRECT  ERROR TYPE --- </option>'
//								   +'<option value="#6b6a64" >Oxygen  </option>'
								   +'<option value="1" >Blade missing</option>'
								   +'<option value="2">Error for blade jam / rotation is slow</option>'
								   +'<option value="3">error for sensor is displaced</option>'
								   +'</select>'
								   +'</div>'
//								   
//								   +'</div>'
								   +'<div class="row">'
								   +'<div class="col-sm-12 alert" id="alertError" disabled >'
//								   +' <span class="closebtn" onclick="this.parentElement.style.display="none";">&times;</span> '
								   +' <strong id="correctError"></strong> '
								   +'</div>'
								   +'</div>'
								   +'</div>'//errorDropDown row end
//								   
								  
								   $("#canvas-div").append(errorDropDown);
							
								$('#errorCheck').on('change', function() {
									
									$("#nextLevelResultDiv").prop("disabled", true);
									var SelectedError=$("#errorCheck").val();
									//console.log(" errorAttemptCounter "+errorAttemptCounter);
									//console.log(" SelectedError  "+SelectedError);
									
									
										if(errorType==SelectedError)
											{
											
												
													if(errorAttemptCounter<3)	{
														$("#nextLevelResultDiv").prop("disabled", true);
//														$("#correctError").html("Selected Error type is match... New Table");
														alert("The selected error type matches...");
														$(".alert").css("background-color", "green");
														errorAttemptCounter++;
//														errorType1= Math.floor(Math.random() * (4 - 1)) + 1;
//														console.log(" errorType1 in "+errorType);
														ErrorTableCreation(min,max,BladeShape, pipeSize, noBlades, time2, materialType, fluidType, supplierConstaint, time1,errorType);
													}									
										}
										else if(SelectedError==0)
											{
					
													
													$("#nextLevelResultDiv").prop("disabled", true);
													$("#correctError").html(" Select Error type  ... ");
													$(".alert").css("background-color", "blue");
													console.log(" zero");
											}
										else
											{
											$("#nextLevelResultDiv").prop("disabled", true);
											$("#correctError").html(" Selected Error type is wrong .. ");
											$(".alert").css("background-color", "red");
											console.log(" wrong");
											}
										
										if(errorAttemptCounter==3)
											{
												$("#canvas-div").html("");
												var button= '<br><button type="submit" id="resultAnalysis" style="margin-top:17px;width:100%;" class=" btn btn-success"  >RESULT</button>'
													$("#canvas-div").append(button);	
												console.log(" errorAttemptCounter "+errorAttemptCounter);
											}
									
										$("#resultAnalysis").click(function() {
											resultAnalysis();
										});
									
								});
								
							
								}
							
								
						
					});	
								
//					   });//Close Next Level 1
				
						
			}//correctionTable
			
			
			AnswerCounter=0;
		$("#submitZeroError").click(function() {
			 zeroErrorCounter++;
			
			var textZeroError = $("#textZeroError").val();
			var zeroValueY = graphData[0];
			var correctAns = masterJson.demo[0].err1;
			correctAns = correctAns.toFixed(2);
			
//			console.log("correctAns " + correctAns);
//			console.log("masterJson.demo[0].tp " + masterJson.demo[0].tp);
//			console.log("masterJson.demo[0].tpc " + parseInt(masterJson.demo[0].tpc));
            if(textZeroError==""){
	         $(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Enter the value");
             }else{
	        correctAns = parseFloat(correctAns);
			if (AnswerCounter < 3) {
				if (textZeroError == correctAns) {
					$("#spanError").show();
					$("#iconCorrectZero").show();
					$("#textZeroError").prop('disabled', true);
					$("#submitZeroError").prop('disabled', true);
					AnswerCounter = 0;
				} else {
			$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Incorrect Answer");
//					alert("Incorrect Answer ");
//					var str='<img src="images/cancel.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" > Incorrect Answer ...</b> '
//						$("#Errors").html(str);
					
				}
			} 
			else if (AnswerCounter == 3) {
				 
				  $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#23435c");
           $(".modal-header").css({
    "background": "#23435c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("<b>Formula : ZERO ERROR =  ACTUAL PULSES-TURBINE PULSES</b>");
//				alert("ZERO ERROR =  ACTUAL PULSES-TURBINE PULSES");
//				var str='<img src="images/info.png" class=" img-fluid " />'
//					+'<b id="errorText" style="color:red;margin-left:10px;" >ZERO ERROR =  ACTUAL PULSES-TURBINE PULSES ...</b> '
//					$("#Errors").html(str);
				
			} else if (AnswerCounter >= 4) {
				

				if (textZeroError == correctAns) {
					$("#spanError").show();
					$("#iconCorrectZero").show();
					$("#textZeroError").prop('disabled', true);
					$("#submitZeroError").prop('disabled', true);
					
					AnswerCounter = 0;
				} else {
					$("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("Correct Answer is  : " + correctAns);
//					alert(" Correct Answer " + correctAns);
//					var str='<img src="images/cancel.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" >Incorrect Answer ...</b> '
//						$("#Errors").html(str);
				}
			}
			AnswerCounter++;
			}
		});
		AnswerCounter=0;
		$("#submitSpanError").click(function() {
			
			spanErrorCounter++;
			
			var textSpanError = $("#textSpanError").val();
			var lastValue = masterJson.demo.length - 1;
			var zeroValueY = graphData[lastValue];

			var correctAns = masterJson.demo[lastValue].err1;
			correctAns = correctAns.toFixed(2);
//			console.log("correctAns " + correctAns);
//			console.log("masterJson.demo[" + lastValue + "].tp " + masterJson.demo[lastValue].tp);
//			console.log("masterJson.demo[" + lastValue + "].tpc " + parseInt(masterJson.demo[lastValue].tpc));
 
           if(correctAns==""){
	         $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
            
            $(".modal-header").css({
    "background": "#9c1203b0",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
            
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Enter the value");
          }else{
            correctAns = parseFloat(correctAns);
			if (AnswerCounter < 3) {
					if (textSpanError == correctAns) {
						$("#Linerality").show();
						
						$("#iconCorrectSpan").show();
						$("#submitSpanError").prop('disabled', true);
						$("#textSpanError").prop('disabled', true);
						AnswerCounter = 0;
					} else {
						
						$(".modal-header").html("Error Message");
						
						 $(".modal-header").css({
    "background": "#9c1203b0",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
//			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Incorrect Answer");
						
//						alert("Incorrect Answer ");
//						var str='<img src="images/cancel.png" class=" img-fluid " />'
//							+'<b id="errorText" style="color:red;margin-left:10px;" >Incorrect Answer </b> '
//							$("#Errors").html(str);
						
					}
			} 
			else if (AnswerCounter == 3) 
			{
				
				 $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#23435c");
			$(".modal-header").css({
    "background": "#23435c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("<b>Formula : SPAN ERROR =  ACTUAL PULSES-TURBINE PULSES </b>");
				
//				alert(" SPAN ERROR =  ACTUAL PULSES-TURBINE PULSES ");
//				var str='<img src="images/info.png" class=" img-fluid " />'
//					+'<b id="errorText" style="color:red;margin-left:10px;" >SPAN ERROR =  ACTUAL PULSES-TURBINE PULSES </b> '
//					$("#Errors").html(str);
			} 
			else if (AnswerCounter >= 4)
			{
				var textSpanError = $("#textSpanError").val();
				if (textSpanError == correctAns) 
				{
					
					$("#Linerality").show();
					$("#iconCorrectSpan").show();
					AnswerCounter = 0;
					$("#textSpanError").prop('disabled', true);
					$("#submitSpanError").prop('disabled', true);
					
				}
				else {
					
					$("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("Correct Answer is : " + correctAns);
					
//					alert(" Correct Answer " + correctAns);
//					var str='<img src="images/info.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" >Correct Answer  '+correctAns +'</b> '
//						$("#Errors").html(str);
					
				}
			}
			AnswerCounter++;
			}
		});
		AnswerCounter=0;
		var accurance=parseFloat( Math.floor(Math.random() * (80 - 30)) + 30);
		console.log(" accurance"+accurance);
		
		$("#lineralitySubmit").click(function() {
			
				 lineralityCounter++;
			var sum=0;
			var sum1=0;
			var length=masterJson.demo.length;
			for (var i = 0; i < masterJson.demo.length; i++) {
				var wt=parseInt(masterJson.demo[i].wt);
				sum+=Math.pow(wt,2);
				sum1+=wt;
			}
			//console.log(" sum    " +sum);
			//console.log(" sum1    " +sum1);
			var temp2=Math.pow(sum1,2)/length;
			//console.log(" temp2    " +temp2);
			var minus=sum-temp2;
			//console.log(" minus    " +minus);
			var A= Math.sqrt(minus);
			//console.log(" A    " +A);
			
			 sum=0;
			 sum1=0;
			 temp2=0;
			minus=0;
			for (var i = 0; i < masterJson.demo.length; i++) {
				
				var tp=parseInt(masterJson.demo[i].tp);
				
				sum+=Math.pow(tp,2);
				sum1+=tp;
			   
			}
			//console.log(" sum    " +sum);
			//console.log(" sum1    " +sum1);
			
			 temp2=Math.pow(sum1,2)/length;
			//console.log(" temp2    " +temp2);
			 minus=sum-temp2;
			//console.log(" minus    " +minus);
			var B= Math.sqrt(minus);
			//console.log(" B    " +B);
			
			sum=0;
			sum1=0;
			var sum2=0;
			temp=0;
			minus=0;
			for (var i = 0; i < masterJson.demo.length; i++) {
				
				var tp=parseInt(masterJson.demo[i].tp);
				var wt=parseInt(masterJson.demo[i].wt);
				
				sum+=(tp*wt);
				sum1+=tp;
				sum2+=wt;
			   
			}
//			console.log(" sum    " +sum);
//			console.log(" sum1    " +sum1);
//			console.log(" sum2    " +sum2);
			temp2=(sum1*sum2)/length;
			//console.log(" temp2    " +temp2);
			var C=sum-temp2;
			//console.log(" C    " +C);
			var linearity=C/(A*B);
			var linearity1=linearity.toFixed(3);
			//console.log(" linearity    " +linearity1);
			
			var textLineralityeError=$("#textLineralityeError").val();
			
			
			if(textLineralityeError==""){
				$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Enter the value");
			}else{
				 linearity1 = parseFloat(linearity1);
			if (AnswerCounter <= 3) {
				if (textLineralityeError == linearity1) {
					
					$("#accuracy").show();
					$("#iconCorrectLinerality").show();
					$("#textLineralityeError").prop('disabled', true);
					$("#lineralitySubmit").prop('disabled', true);
					
					AnswerCounter = 0;
				} else {
					$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Incorrect Answer");
//					alert("Incorrect Answer ");
//					var str='<img src="images/cancel.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" >Incorrect Answer ...</b> '
//						$("#mimicModelMessage").html(str);
				}
			} else if (AnswerCounter == 4) {
//				alert(" A=Sqrt (sum(x^2))-(sum(x))^2/N). B=Sqrt (sum(y^2))-(sum(y))^2/N). C=sum(xy)-(sum(y))/N  . linearity =C/AB ");
			$(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#23435c");
            $(".modal-header").css({
    "background": "#23435c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			var modelI = '<img src="images/linearity.png" class="img-responsive" alt="Cinque Terre">'
			$("#MsgModal").html(modelI);
				
				
			} else if (AnswerCounter >= 4) {
				
				if (textLineralityeError == linearity1) {
					
					AnswerCounter = 0;
					$("#accuracy").show();
					$("#iconCorrectLinerality").show();
					$("#textLineralityeError").prop('disabled', true);
					
					$("#lineralitySubmit").prop('disabled', true);
				} else {
			$("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("Correct Answer is : " + linearity1);
//					alert(" Correct Answer " + linearity1);

				}
			}
			AnswerCounter++;
			
			}
			
			
		});
		AnswerCounter=0;
		
		$("#accuracySubmit").click(function() {
		 accurancyCounter++;
		 
			
			var length=masterJson.demo.length;
			var sum=0;
			var minus=0;
			var textacc=$("#textaccuracy").val();
           
//           textacc = textacc.toFixed(2);
           
           if(textacc==""){
	        $(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Entered the value");
     }else{  
             textacc = parseFloat(textacc);
			if (AnswerCounter <= 3) {
				if (textacc == accurance) {
					
					$("#accuracy").show();
					$("#iconCorrectAccuracy").show();
					$("#textaccuracy").prop('disabled', true);
					$("#accuracySubmit").prop('disabled', true);
					$("#CalibrateCheckbox").show();
					
				} else {
					
			$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Incorrect Answer");
					
//					alert("Incorrect Answer ");
//					var str='<img src="images/cancel.png" class=" img-fluid " />'
//						+'<b id="errorText" style="color:red;margin-left:10px;" >Incorrect Answer ...</b> '
//						$("#mimicModelMessage").html(str);
				}
			} else if (AnswerCounter == 4) {
				
				$(".modal-header").html("Error Message");
$(".modal-header").css({
    "background": "#23435c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			var model12 = '<img src="images/accuracy.png" class="img-responsive" alt="Cinque Terre">'
			$("#MsgModal").html(model12);
				
				
//				alert(" 1.PERCENTAGE ACCURACY = ((STANDERD OUTPUT - OBSERVED OUTPUT)/TOTAL NUMBER OF READING)*100) 2.AVERAGE ACCURACY = SUM OF(PERCENTAGE ACCURACY)/TOTAL NUMBER OF READING)   ");
			} else if (AnswerCounter >= 4) {
				
				if (textacc == accurance) {
					
					
					$("#accuracy").show();
					$("#iconCorrectAccuracy").show();
					$("#textaccuracy").prop('disabled', true);
					$("#accuracySubmit").prop('disabled', true);
					$("#CalibrateCheckbox").show();
				} else {
//					alert(" Correct Answer " + accurance);

                   $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("Correct Answer is : " + accurance);

				}
			}
			AnswerCounter++;
			
			
		}	
			
		});
		
		$("#CalibrateRadiobox").click(function() {
			
			$("#plusMinusCalibrationZero").show();
			var tp= masterJson.demo[0].tp ;
			var tpc=parseInt(masterJson.demo[0].tpc);
			
			$("#zeroPanel").show();
			$("#container-graph2").hide();
			$("#container-graph1").css("height", "800px");
			$("#container-graph1").css("width", "1000px");
		
		});
	}

	function tank(x, y) {
		paper.path('M' + (x + 525) + ' ' + (y + 100) + 'l 50 0 l 0 30 l 40 30 l 0 150 l -130 0 l 0 -150 l 40 -30 z').attr({ 'stroke': 'black', 'stroke-width': '3' });
	}

	function Terbine_flow_Meter(x, y) {
		paper.rect(x + 150, y, 150, 100).attr({ 'stroke-width': '2' }).toFront();
		paper.circle(x + 230, y - 30, 10).attr({ 'stroke': 'black', 'stroke-width': '2', 'fill': 'black' });
		paper.path('M' + (x + 230) + ' ' + (y - 20) + 'l  0 20').attr({ 'stroke': 'black', 'stroke-width': '2' });
		var text_terbine = paper.text(x + 230, y + 150, "Meter").attr({ 'font-size': 20, "font-weight": "bold" });
		var text_terbine = paper.text(x + 230, y + 120, "Turbine Flow").attr({ 'font-size': 20, "font-weight": "bold" });

	}

	function Magnetic_flow_Meter(x, y) {
		paper.rect(x + 350, y, 100, 100).attr({ 'stroke-width': '2', }).toFront();
		paper.circle(x + 400, y - 30, 10).attr({ 'stroke': 'black', 'stroke-width': '1', 'fill': 'black' });;
		paper.path('M' + (x + 400) + ' ' + (y - 20) + 'l  0 20').attr({ 'stroke': 'black', 'stroke-width': '2' });
		var text_M = paper.text(x + 400, y + 40, "M").attr({ 'font-size': 30 });
		var text_Magne = paper.text(x + 400, y + 150, "Meter").attr({ 'font-size': 20, "font-weight": "bold" });
		var text_Magne = paper.text(x + 400, y + 170, "(Standard)").attr({ 'font-size': 20, "font-weight": "bold" });
		var text_Magne = paper.text(x + 400, y + 120, "Magnetic Flow").attr({ 'font-size': 20, "font-weight": "bold" });
	}

	function conection_WT(x, y) {
		paper.path('M' + (x + 590) + ' ' + (y + 310) + 'l 0 40 l 50 0').attr({ 'stroke': 'black', 'stroke-width': '2' });
		paper.circle(x + 660, y + 350, 20).attr({ 'stroke': 'black', 'stroke-width': '2' });;
		var text_M = paper.text(x + 660, y + 350, "WT").attr({ 'font-size': 15, "font-weight": "bold" });
		paper.path('M' + (x + 545) + ' ' + (y + 310) + 'l 0 30 ').attr({ 'stroke': 'black', 'stroke-width': '2' });
		paper.path('M' + (x + 545) + ' ' + (y + 360) + 'l 0 50 ').attr({ 'stroke': 'black', 'stroke-width': '2' });
		paper.circle(x + 615, y + 380, 20).attr({ 'stroke': 'black', 'stroke-width': '2' });
		var text_M = paper.text(x + 615, y + 380, "LT").attr({ 'font-size': 15, 'font-weight': "bold" });
		paper.rect(x + 600, y + 405, 70, 40).attr({ 'stroke-width': '2', 'fill': 'pink' }).toFront();
		per = paper.text(x + 635, y + 425, " 100 % ").attr({ 'font-size': 20 });
		paper.path('M' + (x + 597) + ' ' + (y + 380) + 'l -35 0 l 0 30 ').attr({ 'stroke': 'black', 'stroke-width': '2' });
	}

	function drain_valve(x, y) {
		paper.path('M' + (x + 545) + ' ' + (y + 660) + 'l 0 50 l 80 0 ').attr({ 'stroke': 'black', 'stroke-width': '2' });
		paper.path('M' + (x + 655) + ' ' + (y + 710) + 'l 50 0 ').attr({ 'stroke': 'black', 'stroke-width': '2' });
		var drain_text = paper.text(x + 600, y + 750, "(V3) Drain Valve").attr({ 'font-size': 22, 'font-weight': 'Bold' });
	}

	function pump_control(x, y) {

		paper.circle(x + 250, y + 600, 30);
		paper.circle(x + 250, y + 600, 1);
		paper.circle(x + 250, y + 600, 10).attr({ 'stroke': 'red', 'stroke-width': '1', 'fill': 'red' });
		paper.path('M' + (x + 270) + ' ' + (y + 620) + 'l 20 20  ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.path('M' + (x + 230) + ' ' + (y + 620) + 'l -20 20  ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.path('M' + (x + 210) + ' ' + (y + 640) + 'l 80 0  ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.path('M' + (x + 250) + ' ' + (y + 600) + 'l 83 0 ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.path('M' + (x + 365) + ' ' + (y + 600) + 'l 120 0 ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.path('M' + (x + 250) + ' ' + (y + 520) + 'l 0 50  ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.circle(x + 250, y + 490, 30);
		var text_M = paper.text(x + 250, y + 490, "VFD").attr({ 'font-size': 15 });
		paper.path('M' + (x + 250) + ' ' + (y + 570) + 'l -250 0  ').attr({ 'stroke': 'black', 'stroke-width': '1.5' });
		paper.path('M' + (x + 250) + ' ' + (y + 430) + 'l 0 20  ').attr({ 'stroke': 'black', 'stroke-width': '1' });
		paper.path('M' + (x + 250) + ' ' + (y + 450) + 'l -10 -10  l 10 10 l 10 -10 l -10 10  ').attr({ 'stroke': 'black', 'stroke-width': '1' });
		paper.path('M' + (x + 250) + ' ' + (y + 400) + 'l 0 20  ').attr({ 'stroke': 'black', 'stroke-width': '1' });
		paper.path('M' + (x + 250) + ' ' + (y + 360) + 'l 0 20  ').attr({ 'stroke': 'black', 'stroke-width': '1' });
		paper.path('M' + (x + 250) + ' ' + (y + 320) + 'l 0 20  ').attr({ 'stroke': 'black', 'stroke-width': '1' });
		paper.rect(x + 225, y + 260, 50, 50).attr({ 'stroke-width': '1', }).toFront();
		paper.path('M' + (x + 225) + ' ' + (y + 282) + 'l 22 -22 l 26 22 l -25 25 z').attr({ 'stroke': 'black', 'stroke-width': '1' });
		var pump_text = paper.text(x + 250, y + 670, "Pump").attr({ 'font-size': 20 });
		var control_text = paper.text(x + 350, y + 670, "SV").attr({ 'font-size': 20 });
		var text_VPLC = paper.text(x + 250, y + 230, "VPLC").attr({ 'font-size': 20 });
		var pump_text = paper.text(x + 120, y + 715, "Pump on time").attr({ 'font-size': 23, 'font-weight': 'Bold' });
	}

	function water(x, y) {
		paper.rect(x + 486, y + 280, 126, 30).attr({ 'stroke': color, 'stroke-width': '1', 'fill': color, "opacity": 0.5 }).toFront();
	}

	function water1(x, y) {
		paper.rect(x + 486, y + 252, 126, 118).attr({ 'stroke': color, 'stroke-width': '1', 'fill': color, "opacity": 0.5 }).toFront();
	}

	function speed_meter(x, y) {
		var keepRotating = Raphael.animation({ 'transform': 'r360' }, time).repeat('Infinity')
	}

	if (noBlades == 4) {
		smallblades4(x, y);
	}

	else if (noBlades == 2) {
		smallblades2(x, y);
	}

	else if (noBlades == 6) {
		smallblades6(x, y);
	}

	//2 blades
	var b1;
	function smallblades2(x, y) {
		var x1 = x + 70;
		var y1 = y - 50;
		var small_circle = paper.circle(x1 + 107, y1 + 100, 5).attr({ 'stroke': '#000', 'stroke-width': 2, "fill": '#000' });
		var big_circle = paper.circle(x1 + 107, y1 + 100, 10).attr({ 'stroke': '#000', 'stroke-width': 2 });
		b1 = paper.path("m " + (x1 + 102) + " " + (y1 + 92) + " " + " l -5 -31  A 20 20 0 0 1 " + (x1 + 118) + " " + (y1 + 61) + " l -5 31 M "
			+ (x1 + 102) + " " + (y1 + 109) + " " + " l -5 31 A 20 20 1 0 0 " + (x1 + 118) + " " + (y1 + 140) + " l -5 -31 M"
			+ (x1 + 108) + " " + (y1 + 59) + "l 0 2 l -2 0 l 0 -2 l 3 0 M "
			+ (x1 + 108) + " " + (y1 + 140) + "l 0 2 l -2 0 l 0 -2 l 3 0")
			.attr({ 'stroke': '#000', 'stroke-width': 2, "fill": "#fae3d7" });
		var big_circle1 = paper.circle(x1 + 107, y1 + 100, 10).attr({ 'stroke': '#000', 'stroke-width': 2, 'fill': '#fff' });
		var small_circle1 = paper.circle(x1 + 107, y1 + 100, 5).attr({ 'stroke': '#000', 'stroke-width': 2, "fill": "#000" });
		keepRotating = Raphael.animation({ 'transform': 'r360' }, time1 + 500).repeat('Infinity');
	}

	//4blades

	function smallblades4(x, y) {
		var x1 = x - 135;
		var y1 = y - 50;
		var small_circle = paper.circle(x1 + 313, y1 + 100, 5).attr({ 'stroke': '#000', 'stroke-width': 2, "fill": '#000' });
		var big_circle = paper.circle(x1 + 313, y1 + 100, 10).attr({ 'stroke': '#000', 'stroke-width': 2 });
		b1 = paper.path("M " + (x1 + 308) + " " + (y1 + 92) + " " + " l -5 -31  A 20 20 0 0 1 " + (x1 + 325) + " " + (y1 + 61) + "  l -7 31 M"
			+ (x1 + 308) + " " + (y1 + 109) + " " + "l -5 31 A 20 20 1 0 0 " + (x1 + 325) + " " + (y1 + 140) + "l -7 -31 M"
			+ (x1 + 305) + " " + (y1 + 106) + " " + "l -31 5 A 20 20 0 0 1 " + (x1 + 274) + " " + " " + (y1 + 90) + "l 31 5 M"
			+ (x1 + 321) + " " + (y1 + 106) + " " + "l 31 5 A 20 20 1 0 0 " + (x1 + 352) + " " + (y1 + 89) + "l -31 7 M"
			+ (x1 + 316) + " " + (y1 + 59) + "l 0 2 l -2 0 l 0 -2 l 3 0 M "
			+ (x1 + 316) + " " + (y1 + 140) + "l 0 2 l -2 0 l 0 -2 l 3 0 M"
			+ (x1 + 275) + " " + (y1 + 100) + "l 0 2 l -2 0 l 0 -2 l 3 0 M"
			+ (x1 + 353) + " " + (y1 + 99) + "l 0 2 l -2 0 l 0 -2 l 3 0").attr({ 'stroke': '#000', 'stroke-width': 2, "fill": "#f0eeed" });

		var big_circle1 = paper.circle(x1 + 313, y1 + 100, 10).attr({ 'stroke': '#000', 'stroke-width': 2, 'fill': '#fff' });
		var small_circle1 = paper.circle(x1 + 313, y1 + 100, 5).attr({ 'stroke': '#000', 'stroke-width': 2, "fill": "#000" });
		keepRotating = Raphael.animation({ 'transform': 'r360' }, time1 + 500).repeat('Infinity');
	}

	//6 blades

	function smallblades6(x, y) {
		var x1 = x - 335;
		var y1 = y - 50;
		var small_circle = paper.circle(x1 + 515, y1 + 100, 5).attr({ 'stroke': '#000', 'stroke-width': 2, 'fill': '#000' });
		var big_circle = paper.circle(x1 + 515, y1 + 100, 10).attr({ 'stroke': '#000', 'stroke-width': 2 });
		b1 = paper.path("M " + (x1 + 511) + " " + (y1 + 91) + " " + " l -8 -28  A 19 19 0 0 1 " + (x1 + 529) + " " + (y1 + 64) + "l -10 28 M"
			+ (x1 + 512) + " " + (y1 + 103) + "l -10 34 A 19 19 1 0 0 " + (x1 + 525) + " " + (y1 + 138) + "l -6 -28 M"
			+ (x1 + 510) + " " + (y1 + 105) + "l -18 25 A 19 19 0 0 1 " + (x1 + 477) + " " + (y1 + 109) + " l 29 -8 M"
			+ (x1 + 519) + " " + (y1 + 95) + "l 24 -23 A 19 19 0 0 1 " + (x1 + 554) + " " + (y1 + 96) + " l -29 3 M"
			+ (x1 + 525) + " " + (y1 + 102) + "l 28 9 A 19 19 0 0 1 " + (x1 + 540) + " " + (y1 + 132) + " l -18 -24 M"
			+ (x1 + 505) + " " + (y1 + 98) + "l -29 -3 A 19 19 0 0 1 " + (x1 + 489) + " " + (y1 + 72) + " l 28 29 M "

			+ (x1 + 517) + " " + (y1 + 60) + "l 0 2 l -2 0 l 0 -2 l 3 0 M "
			+ (x1 + 515) + " " + (y1 + 138) + "l 0 2 l -2 0 l 0 -2 l 3 0 M "
			+ (x1 + 480) + " " + (y1 + 122) + "l 2 -2 l 1 1 l -2 2  M"
			+ (x1 + 549) + " " + (y1 + 83) + "l 2 -2 l 1 1 l -2 2 M"
			+ (x1 + 478) + " " + (y1 + 83) + "l 2 -2 l 1 1 l -2 2 M "
			+ (x1 + 547) + " " + (y1 + 124) + "l 2 -2 l 1 1 l -2 2 M")
			.attr({ 'stroke': '#000', 'stroke-width': 2, "fill": "#e6dddc" });
		var big_circle1 = paper.circle(x1 + 515, y1 + 100, 10).attr({ 'stroke': '#000', 'stroke-width': 2, 'fill': '#fff' });
		var small_circle1 = paper.circle(x1 + 515, y1 + 100, 5).attr({ 'stroke': '#000', 'stroke-width': 2, "fill": "#000" });
		keepRotating = Raphael.animation({ 'transform': 'r360' }, time1 + 500).repeat('Infinity');
	}



	$("#btnAnsCheck").click(function() {
		
		ActualAnsSubmit++;
		var flowAns = parseFloat($("#flowAns").val().trim());
		
		var f = ft.toFixed(3);
		f = parseFloat(f);
//		if(isNaN(flowAns)){
//			var str='<img src="images/info.png" class=" img-fluid " />'
//				+'<b id="errorText" style="color:red;margin-left:10px;" >Please enter  answer...</b> '
//				$("#mimicModelMessage").html(str); 
//			
//		}

        if(flowAns==""){
	
	    $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
               $(".modal-header").css({
    "background": "#9c1203b0",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Enter the value");
	
}else{
		if (id <= 3) {
			if (flowAns == f) {
				checkAns = 1;
				
				
			$("#btnModal").removeClass("btn-danger").addClass("btn-success");
    $(".modal-header").html("Message");
//    $(".modal-header").css("background", "#5cb85c");
  $(".modal-header").css({
    "background": "#5cb85c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
    $("#MsgModal").html("Click on V2 to drain the tank 2 and proceed for next reading");

    // Call the function for table creation
    tableCreationOnSubmit();
   alert("Click on V2 to drain the tank 2 and proceed for next reading");
    // Disable the button and the flow answer field
    $("#btnAnsCheck").prop("disabled", true);
    $("#flowAns").prop("disabled", true);
//    $("#myModal").modal('show');
//    $('#myModal').on('hidden.bs.modal', function () {
//    document.querySelector('#btnAnsCheck').disabled = true;
//});
    
//      $("#myModal").modal('show');
//
        // Disable the button after clicking
         
//        $(this).prop('disabled', true);
//     console.log("Showing modal...");
//         $("#btnAnsCheck").prop("disabled",true);
//      document.querySelector('btnAnsCheck').disabled = true;
    // Show the modal popup
//    $("#myModal").modal('show');
    event.stopPropagation();
			} else if (flowAns != f) {
				checkAns = 0;
//				alert("Entered value is incorrect.Try it again... ");
				
				 $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
               $(".modal-header").css({
    "background": "#9c1203b0",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Incorrect Answer");
//				
				
				
				
			}


		} else if (id == 4) {
			checkAns = 0;
//			alert("formula :Instantaneous Flow = Pulses / Meter constant * Time ");
		
			 $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#23435c");
$(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
               $(".modal-header").css({
    "background": "#23435c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("<b>Formula : Instantaneous Flow = Pulses / (Meter constant &times; Time)</b>");
	 
			
			
//			var msg='<img src="images/info.png" class=" img-fluid " />'
//				+'<b id="errorText1" style="color:blue;margin-left:10px;" >formula :Instantaneous Flow = Pulses / (Meter constant &times; Time) .</b> '
//				
//				$("#mimicModelMessage").html(msg); 
			
		} else {
			flowAns = parseFloat($("#flowAns").val().trim());

			if (flowAns == f) {
				checkAns = 1;
				
				
                 $("#btnModal").removeClass("btn-danger").addClass("btn-success");
    $(".modal-header").html("Message");
//    $(".modal-header").css("background", "#9c1203b0");
  $(".modal-header").css({
    "background": "#5cb85c",  // sets the background color
    "color": "#fff"           // sets the text color to white
});
//    $("#MsgModal").html("Click on V2 to drain the tank 2 and proceed for next reading");

alert("Click on V2 to drain the tank 2 and proceed for next reading");

    // Call the function for table creation
    tableCreationOnSubmit();
// $("#myModal").modal('show');
    // Disable the button and the flow answer field
    $("#btnAnsCheck").prop("disabled", true);
    $("#flowAns").prop("disabled", true);
    
//    $('#myModal').on('hidden.bs.modal', function () {
//    document.querySelector('#btnAnsCheck').disabled = true;
//});
    
  
//
//        // Disable the button after clicking
//        $(this).prop('disabled', true);
//        $("#btnAnsCheck").prop("disabled",true);
//        document.querySelector('btnAnsCheck').disabled = true;
//   console.log("Showing modal...");
    // Show the modal popup
//    $("#myModal").modal('show');
			
			
				event.stopPropagation();
			} else {
				checkAns = 0;
				
				
				$("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("Correct Answer is " + f);
				
//				alert("correct answer is " + f);
//				var msg='<img src="images/info.png" class=" img-fluid " />'
//					+'<b id="errorText1" style="color:blue;margin-left:10px;" >Correct answer is '+f+'</b> '
//					
//					$("#mimicModelMessage").html(msg); 
			}
		}

		id++;
		}

	});
}//main Function close

