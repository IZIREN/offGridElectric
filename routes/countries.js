const express        = require('express');
const app            = express();
const router         = express.Router();
const dbUrl          = require('./../db')
var MongoClient      = require('mongodb').MongoClient;

MongoClient.connect(dbUrl, function(err, db) {
    if (err) throw err;
    router.get('/', (req, res) => {
        db.collection('countrydata').find({"conversionrate":{$ne:null} },
         {"_id":1, "countrycode":1,"countryname":1,"currencycode":1,"populationdensity":1, "conversionrate":1 })
        .sort({"conversionrate":1,"poulationdensity":-1}).toArray(function(error, documents) {
            if (error) throw error;
            
            res.json(documents);
        });

            
    });
    router.get('/countries', (req, res) => {
            
        db.collection('countrydata').find({"conversionrate":{$ne:null} },
         {"_id":1, "countrycode":1,"countryname":1,"currencycode":1,"populationdensity":1, "conversionrate":1 })
        .sort({"conversionrate":1,"poulationdensity":-1}).toArray(function(error, documents) {
            if (error) throw error;
            
            res.json(documents);
        });
    
            
    });
});
module.exports=router;

























// const express = require('express');

// const router  = express.Router();
// var       db  = require('./../db');


// router.get('/', (request, response) => {
//     let responseData = {
//         success: false,
//         data: {},
//         errors: []
//     };

//     var documents = db.collection('countrydata').find({});
//         if(documents.length > 0) {
//             responseData.data = documents;
//             responseData.success = true;
//         }

//         response.json(responseData);
// });




// router.get('/countrycode', (req, res, next)=>{
//     res.status(200).json({
//         message:'this works for the countrycode route handlers'
//     });

// });


// router.post('/test', (req, res) => {
//     const note = { text: req.body.body, title: req.body.title };
//     db.collection('notes').insert(note, (err, result) => {
//         if (err) { 
//           res.send({ 'error': 'An error has occurred' }); 
//         } else {
//           res.send(result.ops[0]);
//         }
//     });
// }); 
// module.exports=router;