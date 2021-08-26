const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mortgage = require("./mortJs.js");
const https = require('https');



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));



//quotes API key:  QVg8O5A2lFJtePWMec_vQQeF
app.get("/", function(req,res){
  //takes a random quote from my private collection on quotes.rest
  var url = "https://quotes.rest/quote/search?private=true&limit=1&api_key=QVg8O5A2lFJtePWMec_vQQeF"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const quoteData = JSON.parse(data);
      const quote = quoteData.contents.quotes[0].quote;
      const author = quoteData.contents.quotes[0].author;
      res.render("mortgagecalc", {quote: quote, author: author});
    })


  });

});

app.post("/results", function(req, res){
  const rate = req.body.rate;
  const price = req.body.homePrice;
  const downP = req.body.downPayment;
  const principal = price - downP;
  const monthlyPayment = mortgage.monthlyPay(rate, price, downP);
  const finalmonthly = mortgage.formatted(monthlyPayment);
  const total = Number(monthlyPayment)*360;
  const totalpayment = mortgage.formatted(total.toFixed(2));
  const interest = mortgage.formatted((total-principal).toFixed(2));
  res.render("mortgage-results", {principal: principal, total: total, finalmonthly: finalmonthly, totalpayment: totalpayment, interest: interest});

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("server started successfully");
});
