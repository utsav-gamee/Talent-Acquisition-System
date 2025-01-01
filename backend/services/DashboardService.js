const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const dashboardDao = require("../dao/DashboardDao");

function DashboardService() { }

// Get  events count
DashboardService.prototype.getEvents = async (request) => {
  let event = {};
  event = await dashboardDao.getEvents();

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EVENT_LIST_FOUND_MSG,
      data: event
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EVENT_LIST_NOT_FOUND_MSG,
      data: event
    }
  }
  return success;
}

//get inteviews count
DashboardService.prototype.getInterviews = async (request) => {
  let Interview = {};
  Interview = await dashboardDao.getInterviews();

  if (Interview && Interview.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_FOUND_MSG,
      data: Interview
    }
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST
          .FETCH_INTERVIEW_NOT_FOUND_MSG,
    };
  }
  return success;
}

DashboardService.prototype.getCandidates = async (request) => {
  let Candidates = {};
  Candidates = await dashboardDao.getCandidates();

  if (Candidates && Candidates.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_FOUND_MSG,
      data: Candidates,
    }
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST
          .FETCH_INTERVIEW_NOT_FOUND_MSG,
    }
  }
  return success;
}


DashboardService.prototype.getCandidateStatus = async (request) => {
  let Candidates = {};
  Candidates = await dashboardDao.getCandidateStatus();

  if (Candidates && Candidates.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.CANDIDATE_STATUS_FOUND_MSG,
      data: Candidates,
    }
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.CANDIDATE_STATUS_NOT_FOUND_MSG,
    }
  }
  return success;
};




DashboardService.prototype.getUpcomingInterviews = async (request) => {
  logger.info("[ DashboardService getUpcomingInterviews() ] is called.");
  let Interviews = {};
  Interviews = await dashboardDao.getUpcomingInterviews();

  if (Interviews && Interviews.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.UPCOMING_INTERVIEW_FOUND_MSG,
      data: Interviews,
    };
    logger.info(
      "[ DashboardService getUpcomingInterviews() ] returned result : ",

    );
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.UPCOMING_INTERVIEW_NOT_FOUND_MSG,
    };
  }
  return success;
};

module.exports = DashboardService;
