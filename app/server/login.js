import Team from "@/schema/Team"
import { cookies } from "next/headers"
import { error } from "."

async function login({ email, password }) {
    let data = await Team.findOne({ email, password })
    if (!data) {
        return error('user not found', 404)
    }
    let cookie = cookies()
    cookie.set('_tok', JSON.stringify({ user: data._id.toString(), role: 'team' }), { maxAge: 60 * 60 * 20 })
    return { login: 'success' }
}

export default { login }