const dbClient = require("../utils/database");

module.exports = {

  getProfile: async (id) => {
    const data_result = await dbClient.query('SELECT first_name, last_name, user_type FROM public.users WHERE user_id = $1', [id])
    let result = data_result.rows

    return result;
  },
}