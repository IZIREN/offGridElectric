var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var countriesUrl = "https://restcountries.eu/rest/v2/all";
var currenciesUrl="https://api.fixer.io/latest?base=USD";
var util = require("util");

describe('returns countries object array', function() {
    it('returns countries object array', function(done) {
        request.get({ url: countriesUrl},
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);

                    expect(response.statusCode).to.equal(200);
                    //console.log(body);
                done();
            });
    });
});

describe('returns currency object array', function() {
    it('returns currency object array', function(done) {
        request.get({ url: currenciesUrl},
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);

                    expect(response.statusCode).to.equal(200);
                    //console.log(body);
                done();
            });
    });
});

describe('GET /countries', function() {
    it('returns a list of countries', function(done) {
        request.get('/countries')
            .expect(200)
            .end(function(error, response) {
                //expect(response.body).to.have.lengthOf(250);
                done(error);
            });
    });
});
