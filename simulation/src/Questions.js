var ansCount = 0;
function Questions(){
			var flag = false;
			var myRadio = null;

			$("#main-div-conf").html('');
			
			 $("#centerText2").html('BASIC KNOWLEDGE');
			var questions = '';
			questions += ''
				+ '<div id = "questionDiv">'

			for (var i = 0; i < QuestionsJSON.data["SEC"].length; i++) {

				for (var j = 0; j < QuestionsJSON.data["SEC"][0].QUES.length; j++) {

					questions += '<div class="col-md-12">'
						+ '<br><span class="queno">Question No : ' + (i + 1) + '</span>'
						+ '<br><div class="queTitle">'

						+ QuestionsJSON.data["SEC"][i].QUES[j].QC
						+ '</div>'

					for (var k = 0; k < QuestionsJSON.data["SEC"][i].QUES[j].ANS.length; k++) {

						questions += '<div>'
							+ '<div class="ansTitle col-md-6">'

							+ "<input class='radioType' name='radio-" + i + "' id='" + i + "' ANSID='" + QuestionsJSON.data["SEC"][i].QUES[j].ANS[k].ANSID + "' type='radio'"
							+ "' value='"
							+ QuestionsJSON.data["SEC"][i].QUES[j].ANS[k].content
							+ "' >"
							+ '<p style="margin: -20px 0 8px 29px;">'
							+ QuestionsJSON.data["SEC"][i].QUES[j].ANS[k].content
							+ '</p>'

							+ '</div>'
							+ '</div>'
					}
					questions += '</div>'
				}
			}

			questions += '<div class="buttonDiv">'
				+ '<button id="testSubmit" data-toggle="modal" data-target="#myModal">Submit Test</button>'
				+ '</div>'
				+ ' <div class="modal fade" id="myModal">'
				+ '<div class="modal-dialog">'
				+ '  <div class="modal-content">'
			      
				+ '    <!-- Modal Header -->'
				+ '    <div class="modal-header bg-info">'
				+ '       <h4 class="modal-title">Message box</h4>'
				+ '       <button type="button" class="close" data-dismiss="modal">&times;</button>'
				+ '     </div>'
			        
				+ '     <!-- Modal body -->'
				+ '     <div class="modal-body" id="QuestionModel">'
				
				+ '     </div>'
			        
				+ '     <!-- Modal footer -->'
				+ '     <div class="modal-footer">'
				+ '       <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
				+ '     </div>'
			        
				+ '  </div>'
				+ '</div>'
				+ ' </div>'
				+ '</div>';

			$("#canvas-div").html(questions);

			$('#testSubmit').on('click', function() {		

					var arr = [];
					
					for (var i = 0; i < QuestionsJSON.data["SEC"].length; i++) {

						var qid = $('input[name=radio-' + i + ']').attr(
							'id');

						var ansId = $('input[name=radio-' + i + ']:checked').attr(
							'ANSID');

						myRadio = $(
							'input[name=radio-' + i + ']:checked')
							.val();

						if (myRadio == null) {
							flag = flag && false;
//							$("#QuestionModel").html("Please attempt all the questions");
							str='<img src="images/cancel.png" class=" img-fluid " />'
							    +'<b id="errorText" style="color:red;" >Please attempt all the questions </b> '
						$("#QuestionModel").html(str);
//							alert('Please attempt all the questions');

							break;
						}
						arr.push({
							"QID": qid,
							"ANS": myRadio,
							"ANSId": ansId
						});
					}

					

					if (myRadio != null) {
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].ANSId == "true") {
								ansCount++;
							}
						}
						
						
//						alert("Test Submitted Successfully <br/>Correct Answers Are : " + ansCount);
						mainPage();
						 str='<img src="images/checked.png" class=" img-fluid " />'
							    +'<b id="errorText" style="color:green;" >Test Submitted Successfully .Correct Answers Are : ' + ansCount+'</b> '
						$("#errorModel").html(str);
					}
			});
}
	