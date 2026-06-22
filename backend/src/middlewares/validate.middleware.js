export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            next()
        } catch (err) {
            const message = err.error?.[0]?.message || 'validation Failed'
            res.status(400).json({ message: message })
        }
    }

}