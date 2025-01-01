const CONSTANTS_CONFIG = require("../config/constants-config");
const CandidateDao = require("../dao/CandidateDao")

function CandidateService() { }

// Get all candidates details

CandidateService.prototype.getAllCandidates = async (request) => {
  let candidate = {};

  candidate = await CandidateDao.getAllCandidates();

  if (candidate && candidate.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_FOUND_MSG,
      data: candidate,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_NOT_FOUND_MSG,
      data: candidate,
    };
  }
  return success;
};

// Get candidate details by id

CandidateService.prototype.getCandidateById = async (request) => {
  let candidate = {};
  const id = request.params.id;
  candidate = await CandidateDao.getCandidateById(id);

  if (candidate && candidate.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_FOUND_MSG,
      data: candidate,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_NOT_FOUND_MSG,
      data: candidate,
    }
  }
  return success
};

// Create candidate

CandidateService.prototype.createCandidate = async (request) => {

  const { user_id, first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation,
    previous_company, experience, education } = request.body
  const cv = request.file.path
  let candidate = {}
  candidate = await CandidateDao.createCandidate
    (user_id, first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation,
      previous_company, experience, education, cv)

  if (candidate && candidate.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.SUCCESS_MSG,
      data: candidate,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
      data: candidate,
    }
  }
  return success
};

CandidateService.prototype.updateCandidate = async (request) => {

  const { first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation,
    previous_company, experience, education } = request.body
  const cv = request.file.path
  let candidate = {}
  const id = request.params.id;
  candidate = await CandidateDao.updateCandidate(first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation,
    previous_company, experience, education, cv, id);


  if (candidate && candidate.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_CANDIDATE.SUCCESS_MSG,
      data: candidate,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_CANDIDATE.ERROR_MSG,
      data: candidate,
    }

  }
  return success
}

// Delete user

CandidateService.prototype.deleteCandidate = async (request) => {
  let candidate = {}
  const id = request.params.id;
  candidate = await CandidateDao.deleteCandidate(id);

  if (candidate && candidate.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_CANDIDATE.SUCCESS_MSG,
      data: candidate,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_CANDIDATE.ERROR_MSG,
      data: candidate,
    }
  }
  return success;
};

module.exports = CandidateService;