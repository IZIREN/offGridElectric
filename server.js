var MongoClient         = require('mongodb').MongoClient;
const express           = require('express');
const dbUrl             = require('./db')
const app               = express();
const cors              = require('cors');
const port              = 8001;
const countriesRoutes   = require('./routes/countries')
const axios             = require('axios');

//Bind port to server and listen on port 8001

app.listen(port, function(){
  console.log("Server is listening on port " + port);
});


//Get API data and update every hour

  
MongoClient.connect(dbUrl, function(err, db) {

  setInterval(function(){ //setInterval to One Hour
    axios.all([
    axios.get('https://restcountries.eu/rest/v2/all'),
    axios.get('https://api.fixer.io/latest?base=USD')
    ]).then(axios.spread((response1, response2) => {
      var lenght = Object.keys(response1.data).length;//Response lenght
      for (var i=0; i<3; i++){  
      const country_code        = (response1.data[i].alpha2Code);
      const country_name        = (response1.data[i].name);
      const population_density  = (response1.data[i].population);
      const currency_code       = (response1.data[i].currencies[0].code);
      const conversion_rate_usd = (response2.data.rates[currency_code]);
      var dbobject={countrycode:country_code,
        countryname:country_name,
        populationdensity:population_density,
        currencycode:currency_code,
        conversionrate:conversion_rate_usd};
                
      db.collection('countrydata').updateOne(
        { countrycode: country_code },
        { $set: { countrycode:country_code,
          countryname:country_name,
          populationdensity:population_density,
          currencycode:currency_code,
          conversionrate:conversion_rate_usd}},
          {upsert: true })
      .then(function(result) {
      
      });            

      };
      console.log('The document was updated successfully')
      console.log('*****Waiting for the next update in One Hour.*****');//.catch(error => {
        
    })); 
  }, 60*60*1000);//
});
//});  
  
  
app.use('/', countriesRoutes);
app.use('/countries', countriesRoutes);
  
module.exports=app;

  

  