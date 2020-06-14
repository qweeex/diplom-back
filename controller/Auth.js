const bcrypt = require('bcryptjs');
const { database } = require('../config/db');
const { getUser } = require('../models/User');


module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
};

module.exports.register =  function (req, res) {

    const candidate = getUser(req.body.email);
    console.log(candidate);
    return;
    if (candidate) {
        // User is detected, return error
        res.status(409).json({
            status: false,
            message: 'Такой email уже занят'
        })
    } else {
        // Create user

        // Генерируем соль
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        // Объект пользователя
        const users = {
            "email": req.body.email,
            "password": bcrypt.hashSync(password, salt) // Шифруем пароль
        };

        // SQL Запрос на создание пользователя
        database.query('INSERT INTO users SET ?', users, function (error, results, fields) {
            if (error) {
                res.status(401).json({
                    status: false,
                    message:'Ошибка создания пользователя'
                })
            }else{
                res.status(201).json({
                    status: true,
                    data: results,
                    message:'Пользователь создан '
                });
                console.log(`User ${users.email} is created`);
            }
        });
    }

};

