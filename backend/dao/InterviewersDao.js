const dbClient = require("../utils/database");

module.exports = {
  // Get all Interviewers details
  getAllInterviewers: async () => {
    const data_result =
      await dbClient.query(`select interviewers.interviewer_id ,users.user_id,first_name ,middle_name, last_name,email,designation,interviewers.domain,experience,skills from interviewers
      left join users on users.user_id = interviewers.user_id
    where user_type='interviewer' ORDER BY interviewers.updated_at DESC`);
    let result = data_result.rows;

    return result;
  },

  // Get Interviewer details by id
  getInterviewerById: async (interviewersId) => {
    const data_result = await dbClient.query(
      `SELECT * FROM interviewers where interviewer_id='${interviewersId}'`
    );
    let result = data_result.rows;

    return result;
  },

  // Add Interviewer details
  addInterviewer: async (
    user_id,
    designation,
    experience,
    domain,
    skills,
    created_by
  ) => {
    const data_result = await dbClient.query(
      `INSERT INTO interviewers (user_id,designation,experience,domain,skills) 
    VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, designation, experience, domain, skills]
    );
    let result = data_result.rows;

    return result;
  },

  //Remove Interviewer details
  removeInterviewer: async (interviewersId) => {
    const data_result = await dbClient.query(
      `DELETE FROM interviewers where interviewer_id='${interviewersId}' RETURNING *`
    );
    let result = data_result.rows;

    return result;
  },

  //update Interviewer details by id
  updateInterviewer: async (
    interviewersId,
    user_id,
    designation,
    experience,
    domain,
    skills
  ) => {
    const data_result = await dbClient.query(
      `UPDATE interviewers SET
    user_id = $1, designation = $2, experience = $3,domain= $4,skills = $5  WHERE interviewer_id = $6 RETURNING *`,
      [user_id, designation, experience, domain, skills, interviewersId]
    );

    let result = data_result.rows;

    return result;
  },

  // Get all Interviewers from users table
  getInterviewersFromUsers: async () => {

    const data_result =
      await dbClient.query(`SELECT user_id, first_name,middle_name, last_name,email
      FROM users
      WHERE user_id NOT IN(SELECT user_id FROM interviewers)
      AND user_type='interviewer'`);
    let result = data_result.rows;

    return result;
  },
};
