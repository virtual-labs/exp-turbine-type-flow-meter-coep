 function resultAnalysis()
{
	  $("#btnForModal").prop("hidden",true);
	  $("#pdfDownload").prop("hidden",false);
	  
	 tempJson = {};
   
	 var wrongAns = 6 - ansCount;
	 var tempCountJson = {};
	 tempCountJson.correctAnswer = ansCount;
	 tempCountJson.wrongAnswer = wrongAns;
	 mainJson.questionary = tempCountJson;
	 
	 function generatePDF() {
    // Select the div by its ID
    const element = document.querySelector("#mainDiv");

    // Use html2canvas to capture the element as a canvas
    html2canvas(element, {
        scale: 3,  // Increase the scale for better resolution (adjustable)
        useCORS: true // In case of cross-origin issues with external resources like images
    }).then(function (canvas) {
        // Convert the canvas to image data in PNG format
        const imgData = canvas.toDataURL("image/png", 1.0); // No compression

        // Initialize the PDF document in landscape mode ('l') and A4 size
        const pdf = new jspdf.jsPDF('l', 'mm', 'a4');
        
        // Define the width and height for the image to fit in the landscape A4 page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Keep aspect ratio

        // Define the top margin (in mm)
        const topMargin = 10;

        // Check if the image height exceeds the landscape page height minus the top margin
        if (pdfHeight > pdf.internal.pageSize.getHeight() - topMargin) {
            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight() - topMargin;

            // Loop over the content to fit into multiple pages in landscape
            while (position < canvas.height) {
                const pageData = canvas.getContext('2d').getImageData(0, position, canvas.width, canvas.height - position);

                // Create a new image element from the slice
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = canvas.width;
                pageCanvas.height = canvas.height - position < pageHeight ? canvas.height - position : pageHeight;
                pageCanvas.getContext('2d').putImageData(pageData, 0, 0);

                const imgData = pageCanvas.toDataURL('image/png', 1.0);  // Avoid compression
                
                pdf.addImage(imgData, 'PNG', 0, topMargin, pdfWidth, (pdfWidth * pageCanvas.height) / pageCanvas.width);

                position += pageHeight;

                if (position < canvas.height) {
                    pdf.addPage();
                }
            }
        } else {
            // If it fits on one page, simply add the image to the PDF in landscape with the top margin
            pdf.addImage(imgData, 'PNG', 0, topMargin, pdfWidth, pdfHeight);
        }

        // Save the generated PDF
        pdf.save("turbine_flow_meter_Report.pdf");
    });
}

// Set up the button click event to generate the PDF
$("#pdfDownload").on("click", function(){
    generatePDF();
});

// Set up the button click event to generate the PDF
//document.addEventListener("DOMContentLoaded", function () {
//    document.getElementById("pdfDownload").addEventListener("click", generatePDF);
//});


$("#pdfDownload").on("click", function(){
	console.log("click event generated");
	generatePDF();
})	




var quesPercent = 0;
var confPercent = 0;
var mimicPercent = 0;
var calibratePercent = 0;
var faultPercent = 0;


var correctVal = (mainJson.questionary.correctAnswer/6).toFixed(2);
	 quesPercent = (correctVal*100).toFixed(1);
	quesPercent = parseFloat(quesPercent);
    console.log(quesPercent);
    
 
var conf = (mainJson.config.MaterialExpectedclick+mainJson.config.ExpectedMeterConstantCounter);
var wrongConf = (mainJson.config.MaterialActualclick+mainJson.config.ActualMeterConstantCounter);
      
var conPer = ((conf/(wrongConf+conf))*100).toFixed(1);
    confPercent = parseFloat(conPer);
    console.log(confPercent);
    
    
var mimicCal = ((mainJson.mimic.ExptAnsSubmit/(mainJson.mimic.ExptAnsSubmit+mainJson.mimic.ActualAnsSubmit))*100).toFixed(1);
  mimicPercent = parseFloat(mimicCal);
   console.log(mimicPercent);


var totCount = mainJson.mimic.ExptZeroErrorCounter + mainJson.mimic.ExptspanErrorCounter + mainJson.mimic.ExptAccurancyCounter+mainJson.mimic.ExptlineralityCounter;

var actualCount = mainJson.mimic.actualZeroErrorCounter + mainJson.mimic.spanErrorCounter + mainJson.mimic.accurancyCounter+mainJson.mimic.lineralityCounter;

var perCal =  ((totCount/(actualCount+totCount))*100).toFixed(1);
   calibratePercent = parseFloat(perCal);
     console.log(calibratePercent);


var fault = (3/(mainJson.mimic.faultFinding + 3)*100).toFixed(1);

faultPercent = parseFloat(fault);
console.log(calibratePercent);

    var zeroCnt = parseInt(mainJson.mimic.actualZeroErrorCounter)-parseInt(1);
    
    if(zeroCnt<0){
	zeroCnt = 0;
}
    
    var spanCnt = parseInt(mainJson.mimic.spanErrorCounter)-parseInt(1);
    if(spanCnt<0){
	spanCnt = 0;
}

     var linearity = parseInt(mainJson.mimic.lineralityCounter)-parseInt(1);
     if(linearity<0){
	linearity = 0;
}
     
     var accuracy = parseInt(mainJson.mimic.accurancyCounter)-parseInt(1);
      if(accuracy<0){
	accuracy = 0;
}
     
    var htm = ''
	+ '<div class="container-fluid">'

	+ '</div>'

	+ '<div class="col-md-12">'
	+ ' <div class="panel remarkBground" >'
	+ ' <div class="panel-body remark" style = "font-size:18px;"><center><b>Turbine flow meter experiment is completed successfully!!</b>'
//	+ '<br> <b>Satisfactory performance</b></center>
    +'</div>'
	+ '</div>'
	+ '</div>'

//
    +'<div class="container-fluid">'
		+'  <div class="row">'
		+'<div class="col-md-4">'
	
		 +'<br><table class="table table-bordered ">'
		   +'  <thead class="thead-dark">'
		   +'    <tr class="">'
		   +'      <th><center class="">COMPETENCY(TURBINE TYPE FLOW METER)</center></th>'
		   +'     <th><center class="">STATUS</center></th>'
		   +'    </tr>'
		   +' </thead>'
		   +'  <tbody>'
		   +'   <tr>'
		   +'     <td class=""><center>Basic knowledge</center></td>'
		   
		   if(quesPercent>=60){
		   htm +='<td class=""><center class="attained"> Attained</center></td>'
		  }else{
			htm+= ' <td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		   htm+='  </tr>'
		    +'  <tr>'
		   +'     <td class=""><center>Configuration</center></td>'
         
			if(confPercent>=60){
				 htm +='<td class=""><center class="attained"> Attained</center></td>'
			}else{
				htm+= ' <td class=""><center class="NotAttained"> Not Attained</center></td>'
			}
			
		
		  htm  +=' </tr>'
		  
		   +'  <tr>'
		   +'     <td class=""><center>Animation</center></td>'
		   +'<td class=""><center class="attained"> Attained</center></td>'
		   +'   </tr>'
		    +'  <tr>'
		    +'     <td class=""><center>Characterization (Mimic)</center></td>'
		   if(mimicPercent >= 60){ 
		  htm +='<td class=""><center class="attained"> Attained</center></td>'
		   }else{
			htm+= ' <td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		 htm  +=' </tr>'
		   +'   <tr>'
		  +'     <td class=""><center>Calibration</center></td>'
		  if(calibratePercent>=60){
		   htm +='<td class=""><center class="attained"> Attained</center></td>'
		  }else{
		   htm+= ' <td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		htm += '  </tr>'
		   +'  <tr>'
		   +'<td class=""><center>Fault finding</center></td>'
		   if(faultPercent>=60){
			htm +='<td class=""><center class="attained"> Attained</center></td>'
		}else{
			htm+= ' <td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		  htm +='</tr>'
		   +'<tr>'
		  
		  +'</tr>'
		
		   +' </tbody>'
		  +' </table>'
		  
		+' </div>'
		+'<div class="col-md-4" id="graph-div" >'

		+' </div>'
		
		+'<div class="col-md-4">'
		+' <div class="panel panel-danger headingPanel">'
		+' <div class="panel-body" id="panelbody">'
		+'<center><span class="heading1"><b>Basic Knowledge </b></span></center>'		
		+'</div>'
		+'</div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:15px;">'
		+'<center><span class="valueBox">Total Questions</span></center>'
		+' <div class="panel-body counterPanelRed">'
		+'<center><span class="valueBox">6</span></center>'
		+' </div>'		
		+'</div>'		
		+' </div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:15px;">'
		+'<center><span class="valueBox">Correct Answers</span></center>'
		+' <div class="panel-body counterPanelGreen">'
		+'<center><span class="valueBox">'+mainJson.questionary.correctAnswer+'</span></center>'
		+' </div>'		
		+'</div>'		
		+' </div>'
		
		
		
		+'<div class="col-md-12">'
//		+'<div class="col-md-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody">'
		+'<center><span class="heading1"><b>Configuration</b></span></center>'
		+'</div>'
		+'</div>'
		
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+wrongConf+'</b></span></center>'
		+'</div>'
		+'</div>'
//		+'<span class="heading1">4 </span>'
		+'</div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempt</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'
//		+'<span class="heading1">1 </span>'
		+'</div>'
		+'</div>'
		+' </div>'
		+' </div>'//closing of col 4
		
		
		
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel">'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>Characterization (Mimic)</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+mainJson.mimic.ActualAnsSubmit+'</b></span></center>'
		+'</div>'
		+'</div>'
      
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempts</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>'+mainJson.mimic.ExptAnsSubmit+'</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		
		+' </div>'
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>Zero Error</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+zeroCnt+'</b></span></center>'
		+'</div>'
		+'</div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempts </span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		+' </div>'
		
		
		
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>Span Error</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+spanCnt+'</b></span></center>'
		+'</div>'
		+'</div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempts </span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		+' </div>'
		
		+' </div>'
		+' </div>'
		
		
		
		
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel">'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>Linearity</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+linearity+'</b></span></center>'
		+'</div>'
		+'</div>'
      
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempts</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		
		+' </div>'
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>Accuracy</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+accuracy+'</b></span></center>'
		+'</div>'
		+'</div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempts </span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		+' </div>'
		
		
		
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>Fault finding</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+mainJson.mimic.faultFinding+'</b></span></center>'
		+'</div>'
		+'</div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;">'
		+'<center><span class="valueBox">Correct Attempts </span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>3</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		+' </div>'
		
		
		
		
		+' </div>'
		+' </div>'
		
		
		
		
		
		
		$("#mainDiv").html(htm);
		
		let initialData = [];
		initialData = [
	{ name: 'Questionaries', y: quesPercent },
    { name: 'Configuration', y: confPercent },
    { name: 'Mimic', y: mimicPercent },
    { name: 'Calibration', y: calibratePercent },
    { name: 'Fault finding', y: faultPercent } 
    ];
    
    let chart = Highcharts.chart('graph-div', {
	exporting: { enabled: false },
				credits: { enabled: false},
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Observations'
    },
    series: [{
        name: 'Observed',
        //colorByPoint: true,
        data: initialData
    }],
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f} %'
            }
        }
    }
});
	 
}