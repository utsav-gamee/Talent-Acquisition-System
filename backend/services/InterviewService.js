const CONSTANTS_CONFIG = require("../config/constants-config");
const interviewDao = require("../dao/InterviewDao");


function InterviewService() { }

// Get all interviews details
InterviewService.prototype.getAllInterviews = async (request) => {
  let interview = {};
  interview = await interviewDao.getAllInterviews();

  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.INTERVIEW_LIST_FOUND_MSG,
      data: interview
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.INTERVIEW_LIST_NOT_FOUND_MSG,
      data: interview
    }
  }
  return success;
};

//get interviews by id
InterviewService.prototype.getInterviewsById = async (request) => {
  const interviewId = request.params.id;
  let interview = {};
  interview = await interviewDao.getInterviewsById(interviewId);

  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_FOUND_MSG,
      data: interview,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_NOT_FOUND_MSG
    }
  }
  return success;
}

//create interviews
InterviewService.prototype.createInterviews = async (request) => {

  const { interviewer_id, candidate_id, event_id, interview_time, round, status, created_by, user_id } = request.body

  let interview = await interviewDao.createInterviews
    (interviewer_id, candidate_id, event_id, interview_time, round, status, created_by, user_id);

  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEW.SUCCESS_MSG,
      data: interview
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEW.ERROR_MSG,
    }
  }

  return success;
}

//update interviews
InterviewService.prototype.updateInterviews = async (request) => {

  const { interviewer_id, candidate_id, event_id, interview_time, round, status, created_by, user_id } = request.body
  const interviewId = request.params.id;

  let interview = await interviewDao.updateInterviews
    (interviewId, interviewer_id, candidate_id, event_id,
      interview_time, round, status, created_by, user_id)

  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEW.SUCCESS_MSG,
      data: interview,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEW.ERROR_MSG,
    }
  }

  return success;
}

//delete interviews
InterviewService.prototype.deleteInterviews = async (request) => {
  const interviewId = request.params.id;

  let interview = await interviewDao.deleteInterviews(interviewId);

  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEW.SUCCESS_MSG,
      data: interview
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEW.ERROR_MSG,
    }
  }

  return success;
}

module.exports = InterviewService;
