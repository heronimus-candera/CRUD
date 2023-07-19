const express = require('express')
const jwt = require('jsonwebtoken')

const auth = express.Router()
const db = require('../db')
const kunci = 'qwertyuiop12345'

auth.post('/login', async(req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        res.status(200).send({
            'pesan': 'Username dan Password wajib diisi'
        })
    } else {
        const [rows] = await db.promise().execute('SELECT * FROM user WHERE username=? AND password=SHA1(?)', [username, password])
        if(rows.length > 0) {
            const token = jwt.sign({
                'id': rows[0]['id']
            }, kunci, {
                expiresIn: '1d',
                algorithm: 'HS512'
            })
            res.status(200).send({
                'pesan': 'Login berhasil',
                'token': token
            })
        } else {
            res.status(200).send({
                'pesan': 'Login gagal'
            })
        }
    }
})

auth.post('/register', async(req, res) => {
    const { nama, username, password} = req.body

    if(!nama || !username || !password) {
        res.status(200).send({
            'pesan': 'Nama, Username dan Password wajib diisi'
        })
    } else {
        const [rows] = await db.promise().execute('SELECT * FROM user WHERE username=?', [username])
        if(rows.length > 0) {
            res.status(200).send({
                'pesan': 'Username sudah terdaftar'
            })
        } else {
            const [rows] = await db.promise().execute('INSERT INTO user(username, password, nama) VALUES(?, SHA1(?), ?)', [username, password, nama])

            if(rows.affectedRows > 0) {
                res.status(200).send({
                    'pesan': 'Register User berhasil'
                })
            } else {
                res.status(200).send({
                    'pesan': 'Register User gagal'
                })
            }
        }
    }
})

module.exports = auth