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
var look = function(){
  var n = iterations;
	while(n>0) {
    var string = String.concat(dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom(),' ',dict.getRandom());
		
		var sha1 = SHA1(string);
		var b = sha1.to_binary();
		var h = baseline.ham_value(b);
		
		if (!lowest || (lowest.ham && lowest.ham > h)){
			lowest = {ham : h, bin:b, 'string' : string, hash:sha1};
      new Request({url : '/process', data:{request:JSON.encode(lowest)}}).send(); //todo: change the address in this line
			$('results').appendText('{ham}, {string}, {hash}, {bin}\n'.substitute(lowest));
		}

		++count;
		--n;
	};
	$look = look.delay(1);
}

var update = function(){
  // time++; document.title = "Rate = " + (count / time);
  document.title = lowest.ham + ' out of '+ count + ' permutations';
	$update = update.delay(1000);
}

window.addEvent('domready', function(){look();update();});
