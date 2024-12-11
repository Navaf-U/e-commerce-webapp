import joi from 'joi'

const joiUserSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(4).required(),
    isBlocked:joi.boolean().default(false).optional(),
    role:joi.boolean().default("user").optional(),
    refreshToken:joi.string().optional()
})

const joiProductSchema = joi.object({
        name:joi.string().required(),
        type:joi.string().required(),
        price:joi.number().required(),
        qty:joi.number().required().min(1),
        description:joi.string().optional(),
        brand:joi.string().required(),
        rating:joi.number().required().min(1).max(5),
        reviews:joi.number().optional(),
        isDeleted:joi.boolean().default(false).optional()
})

export {joiUserSchema,joiProductSchema}