const dbClient = require("../utils/database");
module.exports = {

  // Get All Candidates
  getAllCandidates: async () => {
    const data_result = await dbClient.query(`SELECT * FROM public.candidates, public.candidate_management 
    WHERE (public.candidates.candidate_id = public.candidate_management.candidate_id) ORDER BY candidates.updated_at DESC`)
    let result = data_result.rows;

    return result;
  },

  // Get Candidates By Id   
  getCandidateById: async (id) => {
    const data_result = await dbClient.query(`SELECT * FROM public.candidates, public.candidate_management 
    WHERE (public.candidates.candidate_id = public.candidate_management.candidate_id) AND (public.candidates.candidate_id = $1)`, [id])
    let result = data_result.rows;

    return result;
  },

  // Create Candidate  
  createCandidate: async (user_id, first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation,
    previous_company, experience, education, cv) => {
    const data_result = await dbClient.query(`INSERT INTO public.candidates 
    (user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING candidate_id`,
      [user_id, first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by])
    let result = data_result.rows;

    const candidate_id = result[0].candidate_id;

    return result;
  },

  //Update Candidate
  updateCandidate: async (first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation,
    previous_company, experience, education, cv, id) => {
    const data_result = await dbClient.query(`UPDATE public.candidates SET 
    first_name = $1, middle_name = $2, last_name = $3, email = $4, personal_mobile = $5, home_mobile = $6, date_of_birth = $7
    WHERE candidate_id = $8 RETURNING *`,
      [first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, id])

    result = data_result.rows

    return result;
  },

  //Delete Candidate
  deleteCandidate: async (id) => {

    const data_result = await dbClient.query(`DELETE FROM public.candidates
    WHERE candidate_id = $1 RETURNING *`, [id])
    let result = data_result.rows
    return result
  }
}
