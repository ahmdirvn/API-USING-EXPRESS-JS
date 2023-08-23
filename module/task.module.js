const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const mysql = new (require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require('joi');

class _task {

    //create data
    add(data) {

        // Validate data
        const schema = Joi.object({
            title: Joi.string(),
            description: Joi.string()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate(data)
        if (validation.error) {
            const errorDetails = validation.error.details.map((detail) => {
                return detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }

        // Insert data to database
        const sql = {
            query: `INSERT INTO todo (title,description) VALUES (?,?)`,
            params: [data.title, data.description]
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
                    console.error('add task Error: ', error)
                }

                return {
                    status: false,
                    error
                }
            })
    }

    //update data

    update(data) {
        // Validate data
        const schema = Joi.object({
            id: Joi.number().required(),
            title: Joi.string(),
            description: Joi.string()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate(data);
        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => {
                return detail.message;
            });

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }

        // Update data in database
        const sql = {
            query: `UPDATE todo SET title = ?,description = ? WHERE id = ?`,
            params: [data.title, data.description, data.id,]
        };

        return mysql.query(sql.query, sql.params)
            .then(data => {
                return {
                    status: true,
                    data
                };
            })
            .catch(error => {
                if (debug) {
                    console.error('update task Error: ', error);
                }

                return {
                    status: false,
                    error
                };
            });
    }


    //delete data

    delete(id) {
        // Delete data from database
        const sql = {
            query: `DELETE FROM todo WHERE id = ?`,
            params: [id]
        };

        return mysql.query(sql.query, sql.params)

            .then(data => {
                return {
                    status: true,
                    data
                };
            })
            .catch(error => {
                if (debug) {
                    console.error('delete task Error: ', error);
                }

                return {
                    status: false,
                    error
                };
            });
    }

    getAll() {
        // Retrieve all data from database
        const sql = {
            query: `SELECT * FROM todo`
        };

        return mysql.query(sql.query)
            .then(data => {
                return {
                    status: true,
                    data
                };
            })
            .catch(error => {
                if (debug) {
                    console.error('get all tasks Error: ', error);
                }

                return {
                    status: false,
                    error
                };
            });
    }


    GetById(id) {
        // Retrieve all data from database
        const sql = {
            query: `SELECT * FROM todo WHERE id = ?`
        };

        return mysql.query(sql.query, id)
            .then(data => {
                return {
                    status: true,
                    data
                };
            })
            .catch(error => {
                if (debug) {
                    console.error('get task by id Error: ', error);
                }

                return {
                    status: false,
                    error
                };
            });
    }

}


module.exports = new _task();
