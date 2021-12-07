const Joi = require('joi');


const schema = {
    id: Joi.number(),

    firstLastName: Joi.string()
        .min(2)
        .max(25),

    sex: Joi.string()
        .min(2)
        .max(8),

    birth_date: Joi.date(),

    address: Joi.string()
        .min(2)
        .max(255),

    phone: Joi.string(),


    passport: Joi.string()
        .min(2)
        .max(20),

    scratch_number: Joi.number()
        .integer()
        .min(1)
        .max(25),

    receipt_date: Joi.date(),

    groups: Joi.string()
        .min(2)
        .max(255),

    course: Joi.string()
        .min(2)
        .max(255),

    specialty_code: Joi.number()
        .integer()
        .min(1)
        .max(100),

    full_time: Joi.string()
        .allow("")
        .min(1)
        .max(255)


}



module.exports = schema;