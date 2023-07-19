const express = require('express')
const menu = express.Router()

const db = require('../db')
const { isAllowed } = require('../middleware')

menu.get('/:kode?', isAllowed, async(req, res) => {
    const { kode } = req.params

    let where = ''
    if(kode) {
        where = `WHERE kode=${kode}`
    }

    const [rows] = await db.promise().execute(`SELECT * FROM menu ${where}`)

    res.status(200).send({
        'pesan': 'Data Menu',
        'data': rows
    })
})

menu.post('/', isAllowed, async(req, res) => {
    const { kode, nama, kategori, harga } = req.body
    const validasi = []
    if(!kode) {
        validasi.push('Kode harus diisi')
    }
    if(!nama) {
        validasi.push('Nama wajib diisi')
    }
    if(!kategori) {
        validasi.push('Kategori wajib diisi')
    }
    if(!harga) {
        validasi.push('Harga wajib diisi')
    }

    if(validasi.length > 0) {
        res.status(200).send({
            'pesan': 'Validasi Input',
            'data': validasi.join(',')
        })
    } else {
        const [rows] = await db.promise().execute('SELECT * FROM menu WHERE kodemenu=? OR namamenu=?', [kode, nama])

        if(rows.length > 0) {
            res.status(200).send({
                'pesan': `Menu dengan kode: ${kode} atau nama: ${nama} sudah ada`
            })
        } else {
            const [rows] = await db.promise().execute(`INSERT INTO menu VALUES(?, ?, ?, ?, ?)`, [kode, nama, kategori, harga, req.id_user])
        
            if(rows.affectedRows > 0) {
                res.status(200).send({
                    'pesan': 'Menu berhasil disimpan'
                })
            } else {
                res.status(200).send({
                    'pesan': 'Menu gagal disimpan'
                })
            }
        }
    }
})

menu.put('/:kode', isAllowed, async(req, res) => {
    const { kode } = req.params
    const { nama, kategori, harga } = req.body
    const validasi = []
    
    if(!kode) {
        validasi.push('Parameter Kode diperlukan')
    }
    if(!nama) {
        validasi.push('Nama wajib diisi')
    }
    if(!kategori) {
        validasi.push('Kategori wajib diisi')
    }
    if(!harga) {
        validasi.push('Harga wajib diisi')
    }

    if(validasi.length > 0) {
        res.status(200).send({
            'pesan': 'Validasi Input',
            'data': validasi.join(',')
        })
    } else {
        const [rows] = await db.promise().execute(`UPDATE menu SET namamenu=?, kategori=?, harga=?, id_user=? WHERE kodemenu=?`, [nama, kategori, harga, req.id_user, kode])
    
        if(rows.affectedRows > 0) {
            res.status(200).send({
                'pesan': 'Menu berhasil diupdate'
            })
        } else {
            res.status(200).send({
                'pesan': 'Menu gagal diupdate'
            })
        }
    }
})

menu.delete('/:kode', isAllowed, async(req, res) => {
    const { kode } = req.params
    const validasi = []
    
    if(!kode) {
        validasi.push('Parameter Kode diperlukan')
    }

    if(validasi.length > 0) {
        res.status(200).send({
            'pesan': 'Validasi Input',
            'data': validasi.join(',')
        })
    } else {
        const [rows] = await db.promise().execute(`DELETE FROM menu WHERE kodemenu=?`, [kode])
    
        if(rows.affectedRows > 0) {
            res.status(200).send({
                'pesan': 'Menu berhasil dihapus'
            })
        } else {
            res.status(200).send({
                'pesan': 'Menu gagal dihapus'
            })
        }
    }
})

module.exports = menu