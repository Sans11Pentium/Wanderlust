const Joi = require('joi'); 

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price:Joi.number().required().min(0),
        image: Joi.string().allow("",null)
    }).required()
});
//string() -> type of input should be string
//required() -> shouldnt be empty
// .min(0) -> that min value of price can be 0, cant be negative
//.allow(...,...) -> pool of values it is allowed to take ie, empty str/ null 