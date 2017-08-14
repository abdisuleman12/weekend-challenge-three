var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js')



router.get('/', function (req, res) {
    console.log('task get was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to DataBase', errorConnectingToDatabase);
            res.sendStatus(500)
        } else {
            // SELECT * FROM task;         
            client.query('SELECT * FROM task;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                    // sending over an array of objects [{0},{1},{2}] response[0].tasks_to_add
                }
            });

        }
    });
});

router.post('/', function (req, res) {
    console.log('add task post hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to db:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //  INSERT INTO task (tasks_to_add) VALUES ('clean kitchen', false);
            client.query('INSERT INTO task (tasks_to_add, complete) VALUES ($1, false);',
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

router.put('/:id', function (req, res) {
    var completeId = req.params.id;
    pool.connect(function (errorConnectingToDatabse, client, done) {
        if (errorConnectingToDatabse) {
            console.log('error connecting to database', errorConnectingToDatabse);
            res.sendStatus(500);
        } else {
            //query like this UPDATE task SET complete = TRUE WHERE id=3;
            client.query('UPDATE task SET complete = TRUE WHERE id=$1;', [completeId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }

    })
}); // put route for updating complete to true


router.delete('/:id', function (req, res) {
    var deleteId = req.params.id;
    pool.connect(function (errorConnectingToDatabse, client, done) {
        if (errorConnectingToDatabse) {
            console.log('error connecting to database', errorConnectingToDatabse);
            res.sendStatus(500);
        } else {
            //query like this DELETE FROM task WHERE id=10;
            client.query('DELETE FROM task WHERE id=$1;', [deleteId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }

    })
}); // delete route for db 

module.exports= router; 