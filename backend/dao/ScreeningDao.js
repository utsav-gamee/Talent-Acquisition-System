const dbClient = require("../utils/database");

module.exports = {
  // Get all Screening details
  getAllScreenings: async () => {
    const data_result = await dbClient.query(`SELECT public.candidates.candidate_id,public.candidates.first_name,
    public.candidates.middle_name,public.candidates.last_name,public.screening.screening_id ,public.screening.created_at, 
    public.screening.designation,public.screening.skills,public.screening.review 
    FROM public.screening LEFT JOIN public.candidates ON public.screening.candidate_id=public.candidates.candidate_id
`)
    let result = data_result.rows;

    return result;
  },

  // Get Screening details by id
  getScreeningById: async (screeningId) => {
    const data_result = await dbClient.query(
      `SELECT * FROM screening where screening_id='${screeningId}'`
    );
    let result = data_result.rows;

    return result;
  },

  // Add Screening details
  addScreening: async (
    candidate_id,
    user_id,
    designation,
    skills,
    review,
    created_by
  ) => {
    const data_result = await dbClient.query(
      `INSERT INTO screening (candidate_id,user_id,designation,skills,review,created_by) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [candidate_id, user_id, designation, skills, review, created_by]
    );
    let result = data_result.rows;

    return result;
  }
}
