const express = require('express')
const router = express.Router()

//import database 
const koneksi = require('../config/database')

//insert data dan validasi
const { body, validationResult } = require('express-validator')

//membaca data
router.get('/', function(req, res) {
    koneksi.query('SELECT * FROM posts ORDER BY id desc', function(error, rows) {
        if (error) {
            return res.status(500).json({
                status: false,
                message: 'database ngga nyambung',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'menampilkan data table posts',
                data: rows
            })
        }
    })
})


//insert data
router.post('/store', [
        body('judullagu').notEmpty(),
        body('penyanyi').notEmpty(),
        body('pencipta').notEmpty(),
        body('jenismusic').notEmpty(),

    ], (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(442).json({ erorrs: array() })

        }

        //mendefinisikan fromData
        let fromData = {
            judullagu: req.body.judullagu,
            penyanyi: req.body.penyanyi,
            pencipta: req.body.pencipta,
            jenismusic: req.body.jenismusic,

        }

        //masukan data / query
        koneksi.query('INSERT INTO posts SET ?', fromData,
            function(err, rows) {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        message: 'server mu erorr',
                    })
                } else {
                    return res.status(201).json({
                        status: true,
                        message: 'Berhasil input data',
                        data: rows[0]
                    })
                }
            }
        )
    })
    //detail 
router.get('/:id', function(req, res) {
    let.id = req.params.id

    koneksi.query(`SELECT * FROM post WHERE ID=%{id}`,
        function(error, rows) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: 'server error'
                })


            }

            //pencarian post
            if (rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data tidak ada'

                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'menampilkan data posts',
                    data: rows[0],
                })
            }
        }


    )
})

// Update 
router.patch('/update/:id', [
    //validasi 
    body('judullagu').notEmpty(),
    body('penyanyi').notEmpty(),
    body('pencipta').notEmpty(),
    body('jenismusic').notEmpty(),
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(442).json({
            errors: errors.array()
        })
    }

    // id
    let id = req.params.id

    //data post
    let formData = {
        judullagu: req.body.judullagu,
        penyanyi: req.body.penyanyi,
        pencipta: req.body.pencipta,
        jenismusic: req.body.jenismusic,
    }

    // update query
    koneksi.query(`UPDATE post set? WHERE id = ${id}`,
        fromData,
        function(error, rows) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: 'server error',
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'berhasil update data'
                })
            }
        }

    )
})

//delete
router.delete('/delete/(:id)',
    function(req, res) {
        let id = req.params.id

        koneksi.query(`DELETE FROM posts WHERE id = ${id}`,
            function(error, rows) {
                if (error) {
                    return res.status(500).json({
                        status: false,
                        message: 'server error'
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'data sudah di hapus'
                    })
                }
            }
        )
    })

module.exports = router