const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const mysql = new (require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require('joi');
const bcrypt = require('bcrypt')


class _user {

    async registerUser(data) {

        // code to add user or login user

        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
        }).options({
            abortEarly: false
        })


        const validation = schema.validate(data)
        if (validation.error) {
            const errorDetails = validation.error.details.map((detail) => {
                return detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(',')
            }
        }


        const Password = data.password;
        const rounds = 10;

        try {
            const hash = await new Promise((resolve, reject) => {
                bcrypt.hash(Password, rounds, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });

            const sql = {
                query: `INSERT INTO users (name,email,password) VALUES (?,?,?)`,
                params: [data.name, data.email, hash]
            };

            const result = await mysql.query(sql.query, sql.params);

            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('registrasi user error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }



    loginUser() {
        //code to login User
    }
}


module.exports = new _user()