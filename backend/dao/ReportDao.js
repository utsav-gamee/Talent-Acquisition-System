const dbClient = require("../utils/database");

module.exports = {

  // Get all report details 
  getReports: async (date1, date2) => {

    const data_result = await dbClient.query(`select * from report where date(interview_time) between '${date1}' and '${date2}'`)
    let result = data_result.rows;

    return result;
  },
};
