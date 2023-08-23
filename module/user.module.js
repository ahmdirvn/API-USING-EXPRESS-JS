const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const mysql = new (require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require('joi');
const bcrypt = require('bcrypt')


class _user {


    //register user 
    async registerUser(data) {

        // code to add user
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



    async login(email, password) {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate({ email, password });

        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => {
                return detail.message;
            });

            return {
                status: false,
                code: 422,
                error: errorDetails.join(',')
            };
        }

        const user = await this.findUserByEmail(email);

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return null;
        }

        return user;
    }

    async findUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;

        try {
            const result = await mysql.query(query, [email]); // Make sure to use the correct query method
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }

}


module.exports = new _user()