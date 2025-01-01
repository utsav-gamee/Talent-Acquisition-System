const CONSTANTS_CONFIG = require("../config/constants-config");
const InterviewersDao = require("../dao/InterviewersDao");

function InterviewersService() { }

// Get all interviewer details
InterviewersService.prototype.getAllInterviewers = async (request) => {
  let interviewers = {};
  interviewers = await InterviewersDao.getAllInterviewers();

  const success = {
    message:
      interviewers.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
          .INTERVIEWERS_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
          .INTERVIEWERS_LIST_FOUND_MSG,
    data: interviewers,
  }

  return success;
};

// Get interviewer details by interviewer id
InterviewersService.prototype.getInterviewerById = async (request) => {
  const interviewersId = request.params.id;
  const interviewer = await InterviewersDao.getInterviewerById(interviewersId);
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
          .FETCH_INTERVIEWERS_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
          .FETCH_INTERVIEWERS_FOUND_MSG,
    data: interviewer,
  }

  return success;
};

// Add interviewer details
InterviewersService.prototype.addInterviewer = async (request) => {
  const { user_id, designation, experience, domain, skills, created_by } =
    request.body;
  const interviewer = await InterviewersDao.addInterviewer(
    user_id,
    designation,
    experience,
    domain,
    skills,
    created_by
  );
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEWERS.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEWERS.SUCCESS_MSG,
    data: interviewer,
  };

  return success;
};

// Remove interviewer details by interviewer id
InterviewersService.prototype.removeInterviewer = async (request) => {
  const interviewersId = request.params.id;

  const interviewer = await InterviewersDao.removeInterviewer(interviewersId);
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEWERS.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEWERS.SUCCESS_MSG,
    data: interviewer,
  }
  return success;
};

// Update interviewer details by interviewer id
InterviewersService.prototype.updateInterviewer = async (request) => {
  const interviewersId = request.params.id;
  const { user_id, designation, experience, domain, skills } = request.body;

  const interviewer = await InterviewersDao.updateInterviewer(
    interviewersId,
    user_id,
    designation,
    experience,
    domain,
    skills
  );
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEWERS.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEWERS.SUCCESS_MSG,
    data: interviewer,
  }

  return success;
};


// Get all interviewer from users table
InterviewersService.prototype.getInterviewersFromUsers = async (request) => {
  let interviewers = {};
  interviewers = await InterviewersDao.getInterviewersFromUsers();

  const success = {
    message:
      interviewers.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
          .INTERVIEWERS_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
          .INTERVIEWERS_LIST_FOUND_MSG,
    data: interviewers,
  }
  return success;
};

module.exports = InterviewersService;
