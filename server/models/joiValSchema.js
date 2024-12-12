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
        rating:joi.number().optional().min(1).max(5).default(1),
        reviews:joi.number().optional().default(0),
        isDeleted:joi.boolean().optional().default(false)
})

export {joiUserSchema,joiProductSchema}