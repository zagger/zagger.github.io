
$(function(){
	appToSubmmit(appButton('game start', mainLoop));
});

function mainLoop() {
	start();
}

function start() {
	reset(['#count', '#input', '#submmit', '#logs']);
	appToCount(appRound(1));
	appToInput(appText);
	appToSubmmit(appButton('submmit', {'name': 'submmit'}));
	//htmlBefore(appGG({'vaid': true, 'great':1, 'good': 2}));
}

var submmit = retSubmmit();

function retSubmmit() {
	var randNum = rand();//encapsulation
	var count = 0;
	var maxCount = 10;

	function resetCount() {
		count = 0;
	}

	return function () {
		var playerNum = textVal('#text1');

		if(isViolate(playerNum)) {
			alert('wrong number!!');
			return;
		}

		count += 1;


		htmlToCount(appRound(count+1));
		// resJSON = returnJSON("https://jaxrs-sample.herokuapp.com/rest/json", genReqJSON(playerNum, randNum));
		resJSON = returnJSON("https://secure-bastion-1626.herokuapp.com/rest/json", genReqJSON(playerNum, randNum));
		// resJSON = {'great': 1, 'good': 1, 'isSame': false};
		console.log(resJSON);

		if(resJSON.valid == 'false') {
			htmlToCount(appMessage(resJSON));
			count = count - 1;
			return;
		}

		if(resJSON.isSame == 'true') {
			htmlToCount(appMessage(resJSON));
			htmlToSubmmit(appButton('continue', start));
			resetCount();
			return;
		}

		appToLogs(appRound(count));
		$("#logs").append( "<p>" + playerNum + "</p>" );
		appToLogs(appGG(resJSON));
		console.log(resJSON);

		if(count+1 > maxCount) {
			htmlToCount(appMessage({'message': 'ゲーム終了'}));
			htmlToSubmmit(appButton('continue', start));
			resetCount();
		}
	}
}

function reset(idArray) {
	idArray.forEach(function(id){
		$(id).html("");
	});
}

function rand() {
	return "123";
}

function genReqJSON(pn, rn) {
	return {
		'playerNum': pn,
		'randNum': rn
	}
}

function htmlToSubmmit(appX) {
	resetBeforeApp('#submmit', appX);
}

function htmlToCount(appX) {
	resetBeforeApp('#count', appX);
}

function htmlToInput(appX) {
	resetBeforeApp('#input', appX);
}

function resetBeforeApp(id, appX) {
	$(id).html("");
	appX(id);
}

function appToCount(appX) {
	appX('#count');
}

function appToInput(appX) {
	appX('#input');
}

function appToSubmmit(appX) {
	appX('#submmit');
}

function appToLogs(appX) {
	appX('#logs');
}

function appText(id) {
	var textHTML = templateHtml('#text');
	$(id).append( textHTML() );
}

function appButton(value, func) {
	return function(id) {
		var buttonHTML = templateHtml('#button');
		$(id).append( buttonHTML({'value': value, 'func': func.name}) );
	}
}

function templateHtml(id) {
	return _.template($(id).html());
}

function appRound(n) {
	return function(id) {
		[n, '回目', '<br>']
			.forEach(function(d){
				$(id).append(d);
			});
	}
}

function appMessage(json) {
	return function(id) {
		$(id).append(json.message);
	}
}

function appGG(json) {
	return function(id) {
		[
			'great: ', json.great,
			'<br>',
			'good: ', json.good,
			'<br>'
		]
		.forEach(function(v){
			$(id).append(v);
		});
	}
}

function get(json) {
	// return function(func) {
	// 	func(json);
	// }
	//$('#view').append( buttonHTML({'value': 'submmit', 'func': 'submmit'}) );
	console.log(json.message);
}

function returnJSON(url, reqJSON) {
	$.ajaxSetup({async: false});
	return $.getJSON(url, reqJSON).responseJSON;
}

function textVal(id) {
	return $(id).val();
}

function isViolate(numStr) {
	if(numStr.length == 3 && isPureNum(numStr))  {
		return false;
	}
	return true;
}

function isBetween(a, b) {
	return function(num) {
		return a <= num && num <= b;
	}
}

function isPureNum(numStr) {
	var bool = true;
	[].forEach.call(numStr, function(c){
		if(isNaN(c)) {//Not a Number
			bool = false;
		}
	});
	return bool;
}

