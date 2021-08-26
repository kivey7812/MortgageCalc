
const monthlyPay = function(rate, price, downP){
  const Loan = Math.round(price - downP);
  if (Loan < 0){
    return "Woops! Downpayment cannot be more than the price of the home. Try again."
  }else{
    const c = rate/1200;
    const n = 360;
    const monthlyPayment = Loan*((c*((1+c)**n))/(((1+c)**n)-1));
    const monthlyPaymentRound = monthlyPayment.toFixed(2);
    return monthlyPaymentRound;
  }
}
//credit to https://css-tricks.com/snippets/javascript/comma-values-in-numbers/
const formatted = function(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

exports.monthlyPay = monthlyPay;
exports.formatted = formatted;
