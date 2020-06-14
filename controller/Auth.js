const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { database } = require('../config/db');
const keys = require('../config/jwt');


module.exports.login = async function (req, res) {

    database.query('SELECT * FROM `users` WHERE `email` LIKE ?', req.body.email, function (error, results, fields) {
        if (error) {
            console.log('Err: ' + error);
        }else{
            if (results.length > 0) {
                // Checked password, user is detected
                const passwordResult = bcrypt.compareSync(req.body.password, results[0].password);

                if(passwordResult) {
                    // Generate Token
                    const token = jwt.sign({
                        email: results[0].email,
                        userId: results[0].id
                    }, keys.jwt, {
                        expiresIn: 60 * 60 // Время жизни токена
                    });

                    res.status(200).json({
                        status: true,
                        token: `Bearer ${token}`
                    })
                } else {
                    res.status(401).json({
                        status: false,
                        message: 'Пароли не совпадают'
                    })
                }

            } else {
                // No user
                res.status(404).json({
                    message: 'Пользователь с таким email не найден'
                })
            }
        }
    });

};

module.exports.register =  function (req, res) {


    database.query('SELECT * FROM `users` WHERE `email` LIKE ?', req.body.email, function (error, results, fields) {
        if (error) {
            console.log('Err: ' + error);
        }else{
            if (results.length > 0) {
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
        }
    })

};

