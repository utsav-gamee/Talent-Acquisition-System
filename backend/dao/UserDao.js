const dbClient = require("../utils/database")

module.exports = {
  findUserByEmail: async (email, password) => {
    const values = [email, password]

    const data_result = await dbClient.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      values
    )
    let result = data_result.rows

    return result
  },

  getAllUsers: async () => {
    const data_result = await dbClient.query("SELECT * FROM public.users ORDER BY updated_at DESC")
    let result = data_result.rows

    return result
  },

  getUserById: async (id) => {
    const data_result = await dbClient.query("SELECT * FROM public.users WHERE user_id = $1", [id])
    let result = data_result.rows

    return result
  },

  createUser: async (
    password,
    first_name,
    middle_name,
    last_name,
    email,
    mobile,
    user_type,
    created_by
  ) => {
    const data_result = await dbClient.query(
      `INSERT INTO public.users (password, first_name, middle_name, last_name, email, mobile, user_type, created_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        password,
        first_name,
        middle_name,
        last_name,
        email,
        mobile,
        user_type,
        created_by,
      ]
    )
    let result = data_result.rows

    return result
  },

  updateUser: async (
    first_name,
    middle_name,
    last_name,
    email,
    mobile,
    user_type,
    id
  ) => {
    const data_result = await dbClient.query(
      `UPDATE public.users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, mobile = $5, user_type = $6 WHERE user_id = $7 RETURNING *`,
      [first_name, middle_name, last_name, email, mobile, user_type, id]
    )
    let result = data_result.rows

    return result
  },

  deleteUser: async (id) => {
    const data_result = await dbClient.query(
      "DELETE FROM public.users WHERE user_id = $1 RETURNING *",
      [id]
    )
    let result = data_result.rows

    return result
  },
}