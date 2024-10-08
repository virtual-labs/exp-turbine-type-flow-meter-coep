 function resultAnalysis()
{
	 console.log(mainJson);
	 var MaterialActualclick=0;
	 var ActualMeterConstantCounter=0;
	 //Animation click counter
	 var ActualanimationStart=0;
	 var ExpectedanimationEnd=0;
	 //mimic 
	 var	resetExptd= 0 ;
	 var	resetActul=0 ;
	 var	V1Exptd	=0 ;
	 var	V1Actual =0 ;
	 var	V2Exptd	=0 ;
	 var	V2Actual=0;
	 var	pumpExptd=0;
	 var	pumpActual=	0;
	 var	ExptAnsSubmit=0;
	 var	ActualAnsSubmit=0 ;
	 var	actualZeroErrorCounter=0;
	 var	ExptZeroErrorCounter=0;
	 var	spanErrorCounter=0;
	 var	ExptspanErrorCounter=0;
	 var	accurancyCounter=0;
	 var	ExptAccurancyCounter=0;
	 var	lineralityCounter=0;
	 var	ExptlineralityCounter=0;
	 
if("config" in mainJson)
{
	MaterialActualclick=mainJson.config.MaterialActualclick;
	 ActualMeterConstantCounter=mainJson.config.ActualMeterConstantCounter;
}
if("animation" in mainJson)
{
	 //Animation click counter
	  ActualanimationStart=mainJson.animation.ActualanimationStart;
	  ExpectedanimationEnd=mainJson.animation.ExpectedanimationEnd;
}	
	


//MIMIC click counter
if("mimic" in mainJson)
{
	resetExptd= mainJson.mimic.resetExptd ;
	resetActul=mainJson.mimic.resetActul ;
	V1Exptd	=mainJson.mimic.V1Exptd ;
	V1Actual =mainJson.mimic.V1Actual ;
	V2Exptd	=mainJson.mimic.V2Exptd ;
	V2Actual=mainJson.mimic.V2Actual;
	pumpExptd=mainJson.mimic.pumpExptd ;
	pumpActual=	mainJson.mimic.pumpActual;	

	//CALIBRATION click counter

	ExptAnsSubmit=mainJson.mimic.ExptAnsSubmit ;
	ActualAnsSubmit=mainJson.mimic.ActualAnsSubmit ;
	actualZeroErrorCounter=mainJson.mimic.actualZeroErrorCounter;
	ExptZeroErrorCounter=mainJson.mimic.ExptZeroErrorCounter;
	spanErrorCounter=mainJson.mimic.spanErrorCounter;
	ExptspanErrorCounter=mainJson.mimic.ExptspanErrorCounter;
	accurancyCounter=mainJson.mimic.accurancyCounter;
	ExptAccurancyCounter=mainJson.mimic.ExptAccurancyCounter;
	lineralityCounter=	mainJson.mimic.lineralityCounter;
	ExptlineralityCounter=mainJson.mimic.ExptlineralityCounter;
}




var htm='<div class="container-fluid">'
+'<h2 class="panel panel-primary"> <div class="panel-heading"><center>RESULT ANALYSIS </center></div></h2>'
  // +'<h4 class="panel panel-success"> <div class="panel-heading"><center>CONFIGURATION </center></div></h4>'
  +'<div class="row">'
   +'  <div class="col-sm-4">'
   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center>CONFIGURATION </center></div></h4>'
  +'   		 <div class="col-sm-6">'
  +'   				 <div class="panel panel-success">'
  +'     					        <div class="panel-heading"><center><h4>MATERIAL TYPE</h4></center></div>'
  +'      							<div class="panel-body">'
  +'    									<div class="col-sm-6 border">'
  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
  +'												<h5> <center>1</center></h5>'
  +'               							 </div>'
  +'    									<div class="col-sm-6 border">'
  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
  +'											<h5><center>'+MaterialActualclick+'</center></h5>'
  +'           								 </div>'
   +'   							</div>'
  +'  				</div>' 
  +'          </div>'
   +'   		 <div class="col-sm-6">'
  +'   				 <div class="panel panel-success">'
  +'     					        <div class="panel-heading"><center><h4>METER CONSTAINT</h4></center></div>'
  +'      							<div class="panel-body">'
  +'    									<div class="col-sm-6 border">'
  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
  +'												<h5> <center>1</center></h5>'
  +'               							 </div>'
  +'    									<div class="col-sm-6 border">'
  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
  +'											<h5><center>'+ActualMeterConstantCounter+'</center></h5>'
  +'           								 </div>'
   +'   							</div>'
  +'  				</div>' 
  +'          </div>'
   +'  </div>'//Col-4 close config
   +' <div class="col-sm-4">'
   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center>ANIMATION </center></div></h4>'
   +'   		 <div class="col-sm-6">'
  +'   				 <div class="panel panel-success">'
  +'     					        <div class="panel-heading"><center><h4>ANIMATION START</h4></center></div>'
  +'      							<div class="panel-body">'
  +'    									<div class="col-sm-6 border">'
  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
  +'												<h5> <center>1</center></h5>'
  +'               							 </div>'
  +'    									<div class="col-sm-6 border">'
  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
  +'											<h5><center>'+ActualanimationStart+'</center></h5>'
  +'           								 </div>'
   +'   							</div>'
  +'  				</div>' 
  +'          </div>'
   +'   		 <div class="col-sm-6">'
  +'   				 <div class="panel panel-success">'
  +'     					        <div class="panel-heading"><center><h4>ANIMATION END</h4></center></div>'
  +'      							<div class="panel-body">'
  +'    									<div class="col-sm-6 border">'
  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
  +'												<h5> <center>1</center></h5>'
  +'               							 </div>'
  +'    									<div class="col-sm-6 border">'
  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
  +'											<h5><center>'+ExpectedanimationEnd+'</center></h5>'
  +'           								 </div>'
   +'   							</div>'
  +'  				</div>' 
  +'          </div>'
   +'</div>'
   +' <div class="col-sm-4">'
   +'<h4 class="panel panel-success" > <div class="panel-heading"><center>PERFORMANCE </center></div></h4>'
   +'   		 <div class="col-sm-12">'
				 +'<table class="table table-bordered">'
				   +'  <thead>'
				   +'    <tr class="Warning">'
				   +'      <th><center>COMPETENCY(TURBINE FLOW METER)</center></th>'
				   +'     <th><center>STATUS</center></th>'
				   +'    </tr>'
				   +' </thead>'
				   +'  <tbody>'
				   +'   <tr>'
				   +'     <td class="info"><center>Basic knowledge</center></td>'
				   +'     <td class="success"><center> Attained</center></td>'
				  
				   +'  </tr>'
				   +'  <tr>'
				   +'     <td class="info"><center>Configuration</center></td>'
				   +'     <td class="danger"><center>Not Attained</center></td>'
				   +' </tr>'
				   +'   <tr>'
				  +'     <td class="info"><center>Connection diagram</center></td>'
				   +'     <td class="success"><center>Attained</center></td>'
				  
				   +'  </tr>'
				   +'  <tr>'
				+'     <td class="info"><center>Characterization</center></td>'
				   +'     <td class="danger"><center>Not Attained</center></td>'
				   +' </tr>'
				   +'   <tr>'
				  +'     <td class="info"><center>Calibration</center></td>'
				   +'     <td class="success"><center> Attained</center></td>'
				  
				   +'  </tr>'
					+'   <tr>'
				  +'     <td class="info"><center>Fault detection</center></td>'
				   +'     <td class="success"><center> Attained</center></td>'
				  
				   +'  </tr>'
				   +' </tbody>'
				  +' </table>'
     +' </div>' 
   +' </div>' 
+'  </div>'// Row Close
//LINEARITY ERROR DETECTION
+'<div class="container-fluid">'

	  +'<div class="row">'
	   +'  <div class="col-sm-2">'
	   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center>ACTUAL FLOW CACULATION</center></div></h4>'
	  +'   		 <div class="col-sm-12">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>CALCULATION </h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+ExptAnsSubmit+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+ActualAnsSubmit+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
//	   +'   		 <div class="col-sm-6">'
//	  +'   				 <div class="panel panel-success">'
//	  +'     					        <div class="panel-heading"><center><h4>METER CONSTAINT</h4></center></div>'
//	  +'      							<div class="panel-body">'
//	  +'    									<div class="col-sm-6 border">'
//	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
//	  +'												<h5> <center>1</center></h5>'
//	  +'               							 </div>'
//	  +'    									<div class="col-sm-6 border">'
//	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
//	  +'											<h5><center>'+ActualMeterConstantCounter+'</center></h5>'
//	  +'           								 </div>'
//	   +'   							</div>'
//	  +'  				</div>' 
//	  +'          </div>'
	   +'  </div>'//Col-4 close config
	   +' <div class="col-sm-10">'
	   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center> LINEARITY ERROR DETECTION </center></div></h4>'
	   +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>ZERO ERROR</h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+1+'</center></h5>'
	  +'               							 </div>'
	 
		
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+actualZeroErrorCounter+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
	   +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>SPAN ERROR</h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+1+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+spanErrorCounter+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
//	   +'</div>'
//	   +' <div class="col-sm-4">'
//	   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center>ANIMATION </center></div></h4>'
	   +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>ACCURANCY </h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+1+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+ExptAccurancyCounter+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
	   +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>LINEARITY</h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+1+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+ExptlineralityCounter+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
	   +'</div>'
	   
	+'  </div>'// Row Close

	// MIMIC
	+'<div class="container-fluid">'
//Col-4 close config
	   +' <div class="col-sm-12">'
	   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center> MIMIC </center></div></h4>'
	   +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>V1</h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+V1Exptd+'</center></h5>'
	  +'               							 </div>'
	 +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+V1Actual+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
	   +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>V2</h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+V2Exptd+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+V2Actual+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
//	   +'</div>'
//	   +' <div class="col-sm-4">'
//	   +'<h4 class="panel panel-primary"> <div class="panel-heading"><center>ANIMATION </center></div></h4>'
//	   +'   		 <div class="col-sm-2">'
//	  +'   				 <div class="panel panel-success">'
//	  +'     					        <div class="panel-heading"><center><h4>V3 </h4></center></div>'
//	  +'      							<div class="panel-body">'
//	  +'    									<div class="col-sm-6 border">'
//	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
//	  +'												<h5> <center>'+accurancyCounter+'</center></h5>'
//	  +'               							 </div>'
//	  +'    									<div class="col-sm-6 border">'
//	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
//	  +'											<h5><center>'+ExptAccurancyCounter+'</center></h5>'
//	  +'           								 </div>'
//	   +'   							</div>'
//	  +'  				</div>' 
//	  +'          </div>'
	  +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>RESET</h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+resetExptd+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+resetActul+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
	 
	  +'   		 <div class="col-sm-3">'
	  +'   				 <div class="panel panel-success">'
	  +'     					        <div class="panel-heading"><center><h4>PUMP ON </h4></center></div>'
	  +'      							<div class="panel-body">'
	  +'    									<div class="col-sm-6 border">'
	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
	  +'												<h5> <center>'+pumpExptd+'</center></h5>'
	  +'               							 </div>'
	  +'    									<div class="col-sm-6 border">'
	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
	  +'											<h5><center>'+pumpActual+'</center></h5>'
	  +'           								 </div>'
	   +'   							</div>'
	  +'  				</div>' 
	  +'          </div>'
//	   +'   		 <div class="col-sm-2">'
//	  +'   				 <div class="panel panel-success">'
//	  +'     					        <div class="panel-heading"><center><h4>LINEARITY</h4></center></div>'
//	  +'      							<div class="panel-body">'
//	  +'    									<div class="col-sm-6 border">'
//	  +'            								    <div class="panel-heading panel-info"><center><h4>Expected </h4></center></div>'
//	  +'												<h5> <center>'+lineralityCounter+'</center></h5>'
//	  +'               							 </div>'
//	  +'    									<div class="col-sm-6 border">'
//	  +'          								   <div class="panel-heading panel-info"><center><h4>Actual </h4></center></div>'
//	  +'											<h5><center>'+ExptlineralityCounter+'</center></h5>'
//	  +'           								 </div>'
//	   +'   							</div>'
//	  +'  				</div>' 
//	  +'          </div>'
	   +'</div>'
	   
	+'  </div>'// Row Close

//	
//+'<div class="container-fluid">'
//
//	  +'<div class="row">'
//	 
//	
//
//	  +'     <div class="col-sm-12">'
//	  +'     <div class="panel panel-success">'
//	  +'      <div class="panel-heading"><center><h4>RESULT ANALYSIS GRAPH</h4></center></div>'
//	  +'      <div class="panel-body" id="GraphPanel">'
//
//	  +'    </div>'
//	  +'    </div>'	
//	  +'    </div>'
//	+'     </div>'
////
////	  +'     <div class="col-sm-6">'
////	  +'     <div class="panel panel-success">'
////	  +'      <div class="panel-heading"><center><h4>MIMIC ANALYSIS GRAPH</h4></center></div>'
////	  +'      <div class="panel-body" id="GraphPanel1">'
////
////	  +'    </div>'
////	  +'    </div>'	
////	  +'    </div>'
////
////	+'  </div>'
//	//MIMIC 
//
//
//	+'    </div>'







$("#mainDiv").html(htm);
	 
	 
//	 Highcharts.chart('GraphPanel', {
//		    chart: {
//		        type: 'pie'
//		    },
//		    title: {
//		        text: 'Result Analysis',
//		        align: 'left'
//		    },
//		    subtitle: {
//		        text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
//		        align: 'left'
//		    },
//
//		    accessibility: {
//		        announceNewData: {
//		            enabled: true
//		        },
//		        point: {
//		            valueSuffix: '%'
//		        }
//		    },
//
//		    plotOptions: {
//		        series: {
//		            borderRadius: 5,
//		            dataLabels: {
//		                enabled: true,
//		                format: '{point.name}: {point.y:.1f}%'
//		            }
//		        }
//		    },
//
//		    tooltip: {
//		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
//		    },
//
//		    series: [
//		        {
//		            name: 'Browsers',
//		            colorByPoint: true,
//		            data: [
//		                {
//		                    name: 'Chrome',
//		                    y: 61.04,
//		                    drilldown: 'Chrome'
//		                },
//		                {
//		                    name: 'Safari',
//		                    y: 9.47,
//		                    drilldown: 'Safari'
//		                },
//		                {
//		                    name: 'Edge',
//		                    y: 9.32,
//		                    drilldown: 'Edge'
//		                },
//		                {
//		                    name: 'Firefox',
//		                    y: 8.15,
//		                    drilldown: 'Firefox'
//		                },
//		                {
//		                    name: 'Other',
//		                    y: 11.02,
//		                    drilldown: null
//		                }
//		            ]
//		        }
//		    ],
//		    drilldown: {
//		        series: [
//		            {
//		                name: 'Chrome',
//		                id: 'Chrome',
//		                data: [
//		                    [
//		                        'v97.0',
//		                        36.89
//		                    ],
//		                    [
//		                        'v96.0',
//		                        18.16
//		                    ],
//		                    [
//		                        'v95.0',
//		                        0.54
//		                    ],
//		                    [
//		                        'v94.0',
//		                        0.7
//		                    ],
//		                    [
//		                        'v93.0',
//		                        0.8
//		                    ],
//		                    [
//		                        'v92.0',
//		                        0.41
//		                    ],
//		                    [
//		                        'v91.0',
//		                        0.31
//		                    ],
//		                    [
//		                        'v90.0',
//		                        0.13
//		                    ],
//		                    [
//		                        'v89.0',
//		                        0.14
//		                    ],
//		                    [
//		                        'v88.0',
//		                        0.1
//		                    ],
//		                    [
//		                        'v87.0',
//		                        0.35
//		                    ],
//		                    [
//		                        'v86.0',
//		                        0.17
//		                    ],
//		                    [
//		                        'v85.0',
//		                        0.18
//		                    ],
//		                    [
//		                        'v84.0',
//		                        0.17
//		                    ],
//		                    [
//		                        'v83.0',
//		                        0.21
//		                    ],
//		                    [
//		                        'v81.0',
//		                        0.1
//		                    ],
//		                    [
//		                        'v80.0',
//		                        0.16
//		                    ],
//		                    [
//		                        'v79.0',
//		                        0.43
//		                    ],
//		                    [
//		                        'v78.0',
//		                        0.11
//		                    ],
//		                    [
//		                        'v76.0',
//		                        0.16
//		                    ],
//		                    [
//		                        'v75.0',
//		                        0.15
//		                    ],
//		                    [
//		                        'v72.0',
//		                        0.14
//		                    ],
//		                    [
//		                        'v70.0',
//		                        0.11
//		                    ],
//		                    [
//		                        'v69.0',
//		                        0.13
//		                    ],
//		                    [
//		                        'v56.0',
//		                        0.12
//		                    ],
//		                    [
//		                        'v49.0',
//		                        0.17
//		                    ]
//		                ]
//		            },
//		            {
//		                name: 'Safari',
//		                id: 'Safari',
//		                data: [
//		                    [
//		                        'v15.3',
//		                        0.1
//		                    ],
//		                    [
//		                        'v15.2',
//		                        2.01
//		                    ],
//		                    [
//		                        'v15.1',
//		                        2.29
//		                    ],
//		                    [
//		                        'v15.0',
//		                        0.49
//		                    ],
//		                    [
//		                        'v14.1',
//		                        2.48
//		                    ],
//		                    [
//		                        'v14.0',
//		                        0.64
//		                    ],
//		                    [
//		                        'v13.1',
//		                        1.17
//		                    ],
//		                    [
//		                        'v13.0',
//		                        0.13
//		                    ],
//		                    [
//		                        'v12.1',
//		                        0.16
//		                    ]
//		                ]
//		            },
//		            {
//		                name: 'Edge',
//		                id: 'Edge',
//		                data: [
//		                    [
//		                        'v97',
//		                        6.62
//		                    ],
//		                    [
//		                        'v96',
//		                        2.55
//		                    ],
//		                    [
//		                        'v95',
//		                        0.15
//		                    ]
//		                ]
//		            },
//		            {
//		                name: 'Firefox',
//		                id: 'Firefox',
//		                data: [
//		                    [
//		                        'v96.0',
//		                        4.17
//		                    ],
//		                    [
//		                        'v95.0',
//		                        3.33
//		                    ],
//		                    [
//		                        'v94.0',
//		                        0.11
//		                    ],
//		                    [
//		                        'v91.0',
//		                        0.23
//		                    ],
//		                    [
//		                        'v78.0',
//		                        0.16
//		                    ],
//		                    [
//		                        'v52.0',
//		                        0.15
//		                    ]
//		                ]
//		            }
//		        ]
//		    }
//		});
//
//	 
//	 Highcharts.chart('GraphPanel1', {
//		    chart: {
//		        type: 'pie'
//		    },
//		    title: {
//		        text: 'Mimic Result Analysis',
//		        align: 'left'
//		    },
//		    subtitle: {
//		        text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
//		        align: 'left'
//		    },
//
//		    accessibility: {
//		        announceNewData: {
//		            enabled: true
//		        },
//		        point: {
//		            valueSuffix: '%'
//		        }
//		    },
//
//		    plotOptions: {
//		        series: {
//		            borderRadius: 5,
//		            dataLabels: {
//		                enabled: true,
//		                format: '{point.name}: {point.y:.1f}%'
//		            }
//		        }
//		    },
//
//		    tooltip: {
//		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
//		    },
//
//		    series: [
//		        {
//		            name: 'Browsers',
//		            colorByPoint: true,
//		            data: [
//		                {
//		                    name: 'Chrome',
//		                    y: 61.04,
//		                    drilldown: 'Chrome'
//		                },
//		                {
//		                    name: 'Safari',
//		                    y: 9.47,
//		                    drilldown: 'Safari'
//		                },
//		                {
//		                    name: 'Edge',
//		                    y: 9.32,
//		                    drilldown: 'Edge'
//		                },
//		                {
//		                    name: 'Firefox',
//		                    y: 8.15,
//		                    drilldown: 'Firefox'
//		                },
//		                {
//		                    name: 'Other',
//		                    y: 11.02,
//		                    drilldown: null
//		                }
//		            ]
//		        }
//		    ],
//		    drilldown: {
//		        series: [
//		            {
//		                name: 'Chrome',
//		                id: 'Chrome',
//		                data: [
//		                    [
//		                        'v97.0',
//		                        36.89
//		                    ],
//		                    [
//		                        'v96.0',
//		                        18.16
//		                    ],
//		                    [
//		                        'v95.0',
//		                        0.54
//		                    ],
//		                    [
//		                        'v94.0',
//		                        0.7
//		                    ],
//		                    [
//		                        'v93.0',
//		                        0.8
//		                    ],
//		                    [
//		                        'v92.0',
//		                        0.41
//		                    ],
//		                    [
//		                        'v91.0',
//		                        0.31
//		                    ],
//		                    [
//		                        'v90.0',
//		                        0.13
//		                    ],
//		                    [
//		                        'v89.0',
//		                        0.14
//		                    ],
//		                    [
//		                        'v88.0',
//		                        0.1
//		                    ],
//		                    [
//		                        'v87.0',
//		                        0.35
//		                    ],
//		                    [
//		                        'v86.0',
//		                        0.17
//		                    ],
//		                    [
//		                        'v85.0',
//		                        0.18
//		                    ],
//		                    [
//		                        'v84.0',
//		                        0.17
//		                    ],
//		                    [
//		                        'v83.0',
//		                        0.21
//		                    ],
//		                    [
//		                        'v81.0',
//		                        0.1
//		                    ],
//		                    [
//		                        'v80.0',
//		                        0.16
//		                    ],
//		                    [
//		                        'v79.0',
//		                        0.43
//		                    ],
//		                    [
//		                        'v78.0',
//		                        0.11
//		                    ],
//		                    [
//		                        'v76.0',
//		                        0.16
//		                    ],
//		                    [
//		                        'v75.0',
//		                        0.15
//		                    ],
//		                    [
//		                        'v72.0',
//		                        0.14
//		                    ],
//		                    [
//		                        'v70.0',
//		                        0.11
//		                    ],
//		                    [
//		                        'v69.0',
//		                        0.13
//		                    ],
//		                    [
//		                        'v56.0',
//		                        0.12
//		                    ],
//		                    [
//		                        'v49.0',
//		                        0.17
//		                    ]
//		                ]
//		            },
//		            {
//		                name: 'Safari',
//		                id: 'Safari',
//		                data: [
//		                    [
//		                        'v15.3',
//		                        0.1
//		                    ],
//		                    [
//		                        'v15.2',
//		                        2.01
//		                    ],
//		                    [
//		                        'v15.1',
//		                        2.29
//		                    ],
//		                    [
//		                        'v15.0',
//		                        0.49
//		                    ],
//		                    [
//		                        'v14.1',
//		                        2.48
//		                    ],
//		                    [
//		                        'v14.0',
//		                        0.64
//		                    ],
//		                    [
//		                        'v13.1',
//		                        1.17
//		                    ],
//		                    [
//		                        'v13.0',
//		                        0.13
//		                    ],
//		                    [
//		                        'v12.1',
//		                        0.16
//		                    ]
//		                ]
//		            },
//		            {
//		                name: 'Edge',
//		                id: 'Edge',
//		                data: [
//		                    [
//		                        'v97',
//		                        6.62
//		                    ],
//		                    [
//		                        'v96',
//		                        2.55
//		                    ],
//		                    [
//		                        'v95',
//		                        0.15
//		                    ]
//		                ]
//		            },
//		            {
//		                name: 'Firefox',
//		                id: 'Firefox',
//		                data: [
//		                    [
//		                        'v96.0',
//		                        4.17
//		                    ],
//		                    [
//		                        'v95.0',
//		                        3.33
//		                    ],
//		                    [
//		                        'v94.0',
//		                        0.11
//		                    ],
//		                    [
//		                        'v91.0',
//		                        0.23
//		                    ],
//		                    [
//		                        'v78.0',
//		                        0.16
//		                    ],
//		                    [
//		                        'v52.0',
//		                        0.15
//		                    ]
//		                ]
//		            }
//		        ]
//		    }
//		});

	 
	 
	 
	 
	 
}