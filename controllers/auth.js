const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email =?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already taken!'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match!'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('register', {
                    message: 'User registered!'
                })
            }
        })
    });
}
exports.login = (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    db.query('SELECT email FROM users WHERE email =?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already taken!'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match!'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('register', {
                    message: 'User registered!'
                })
            }
        })
    });
}