Number.prototype.comma_ize = function() {
  var tmp = this;
	tmp += '';
	x = tmp.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

String.implement({
	to_binary : function(){
    var r = new Array();
    for (var i = 0, n = this.length; i < n; ++i) {
			var b = parseInt(this[i], 16).toString(2);
      r.push('0'.repeat(4 - b.length) + b);
		};
    return r.join("");
	},
	ham_value : function(opposing){
		var t = 0;
    for (var i = 0, n = this.length; i < n; ++i) {
		  if (this[i] != opposing[i]) {
		    ++t;
		  };
		};
		return t;
	},
	repeat : function(x){
		var r = '';
		while(x>0) {
      r += this;
      --x;
		};
		return r;
	}
});

// var time = 0;
var lowest = false;
var $look, $update;
var baseline = '6cac827bae250971a8b1fb6e2a96676f7a077b60'.to_binary();
var count = 0;
var iterations = (Browser.Platform.ipod ? 200 : 1000);
var sinceLast = 0;
var emailAddress;
var look = function(){
  var n = iterations;
	while(n>0) {
    var string = String.concat(dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom());
		
		var sha1 = SHA1(string);
		var b = sha1.to_binary();
		var h = baseline.ham_value(b);
		
		if (!lowest || (lowest.ham && lowest.ham > h)){
			lowest = {ham : h, bin:b, 'string' : string, hash:sha1, email:emailAddress};
      		new Request({url : '/process', data:{request:lowest}}).send(); //todo: change the address in this line
      		// $('results').appendText('{ham}, {string}, {hash}, {bin}\n'.substitute(lowest));
			$('ham').set('text', h);
		}
		
		++sinceLast;
		++count;
		--n;
	};
	$look = look.delay(1);
}

var update = function(){
	// time++; document.title = "Rate = " + (count / time);
	document.title = 'Rice :: ' + lowest.ham + ' : '+ count.comma_ize();
	$('count').set('text', count.comma_ize());
	if (sinceLast > 100000){
		new Request({url : '/user', data:{count:sinceLast,email:emailAddress}}).send(); //todo: change the address in this line
  		sinceLast = 0;
	}
	$update = update.delay(1000);
}

function startSearch(){
	look();
	update();
}

function stopSearch(){
	$clear($look);
	$clear($update);
	$look = false;
	$update = false;
}

window.addEvent('domready', function(){
	
	$('startstop').addEvent('click', function(event){
		event.stop();
		if ($look || $update){
			stopSearch();
			$('startstop').set('text','Resume');
		}else{
			emailAddress = $('email').get('value');
			$$('h2, #email, #info').addClass('hide');
			$$('.result-text').removeClass('hide');
			$('startstop').set('text','Pause');
			if ($('count').get('text') == '')
				$('count').set('text','0')
			if ($('ham').get('text') == '')
				$('ham').set('text','n/a')
			startSearch.delay(10); //so that everything is visibly ready first
		}
	});
});
