var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js')



// router.get('/', function (req, res) {
//     console.log('task get was hit');
//     pool.connect(function (errorConnectingToDatabase, client, done) {
//         if (errorConnectingToDatabase) {
//             console.log('Error connecting to DataBase', errorConnectingToDatabase);
//             res.sendStatus(500)
//         } else {
//             // SELECT * FROM task;         
//             client.query('SELECT * FROM task', function (errorMakingQuery, result) {
//                 done();
//                 if (errorMakingQuery) {
//                     console.log('Error making database query', errorMakingQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.send(result.rows);
//                 }
//             });

//         }
//     });
// });




router.post('/', function (req, res) {
    console.log('add task post hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to db:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //  INSERT INTO task (tasks_to_add) VALUES ('clean kitchen');
            client.query('INSERT INTO task (tasks_to_add) VALUES ($1);',
                [req.body.task], function (errorMakingQuery, result) {
                    done();
                    console.log(req.body.task)

                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
}); // end of router post


module.exports= router; 