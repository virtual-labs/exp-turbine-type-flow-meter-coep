Questions();
turbineFlowMeter();
var masterJson = {};
var mainJson = {};
var JsonArr = [];
function mainPage(){

var t="";
var min="";
var max="";
var supplierConstaint="";
//var tableRecordCounter=0;
var noBlades="";
var fluidType="";
var  materialType="" ;
var BladeShape="";
var pipeSize="";
var time1="";

var correctMeterConstantCounter=0;
var wrongMeterConstantCounter=0;
var skipMeterConstantCounter=0;
var correctMaterialType=0;
var wrongMaterialType=0;

var noOfError=0;
var errorAttemptCounter=0;
var htm='<div class="row" id="rowfluidType">'
var htm1='<div class="col-sm-6">'
	   +'<label for="fluidtype">Select fluid type</label>'
	   +'</div>'
		   
	   +'<div class="col-sm-6" >'
	   +'<select  class="form-control form-control-lg bg-info selectStyle"  id="fluidType" >'
	   +'<option value="0">--- Select fluid type --- </option>'
//	   +'<option value="#6b6a64" >Oxygen  </option>'
	   +'<option value="#B0BF1A" >Sulphuric Acid</option>'
	   +'<option value="#0592f0">water</option>'
	   +'<option value="#694F04">Muddy water</option>'
	   +'</select>'
	  
	   +'</div>'
	   
	   +'</div>'
	  
	   
	   +'<div class="row" id="rowMaterialType">'
	   +'<div class="col-sm-6">'
	   +'<label for="materialtype">Select material of the blade </label>'
	   +'</div>'
	   
	   +'<div class="col-sm-6">'
	   +'<select  class="form-control form-control-lg bg-info selectStyle" id="materialType">'
	   +'<option value="0">--- Select material  --- </option>'
	   +'<option value="1" >SS 304  </option>'
	   +'<option value="2">SS 316</option>'
	   +'<option value="3">Plastic</option>'
	   +'<option value="4">MS</option>'
	   +'<option value="5">Hastelloy</option>'
	   +'</select>'
	   +'<div class="alert alert-success" id="errorMsgFluidType">'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	   
	   
	   +'<div class="row"  id="rowBladeShape" >'
	   +'<div class="col-sm-6">'
	   +'<label for="materialtype">Select Blade shape</label>'
	   +'</div>'
	   +'<div class="col-sm-6">'
	   +'<select  class="form-control form-control-lg bg-info selectStyle"  id="bladeShape">'
	   +'<option value="0">--- Select Blade shape --- </option>'
	   +'<option value="1" >	TYPE - 1 </option>'
	   +'<option value="2" >TYPE - 2</option>'
	   +'<option value="3">TYPE - 3</option>'
	   +'<option value="4">TYPE - 4</option>'
	   +'<option value="5">TYPE - 5</option>'
	   +'</select>'
	   +'</div>'
	   +'</div>'
	  
	   
	   +'<div class="row" id="rowPipeSize">'
	   +'<div class="col-sm-6">'
	   +'<label for="materialtype">Select pipe size(mm)</label>'
	   +'</div>'
	  
	   +'<div class="col-sm-6">'
	   +'<select  class="form-control form-control-lg bg-info selectStyle" id="pipeSize">'
	   +'<option value="0">--- Select pipe size --- </option>'
	   +'<option value="1" >15</option>'
	   +'<option value="2" >25</option>'
	   +'<option value="3">40</option>'
	   +'<option value="4">50</option>'
	   +'</select>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	 
	   
	   +'<div class="row" id="rowBlades">'
	   +'<div class="col-sm-6">'
	   +'<label for="noBlade">Select No of blades</label>'
	   +'</div>'
	  
	   +'<div class="col-sm-6">'
	   +'<select  class="form-control form-control-lg bg-info selectStyle" id="noBlades">'
	   +'<option value="0">--- Select No of blades --- </option>'
	   +'<option value="2" >2</option>'
	   +'<option value="4">4</option>'
	   +'<option value="6">6</option>'
	   +'</select>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	
	   
	   
	   +'<div class="row" id="rowTimer">'
	   +'<div class="col-sm-6">'
	   +'<label for="timer">Set the pump on time(sec)</label>'
	   +'</div>'
	  
	   +'<div class="col-sm-6">'
	   +'<select  class="form-control form-control-lg bg-info selectStyle"  id="timer">'
	   +'<option value="0">--- Set the pump on time(sec) --- </option>'
//	   +'<option value="1">1</option>'
//	   +'<option value="2" selected>2</option>'
//	   +'<option value="3">3</option>'
//	   +'<option value="4">4</option>'
//	   +'<option value="5">5</option>'
//	   +'<option value="6">6</option>'
//	   +'<option value="7">7</option>'
//	   +'<option value="8">8</option>'
//	   +'<option value="9">9</option>'
//	   +'<option value="10">10</option>'

	  +'<option value="5" >45</option>'
	   +'<option value="60" >60</option>'
	   +'<option value="90">90</option>'
	   +'<option value="120">120</option>'
	   +'<option value="150">150</option>'
	   +'<option value="180">180</option>'
	   +'<option value="210">210</option>'
	   +'<option value="240">240</option>'
	   +'<option value="270">270</option>'
	   +'<option value="300">300</option>'
	 
	   +'</select>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	  
	   
	   +'<div class="row" id="rowSupplierConstaint"  >'
	   +'<div class="col-sm-6">'
	   +'<label >Enter meter constant value (pulses) </label>'
	   +'</div>'
	   +'<div class="col-sm-6">'
	   +'<input type="text" class="form-control" id="supplierConstaint" value="" placeholder="Enter meter constant value">'
	   +'<div class="alert alert-success" id="errorMsg">'
	   +'</div>'
	   +'</div>'
	   
	   +'</div>'
	   +'</div>'
	   +'<br>'
	   +'<div class="row">'
	   +'<div class="col-sm-12">'
	   +'<button type="button" class="btn btn-danger btnStyle" id="checkConfg" data-toggle="modal" data-target="#myModal" disabled>CHECK CONFIGURATION </button>'
	   +'<div class="modal fade" id="myModal" role="dialog">'
	   +'<div class="modal-dialog">'
	   +'<!-- Modal content-->'
	   +' <div class="modal-content">'
	   +'<div class="modal-header bg-info"  >'
	  
	   +'<h4 class="modal-title">Message box</h4>'
	   +'<button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
	   +'</div>'
	   +'<div class="modal-body" id="errorModel" >'
	 
	   
	   +'</div>'
	   +'<div class="modal-footer">'
	   +'<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	   +'</div>'
	  
	   
//	   main div
	   +'</div>'
	   +'</div>'
	   +'<br>'
	   +'<center><label id="meterCon"> </label> </center>'
	   +'<div class=" col-sm-11 panel panel-primary" id="rangePanel">'
	   
	   +' <div class="panel-heading bg-info" ><center id="setRangeText">Set flow according to pipe size(0.2 - 1.8 mtr)</center></div>'
				   +'<br>'
				   +'<input type="range" style="margin-left:10px;width:96%;" class="slider" value="0" min="0" max="10" step="0.01">'
				   +'<b><p class="demo"> </p></b>'
			        +'<b><center class="ReadingError"> </center></b>'
				   +'<br>'
					   +'<div class="row">'
					   
					   +'<div class="col-sm-3">'
					   +'<button type="button" class="btn btn-primary " id="submit"  >SUBMIT</button>'
					   +'</div>'
					   +'<div class="col-sm-3">'
					   +'<button type="button" class="btn btn-primary " id="showGraph"   > GRAPH</button>'
					   +'</div>'
					   +'<div class="col-sm-3">'
					   +'<button type="button" class="btn btn-primary " id="animateSimulation"  >ANIMATION</button>'
					   +'</div>'
					  
					   +'<div class="col-sm-3">'
					   +'<button type="button" class="btn btn-primary " id="nextLevelMimc"  disabled>MIMIC</button>'
					   +'</div>'
				
					   +'</div>'
					   +'<br>'
	 
		+'</div>'
		
	    +'</div>'
	    +'</div>'
	    +'</div>'
	    +'</div>'
	    +'</div>'
	   $("#main-div-conf").html(htm+htm1);
	   var table=''
		   +'<div class="row col-sm-12" style="overflow-x:auto;">'
		   +'<table id="readingTable" class="table table-bordered "  >'
	       +'<thead id="" disabled>'
           +'  <tr style="background-color:#000;color:#fff;">'
		   +'    <th colspan="2"><center>Magnatic Flow Meter</center></th>'
		   +'   <th colspan="3"><center>Turbine Flow Meter</center></th>'
		   +'   </tr>'
	       +'  <tr style="background-color:#000;color:#fff;">'
		   +'    <th>Flow(ltr/sec)</th>'
		   +'   <th>Flow(%)</th>'
		   +'    <th>Flow(ltr/sec)</th>'
		   +'    <th>Pulses(Output)</th>'
		   +'    <th>Flow(%)</th>'
		   +'   </tr>'
	       +'  </thead>'
	       +' </table>'
//	       +'</div>'
	    var id=0;
	   var MgFlowPer=0;
		var valArr=[];
$( document ).ready(function() {
	
			var flag=0;
			$("#rangePanel").hide();
			$('#readingTable').hide();
			$('#errorMsg').hide();
			$('#errorMsgFluidType').hide();
//			$( "#readingTable" ).prop( "disabled", true );
			 
			$('#submit').on('click', function () {
			if(flag==0){
				
			}	
					 
		   $("#ReadingError").html("");
                 t=$('#readingTable').DataTable({
                 		
//                	 scrollY: '200px',
                	 responsive: true,
						 	bDestroy: true,
//					        scrollCollapse: true,
					        paging: true,
					        dom: 'Bfrtip',
       						 buttons: [
            					 'excel', 'pdf', 'print'
      						  ]
					        });
		   var sliderValue=parseFloat($('.slider').val());
		   valArr.push(sliderValue);
               // console.log(' valArr  '+valArr);
               var tempJson = {};
               if(flag==0)
            	   {
		            	   	flag=1;
		            	    pulses=supplierConstaint*min;
		   		 		 MgFlowPer=Math.round(100*(parseFloat(min)/parseFloat(max))); 
		   		 		//console.log(' MgFlowPer  '+MgFlowPer);
		   		 			tempJson.reading=min;
		   	    		 	tempJson.flowPercentage=1;
		   	    			tempJson.turbineReading=min;
		   	    			
		   	    		 	tempJson.pulses=Math.round(pulses.toFixed(2));
		   	    		 	tempJson.turbineFlowPercentage=1;
		   	    		 	JsonArr.push(tempJson);
		   	    		 	
		   	    		 	
		   	    		 	
		                   t.row.add(['<b>min('+tempJson.reading+')</b>','<b>'+tempJson.flowPercentage+'</b>','<b>'+tempJson.turbineReading+'</b>','<b>'+tempJson.pulses+'</b>','<b>'+tempJson.turbineFlowPercentage+'</b>']).draw(false);
		   		 
		                   masterJson.demo = JsonArr;
		                   pulses=supplierConstaint*max;
			   		 		 MgFlowPer=Math.round(100*(parseFloat(max)/parseFloat(max))); 
			   		 		//console.log(' MgFlowPer  '+MgFlowPer);
			
			              
			   				   	tempJson.reading=max;
			   	    		 	tempJson.flowPercentage=MgFlowPer;
			   	    			tempJson.turbineReading=max;
			   	    			
			   	    		 	tempJson.pulses=Math.round(pulses.toFixed(2));
			   	    		 	tempJson.turbineFlowPercentage=MgFlowPer;
			   	    		 	JsonArr.push(tempJson);
			   	    		 	
			                   t.row.add(['<b>max('+tempJson.reading+')</b>','<b>'+tempJson.flowPercentage+'</b>','<b>'+tempJson.turbineReading+'</b>','<b>'+tempJson.pulses+'</b>','<b>'+tempJson.turbineFlowPercentage+'</b>']).draw(false);
			   		 
			                   masterJson.demo = JsonArr;
			                   pulses=supplierConstaint*sliderValue;
		 						 MgFlowPer=Math.round(100*(parseFloat(sliderValue)/parseFloat(max))); 
					 		//console.log(' MgFlowPer  '+MgFlowPer);
			
			           
							   	tempJson.reading=sliderValue;
				    		 	tempJson.flowPercentage=MgFlowPer;
				    			tempJson.turbineReading=sliderValue;
				    			
				    		 	tempJson.pulses=Math.round(pulses.toFixed(2));
				    		 	tempJson.turbineFlowPercentage=MgFlowPer;
				    		 	JsonArr.push(tempJson);
				    		 	
							t.row.add(['<b>'+tempJson.reading+'</b>','<b>'+tempJson.flowPercentage+'</b>','<b>'+tempJson.turbineReading+'</b>','<b>'+tempJson.pulses+'</b>','<b>'+tempJson.turbineFlowPercentage+'</b>']).draw(false);
					 
			                masterJson.demo = JsonArr;
            	   }
               else if(flag!=0)
		 		{ pulses=supplierConstaint*sliderValue;
		 		 MgFlowPer=Math.round(100*(parseFloat(sliderValue)/parseFloat(max))); 
		 		//console.log(' MgFlowPer  '+MgFlowPer);

           
				   	tempJson.reading=sliderValue;
	    		 	tempJson.flowPercentage=MgFlowPer;
	    			tempJson.turbineReading=sliderValue;
	    			
	    		 	tempJson.pulses=Math.round(pulses.toFixed(2));
	    		 	tempJson.turbineFlowPercentage=MgFlowPer;
	    		 	JsonArr.push(tempJson);
	    		 	
	    		 		t.row.add(['<b>'+tempJson.reading+'</b>','<b>'+tempJson.flowPercentage+'</b>','<b>'+tempJson.turbineReading+'</b>','<b>'+tempJson.pulses+'</b>','<b>'+tempJson.turbineFlowPercentage+'</b>']).draw(false);
		 
                masterJson.demo = JsonArr;
            }	
		 
			});
		
       
			
});
		
		$('#noBlades').on('change', function() {
			var noblade= parseInt($("#noBlades").val());
			var bladeShape= parseInt($("#bladeShape").val());
			$('#errorMsg').show();
			$('#errorMsg').css("color","green");
//			console.log("no blades"+noblade);
//			console.log(" BladeShape"+bladeShape);
			
		 if(bladeShape==5 && noblade==6){
			 $('#errorMsg').css("color","red");
//				console.log("error in");
//				$('#errorMsg').html("this blade no avalible please contact to dhanashree - 9529252351");
				alert("this blade is not avalible ");
			}
		 
			if(noblade==2 )
			{
				$('#errorMsg').html("Enter a figure between 100 and 400 in the meter constant.");
			}
			else if(noblade==4)
				{
				$('#errorMsg').html("Enter a figure between 400 and 800 in the meter constant.");
				}
			else if(noblade==6)
				{
					$('#errorMsg').html("Enter a figure between 600 and 900 in the meter constant.");
				}
			
			
		});

		$('#materialType').on('change', function() {
			
			$('#errorMsgFluidType').show();
			$('#errorMsgFluidType').html('');
			$("#errorMsgFluidType").removeClass("alert alert-danger alert-success");
//			$("#errorMsgFluidType").addClass("alert alert-success");
			var  fluidType=$('#fluidType').val() ;
			var  materialType=$('#materialType').val() ;
			//Oxygen 
			if(fluidType=='#6b6a64')
			{	
				if(materialType!='2' && materialType!='5')
				{
				$("#errorMsgFluidType").addClass("alert alert-danger");
				$('#errorMsgFluidType').html(" Select proper material  ...");
				$("#checkConfg").prop('disabled',true);
				wrongMaterialType++;
				
				}else
				{
					
//					$("#errorMsgFluidType").addClass("alert alert-success");
//					$('#errorMsgFluidType').html("Correct  ...");
//					$('#errorMsgFluidType').fadeOut(1000);
					$("#checkConfg").prop('disabled',false);
					correctMaterialType++;
				}
				
			}	
			
			//Surphuic acid
			
			else if(fluidType=='#B0BF1A' )
			{	
				if(materialType!='1'){
				
					$("#errorMsgFluidType").addClass("alert alert-danger");
				$('#errorMsgFluidType').html(" Select proper material type ...");
				$("#checkConfg").prop('disabled',true);
				wrongMaterialType++;
				}
				else
				{
//					$("#errorMsgFluidType").addClass("alert alert-success");
//					$('#errorMsgFluidType').html("Correct  ...");
//					$('#errorMsgFluidType').fadeOut(1000);
					$("#checkConfg").prop('disabled',false);
					correctMaterialType++;
				}
			
			}	
			
			//water 
			
			else if(fluidType=='#0592f0' )
			{	
				if( materialType!='1' && materialType!='3' && materialType!='4')
				{
					$("#errorMsgFluidType").addClass("alert alert-danger");
					$('#errorMsgFluidType').html(" Select proper material type ...");
					$("#checkConfg").prop('disabled',true);
					wrongMaterialType++;
				}
				else
				{
//					$("#errorMsgFluidType").addClass("alert alert-success");
//					$('#errorMsgFluidType').html("Correct  ...");
//					$('#errorMsgFluidType').fadeOut(1000);
					$("#checkConfg").prop('disabled',false);
					correctMaterialType++;
				}
				
			}	
			
			//muddy water 
			
			
			else if(fluidType=='#694F04'  )
			{	
				if(materialType!='3' && materialType!='4'){
				$("#errorMsgFluidType").addClass("alert alert-danger");
				$('#errorMsgFluidType').html(" Select proper material type ...");
				$("#checkConfg").prop('disabled',true);
				wrongMaterialType++;
				}
				else
				{
//					$("#errorMsgFluidType").addClass("alert alert-success");
//					$('#errorMsgFluidType').html("Correct  ...");
//					$('#errorMsgFluidType').fadeOut(1000);
					$("#checkConfg").prop('disabled',false);
					correctMaterialType++;
				}
			
			}	
			
			
		});
		
		$( "#armodel").click(function() {
			   $("#centerText2").html("AR MODEL (QR CODE)"); 
			   $("#canvas-div").html("");
			 
			   var qrCode='<div class="container col-sm-4">'
				 +  '<div class="panel-body" id="qrCode" >'
				+   '<img src="images/QR_ARVR.png" height="400" width="400">'
				+'<hr>'
				+'<br><b class="noteB"><h4>NOTE :</h4><br> 1.   Please increase the volume of the device.</b>'
				+'<br><b class="noteB">2.    Minimum requirments for JigSpace - iPhone 6S or iPad 2017 and above, Mac OS 10.13 (High Sierra), Windows 7 (SP1+).  </b>'
				
	 			+   '</div>'
	 			+'</div>'
	 			+'<div class="container col-sm-8">'

				+  '<div class=" panel-body" id="qrInstractions" >'
				+'<center><b style="font-size:30px;margin-top:400px;">  Instruction for App(Apple mobile) </b></center>'
				+'<ol id="instractions"><li>Enable your internet connection .</li>'
				+'<li>Download JigSpace App from AppStore on your IOS device <a href="https://apps.apple.com/us/app/jigspace/id1111193492">(https://apps.apple.com/us/app/jigspace/id1111193492)</a></li>'
				+'<li>Open the camera App in your IOS device  .</li>'
				+'<li>Scan the QR Code and click on the link .</li>'
				+'<li>Click on view in the top right corner.</li>'
				+'<br>'
				+'<img src="images/screenview.jpg" height="500" width="300"></img>'
				+'<br>'
				+'<br><li>Find a horizontal flat surface and click on "Tap to place your Jig" or the "+" sign.</li>'
				+'<li>Zoom out and adjust view of model.</li>'
				+'<li>Click on the Next arrow.</li>'
				
				+'<ol>'
				
				+'</div>'
				+'</div>'
				
				  $("#canvas-div").html(qrCode);
		   });
		$('.slider').on('change', function() {
			val = $(".slider").val();
			$('.demo').html("Value : "+val);
		});
		 $("#pipeSize").change(function() {
			 var pipeSize=$("#pipeSize").val();
		       if(pipeSize == 1) {
		    	  
		    	   min=0.05;
					max=5.8;
					$(".slider").prop('min',min);
					$(".slider").prop('max',max); 
					$("#setRangeText").html(" <b>Pipe size : 15 mm Flow range : 0.05 - 5.8 ltr/sec</b>");
					
					
		       }
		       else if(pipeSize == 2)
		       {
		    	   min=0.22;
					max=2.2;
					$(".slider").prop('min',min);
					$(".slider").prop('max',max); 
					$("#setRangeText").html("<b> Pipe size : 25 mm Flow range : 0.22 - 2.2 ltr/sec</b>");
					
					
		       }
		       else if(pipeSize == 3)
		       {
		    	   min=0.52;
					max=5.27;
					$(".slider").prop('min',min);
					$(".slider").prop('max',max); 
					$("#setRangeText").html("<b> Pipe size : 40 mm Flow range : 0.52 - 5.27 ltr/sec</b>");
					
					
		       }
		       else if(pipeSize == 4)
		       {
		    	   min=0.97;
					max=9.7;
					$(".slider").prop('min',min);
					$(".slider").prop('max',max); 
					$("#setRangeText").html("<b>Pipe size : 50 mm Flow range : 0.97 - 9.7 ltr/sec</b>");
					
					
		       }
		   });
		 
	   $( "#checkConfg").click(function() {
		   
		  
		   $("#errorMsg").removeClass("alert alert-danger alert-success");
		   	fluidType=$("#fluidType").val();
		    $("#errorMsg").addClass("alert alert-success");
			 materialType=$("#materialType").val() ;
			 BladeShape=$("#bladeShape").val();
			 pipeSize=$("#pipeSize").val();
			 supplierConstaint=parseInt($("#supplierConstaint").val());
			 noBlades=parseInt($("#noBlades").val());
			 time1=parseInt($("#timer").val());
			
			
			$( "#readingTable" ).prop( "disabled", true );
		    var str='<img src="images/cancel.png" />'
		    	
//		    var noblade= parseInt($("#noBlades").val());
		
			$('#errorMsg').css("color","red");
		   	if(fluidType==0){
		   			str='<b id="errorText"> Select fluid type.</b> '
		   			$("#errorModel").html(str);
		   			skipFluidType++;
		   			
		   	}
			 if(materialType==0)
			{
				str='<b id="errorText"> Select material type. </b> '
		   			$("#errorModel").html(str);  
				skipMaterialType++;
			}
			 if(BladeShape==0)
			{
				str='<b id="errorText">Select blade shape. </b> '
		   			$("#errorModel").html(str);  
				skipShapeType++;
			}
			 if(pipeSize==0)
			{
				str='<b id="errorText">Select  pipe size. </b> '
		   			$("#errorModel").html(str); 
				skipPipeSize++;
			}
			
			 if(noBlades==0)
			{
				str='<b id="errorText">select no blades.</b> '
	   			$("#errorModel").html(str);
				skipNoBlades++;
			}
			 if(time1==0)
			{
				str='<b id="errorText">Set time. </b> '
	   			$("#errorModel").html(str); 
				skipTime++;
			}
			
			 if(isNaN(supplierConstaint))
			{
				str='<b id="errorText" >Dont skip Meter constant value.. </b> '
			   	$("#errorModel").html(str);
				skipMeterConstantCounter++;
			}
		    
//		     console.log(" skipNoBlades "+skipNoBlades);
//		     console.log(" skipShapeType "+skipShapeType);
//		     console.log(" skipMaterialType "+skipMaterialType);
//		     console.log(" skipFluidType "+skipFluidType);
//		     console.log(" skipPipeSize "+skipPipeSize);
//		     console.log(" skipTime "+skipTime); 
				   
		   	if(meterConstaintCheck()==1)
		   		{
		   			
		   		$("#rangePanel").show();
			     console.log(" correctMeterConstantCounter "+correctMeterConstantCounter);
			     console.log(" wrongMeterConstantCounter "+wrongMeterConstantCounter);
			     console.log(" correctMaterialType "+correctMaterialType);
			     console.log(" wrongMaterialType "+wrongMaterialType);
		   	
		   	    }
		
		   	
		   	
		   	
		   	
		});
		
	
	   function meterConstaintCheck(){

		    
			   if(noBlades == 2)
			   {
				   if(100 <= supplierConstaint && supplierConstaint <= 400)
				   {	
					   if(supplierConstaint % noBlades == 0 )
					   {
							$("#errorMsg").hide(); 
						   str='<img src="images/checked.png" class=" img-fluid " />'
						    +'<b id="errorText" style="color:green;" >Configured successfully ...  </b> '
						    
						    
						    
						    
						  $("#meterCon").html("METER CONSTANT VALUE IS "+supplierConstaint+" PULSES per/ltr");
						   	$("#errorModel").html(str);
							correctMeterConstantCounter++;
						   $("#checkConfg").hide();
                            $("#main-div-conf").append(table);
						 
						   $("#rowfluidType,#rowMaterialType,#rowBladeShape,#rowPipeSize,#rowBlades,#rowTimer,#rowSupplierConstaint").html('');
						   $("#centerText1").html('CHARACTERISATION');
						   $('#readingTable').show();
							 $("#rangePanel").show();
							 tempJson={};
								  tempJson.MaterialExpectedclick=1;
								  tempJson.MaterialActualclick=correctMaterialType;
								  tempJson.ExpectedMeterConstantCounter=1;
								  tempJson.ActualMeterConstantCounter=correctMeterConstantCounter;
								  
								
								 	JsonArr.push(tempJson);
								 	 masterJson.demo = JsonArr;
								 	mainJson.config=tempJson;
								 	console.log(masterJson);
						
						   return 1;
					   }
					   else
					   {
						   $("#errorMsg").addClass("alert alert-danger");
							$("#errorMsg").html(" input value is not divided by noblades");  
							
							str='<img src="images/cancel.png" class=" img-fluid " />'
							+'<b id="errorText" style="color:red;" >input value is not divided by noblades,Enter a figure between 400 and 800 in the meter constant.)  </b> '
						
							$("#errorModel").html(str); 
							wrongMeterConstantCounter++;
						}
					   
				   }
				   else
				   {
					   $("#errorMsg").addClass("alert alert-danger");
					   $("#errorMsg").html("Inputed value is not in range (Enter a figure between 100 and 400 in the meter constaint.)"); 
					   str='<img src="images/cancel.png" class=" img-fluid " />'
						    +'<b id="errorText" style="color:red;" >Enter a figure between 100 and 400 in the meter constant</b> '
						   	$("#errorModel").html(str); 
				   }
			   } 
			   else if(noBlades == 4)
			   {
				   if(400 <= supplierConstaint && supplierConstaint <= 800)
				   {	
					   if(supplierConstaint % noBlades == 0 )
					   {
						   
							$("#errorMsg").hide(); 
						   str='<img src="images/checked.png" class=" img-fluid " />'
						    +'<b id="errorText" style="color:green;" >Configured successfully ...  </b> '
						  $("#meterCon").html("METER CONSTANT VALUE IS "+supplierConstaint+" PULSES per/ltr");
						   	$("#errorModel").html(str); 
						   	correctMeterConstantCounter++;
						   $("#checkConfg").hide();
						   $("#main-div-conf").append(table);
						   
						   
						   $("#rowfluidType,#rowMaterialType,#rowBladeShape,#rowPipeSize,#rowBlades,#rowTimer,#rowSupplierConstaint").html("");
						   $("#centerText1").html('READING AND CALCULATION');
						   $('#readingTable').show();
							 $("#rangePanel").show();
							   
							 tempJson={};
								  tempJson.MaterialExpectedclick=1;
								  tempJson.MaterialActualclick=correctMaterialType;
								  tempJson.ExpectedMeterConstantCounter=1;
								  tempJson.ActualMeterConstantCounter=correctMeterConstantCounter;
								  
								
								 	JsonArr.push(tempJson);
								 	 masterJson.demo = JsonArr;
								 	console.log(masterJson);
							 
						   return 1;
					   }
					   else
					   {
						    $("#errorMsg").addClass("alert alert-danger");
							$("#errorMsg").html(" input value is not divided by noblades");  
							str='<img src="images/cancel.png" class=" img-fluid " />'
							+'<b id="errorText" style="color:red;" >input value is not divided by noblades,Enter a figure between 400 and 800 in the meter constant.)  </b> '
							$("#errorModel").html(str); 
							wrongMeterConstantCounter++;
						}
					   
				   }
				   else
				   {
					   $("#errorMsg").addClass("alert alert-danger");
					   $("#errorMsg").html("Inputed value is not in range (Enter a figure between 400 and 800 in the meter constant.)"); 
					   str='<img src="images/cancel.png" class=" img-fluid " />'
						    +'<b id="errorText" style="color:red;" >Enter a figure between 400 and 800 in the meter constant.</b> '
						   	$("#errorModel").html(str); 
				   }
			   }
			   else if(noBlades == 6)
			   {
				   if(600 <= supplierConstaint && supplierConstaint <= 900)
				   {	
					   if(supplierConstaint % noBlades == 0 )
					   {
						   
							$("#errorMsg").hide(); 
						   str='<img src="images/checked.png" class=" img-fluid " />'
						    +'<b id="errorText" style="color:green;" >Configured successfully ...  </b> '
						  $("#meterCon").html("METER CONSTANT IS "+supplierConstaint+" PULSES per/ltr");
						   	$("#errorModel").html(str);
							correctMeterConstantCounter++;
						   $("#checkConfg").hide();
                           $("#main-div-conf").append(table);
						   $("#rowfluidType,#rowMaterialType,#rowBladeShape,#rowPipeSize,#rowBlades,#rowTimer,#rowSupplierConstaint").html("");
						   $("#centerText1").html('READING AND CALCULATION');
						   $('#readingTable').show();
							 $("#rangePanel").show();
                          // $("#main-div-conf").append(table);
								tempJson={};
								  tempJson.MaterialExpectedclick=1;
								  tempJson.MaterialActualclick=correctMaterialType;
								  tempJson.ExpectedMeterConstantCounter=1;
								  tempJson.ActualMeterConstantCounter=correctMeterConstantCounter;
								  
								
								 	JsonArr.push(tempJson);
								 	 masterJson.demo = JsonArr;
								 	console.log(masterJson);
								 	
						   return 1;
					   }
					   else
					   {
						    $("#errorMsg").addClass("alert alert-danger");
							$("#errorMsg").html(" input value is not divided by noblades");  
							str='<img src="images/cancel.png" class=" img-fluid " />'
							+'<b id="errorText" style="color:red;" >input value is not divided by noblades,Enter a figure between 600 and 900 in the meter constant.)  </b> '
							$("#errorModel").html(str); 
							wrongMeterConstantCounter++;
						}
					   
				   }
				   else
				   {
					   $("#errorMsg").addClass("alert alert-danger");
					   $("#errorMsg").html("Inputed value is not in range (Enter a figure between 600 and 900 in the meter constant.)"); 
					   str='<img src="images/cancel.png" class=" img-fluid " />'
						    +'<b id="errorText" style="color:red;" >input value is wrong.</b> '
						   	$("#errorModel").html(str); 
				   }
			   }
//				var arrayJsonCounter=[];
//		   		masterJsonCounter={};
//		   		//Counter Json
//		   		TempJson= {};
//				TempJson.correctMeterConstantCounter = correctMeterConstantCounter;
//				TempJson.wrongMeterConstantCounter = wrongMeterConstantCounter;
//				//TempJson.skipMeterConstantCounter = skipMeterConstantCounter;
//				TempJson.correctMaterialType = correctMaterialType;
//				TempJson.wrongMaterialType = wrongMaterialType;
//				
//				arrayJsonCounter.push(TempJson);
//				masterJsonCounter.demo = arrayJsonCounter;
//			
//				console.log(masterJsonCounter);
			
		} 
	   $( "#nextLevel").click(function() {
		   $("#mainDiv").html('');
		   simulation();
	   });
	  
	   $( "#showGraph").click(function() {
		   
		  
		   
		   $("#canvas-div").html("");
            $("#centerText2").html('CHARACTERISATION CURVE FOR FLOW METER');
            
            
          // google.charts.setOnLoadCallback(GraphCreation(masterJson));
            GraphCreation(masterJson);
		   
	   });
function  GraphCreation(masterJson)
{
//	if(masterJson.demo.length==0)
//		{ 
//			$("#errorMsg").html(''); 
//		   str='<img src="images/cancel.png" class=" img-fluid " />'
//			    +'<b id="errorText" style="color:red;" >You have take at list 5 reading...</b> '
//			   	$("#errorModel").html(str); 
//			
//		}
	$("#canvas-div").html("");
	$("#canvas-div").css("height","700px");
	$("#canvas-div").css("width","800px");
	var graphData=[];
	var xdata=[];
	var ydata=[];
	   for(var i=0;i<masterJson.demo.length;i++)
	{
	   xdata[i]=masterJson.demo[i].flowPercentage;
	   ydata[i]=masterJson.demo[i].turbineFlowPercentage;
	}
	
	   xdata.sort(function(a, b){return a - b});
	   ydata.sort(function(a, b){return a - b});
//	   console.log(" xdata arr"+xdata);  
//	   console.log(" ydata arr"+ydata);  
	   tempArr=[];
		  tempArr[0]=1;
		    tempArr[1]=1;
	  graphData.push(tempArr);
	   for(var j=0;j<masterJson.demo.length;j++)
		{ 
		   tempArr=[];
		  tempArr[0]=xdata[j];
		    tempArr[1]=ydata[j];
//		    console.log(" temp arr"+tempArr);
		   graphData.push(tempArr);
//		   console.log(" graph data"+graphData);
		}
	 	 tempArr=[];
		  tempArr[0]=100;
		    tempArr[1]=100;
	  graphData.push(tempArr);
	  
//	    console.log(" graph data"+graphData);
	Highcharts.chart('canvas-div', {
		
//		 style: {
//	            fontFamily: 'serif',
//	            color:'red',
//				fontsize:'3em'
//	
//	        },
		
	  title: {
	   text: 'Standard graph of turbine flow meter',
		   title: {
//		        style: {
//		            color: '#000',
//		            fontWeight: 'bold',
//		            font: 'Arial',
//		            fontsize:'2em'
//		        }
		    },
	  },
	  subtitle: {
	   text: 'Meter Constant is '+supplierConstaint+'pulses (per/ltr)'
	  },
	  xAxis: {
	    min: 0.01,
	    max: 100,
	    title: {
            text: 'Turbine flow meter(flow %)'
        }
	  },
	  yAxis: {
	    min: 0.01,
		max: 100,
		 title: {
	            text: 'Magnatic flow meter (flow %)'
	        }
		
	  },
//	  plotOptions: {
//	        column: {
//	            borderRadius: 10
//	        }
//	    },
	  tooltip: {
	        backgroundColor: 'black',
	        	style: {
	                color: '#fff',
	                fontWeight: '60'
	            }
	    },
	  series: [
		  {
	    type: 'line',
	    name: 'Standard value',
	    data: [[0, 0], [100, 100]],
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
	   
	   data:graphData,
	    marker: {
	      radius: 4
	    }
	  }]
	
	});
 } 
	   
	   

	   // this function for animation 
	   $("#animateSimulation").click(function() {
		   $("#canvas-div").html('');

		   $("#centerText2").html('ANIMATION OF TURBINE FLOW METER');
//		   console.log('fluidType'+fluidType);
//		   console.log('materialType'+materialType);
//		   console.log('BladeShape'+BladeShape);
//		   console.log('pipeSize'+pipeSize);
//		   console.log('noBlades'+noBlades);
//		   console.log('time'+time1);
		   var time2=time1*10;
		   animateSimulation(BladeShape,pipeSize,noBlades,time2,materialType,fluidType,supplierConstaint );
			 
	   });
	// this function for animation 
	   $( "#nextLevelMimc").click(function() {
		   $("#canvas-div").html('');
           $("#main-div-conf").html('');
           $("#centerText2").html('TURBINE FLOW METER');
           
       
           
           
           var add='<h3><center style="color:blue;">Meter constant value '+supplierConstaint+' Pulses per/ltr</center></h3>'
           +'<div class="row container">'
	           +'<div class="col-sm-12">'
	           +'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">'
	           +'READ PROCEDURE '
	           +'</button>'
	         
	           +'</div>'
         
           +'</div>'
           +' <!-- Modal -->'
           +' <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'
           +'  <div class="modal-dialog" role="document">'
           +'   <div class="modal-content">'
           +'       <div class="modal-header">'
           +'      <h1 class="modal-title" id="exampleModalLabel">Procedure</h1>'
           +'       <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
           +'        <span aria-hidden="true">&times;</span>'
           +'     </button>'
           +'     </div>'
           +'    <div class="modal-body">'
          
           +'<h3>Configuration:-</h3>'
           +'<li>1 . Configure your turbine flow meter with selected fluid type, material type of blade , blade type , pipe size , time in sec and enter the meter constant .  </li>'
           +'<li> 2 . Click on "Check Configuration" button</li> '
           +'<li> 3. If Configuration is correct you have to select diffrent values of flow range by using slider and click on submit button respectively. Observe the table.</li>'
           +' <li> 4 . plot the graph</li>'
           +'<li>  5. After this click on next simulation step.</li>'
           +'<h3>Simulation:- </h3>'
           +'<li> 1. Reset the tare weight</li> '
          +'<li> 2. Click on the suction valve(V1) , after clicking its color turns to green which indicated it is ON and liquid supply to pump.</li>'
           +'<li>3.  Adjust the VFD speed clicking on plus and minus buttons . Select  minimum and maximum speed of flow.</li>'
           +'<li>4. To start the pump , click on the pump it turns green and  liquid flow through pump with selected speed for sec of time which is configured in earlier stage.</li>'
           +'<li> 5.  Observe the  reading of LT weight , Turbine flow meter , Magnetic flow meter and WT weight.</li>'
           +'<li> 6. After the process, pump will stop , then you have to click on V2 valve it will turn green to drain the tank 2 and fill the tank 1.</li>'
           +'<li> 7. Follow the same process for at least for 10 times and note the all readings including speed range in min and max flow.</li>'
           +'<li> 8. After completing the all process , click on V3 drain valve to drain the tank 1.</li>' 
           +'<li> 9. The simulation is finished and you can click on next for animation.</li>'

          +'<h3> Animation:-</h3>'
           +'<li>1. After clicking the animation is start as per the configured in earlier stage in which it count the number rotations . also convert into units.</li>'
                 +'      </div>'
                 +'       <div class="modal-footer">'
                 +'    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
//                 +'    <button type="button" class="btn btn-primary">Save changes</button>'
                 +'    </div>'
                 +' </div>'
                 +' </div>'
                 +' </div>'
          
           +'<div class="row" id="CalculateActualFlow" >'
           +'<hr style="width:100%;height:2px;color:black;">'
           +'<div class="col-sm-5">'
	       +'<label  id=""  class="" style="font-size:16px;margin-top:35px;">Actual instantaneous flow of turbine flow meter is :</label>'
	       +'</div>'
           +'<div class="col-sm-3">'
	       +'<input type="text" id="flowAns" style="margin-top:35px;width:100%;"  class=" form-control"/>'
	       +'</div>'
	       +'<div class="col-sm-3">'
	       +'<br><button type="submit" id="btnAnsCheck" style="margin-top:17px;width:100%;" class=" btn btn-primary" data-toggle="modal" data-target="#mimicModel" >Submit</button>'
	       +'<div class="row">'
		   +'<div class="col-sm-12">'
//		   +'<button type="button" class="btn btn-danger btnStyle" id="checkConfg" data-toggle="modal" data-target="#myModal" disabled>CHECK CONFIGURATION </button>'
		   +'<div class="modal fade" id="mimicModel" role="dialog">'
		   +'<div class="modal-dialog">'
		   +'<!-- Modal content-->'
		   +' <div class="modal-content">'
		   +'<div class="modal-header bg-info"  >'
		  
		   +'<h4 class="modal-title">Message box</h4>'
		   +'<button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
		   +'</div>'
		   +'<div class="modal-body" id="mimicModelMessage" >'
		 
		   
		   +'</div>'
		   +'<div class="modal-footer">'
		   +'<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
		   +'</div>'
		   +'</div>'
		   +'</div>'
		   +'</div>'
		   +'</div>'
		   +'</div>'
	       +'</div>'
	      
	       
           +'</div>'
     
           
           $("#main-div-conf").html(add);
          

		   var time2=time1*1000;
		   stop();
		 nextLevelMimc(BladeShape,pipeSize,noBlades,time2,materialType,fluidType,supplierConstaint,time1);

			
			
	   });

		 
}  
			
	   
	   
