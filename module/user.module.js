const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const mysql = new (require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require('joi');


class _user {

    registerUser(data) {
        //code to add user or login user 

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

        //making query for insert data
        const sql = {
            query: `INSERT INTO users (name,email,password) VALUES (?,?,?)`,
            params: [data.name, data.email, data.password]
        }

        return mysql.query(sql.query, sql.params)
            .then(data => {
                return {
                    status: true,
                    data
                }
            })
            .catch(error => {
                if (debug) {
                    console.error('registrasi user error : ', error)
                }
                return {
                    status: false,
                    error
                }
            })


    }

    loginUser() {
        //code to login User
    }
}


module.exports = new _user()