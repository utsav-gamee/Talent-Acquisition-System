const CONSTANTS_CONFIG = require("../config/constants-config");
const ScreeningDao = require("../dao/ScreeningDao");

function ScreeningService() { }

// Get all Screening details
ScreeningService.prototype.getAllScreenings = async (request) => {
  let screening = {};
  screening = await ScreeningDao.getAllScreenings();

  const success = {
    message:
      screening.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST
          .SCREENING_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST.SCREENING_LIST_FOUND_MSG,
    data: screening
  }
  return success;
};

// Get Screening details by screening id
ScreeningService.prototype.getScreeningById = async (request) => {
  const screeningId = request.params.id;
  const screening = await ScreeningDao.getScreeningById(screeningId);
  const success = {
    message:
      screening.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST
          .FETCH_SCREENING_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST
          .FETCH_SCREENING_FOUND_MSG,
    data: screening,
  }

  return success;
};

// Add Screening details
ScreeningService.prototype.addScreening = async (request) => {
  const { candidate_id, user_id, designation, skills, review, created_by } =
    request.body;
  const screening = await ScreeningDao.addScreening(
    candidate_id,
    user_id,
    designation,
    skills,
    review,
    created_by
  )

  const success = {
    message:
      screening.length == 0
        ? CONSTANTS_CONFIG.MAPPER.ADD_SCREENING.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.ADD_SCREENING.SUCCESS_MSG,
    data: screening,
  }

  return success;
}

module.exports = ScreeningService;
