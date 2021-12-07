const Joi = require('joi');


const schema = {
 
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




function validate(data, rule) {
    return new Promise((resolve, reject) => {
        const obj = Joi.object(rule);
        const { error, value } = obj.validate(data);
        if (error) return reject(error);
        resolve(value);
    });
}

module.exports = {
    validate,
    createSchema: schema
}


// schema.validate({ username: 'abc', birth_year: 1994 });

// schema.validate({});


// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }