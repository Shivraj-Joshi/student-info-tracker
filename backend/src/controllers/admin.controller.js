import { adminLogin } from "../services/admin.service.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await adminLogin(email, password)
        res.json(result)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
