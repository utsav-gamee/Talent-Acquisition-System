const DashboardService = require("../services/DashboardService");
const CONSTANTS_CONFIG = require("../config/constants-config");

const dashboardService = new DashboardService();

module.exports = {
  //get Events
  getEvents: async (request, response) => {
    try {
      const searchResult = await dashboardService.getEvents(request);
      response.status(200).send(searchResult);
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  //get interviews
  getInterviews: async (request, response) => {
    try {
      const searchResult = await dashboardService.getInterviews(request);
      response.status(200).send(searchResult);
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  //get candidates
  getCandidates: async (request, response) => {
    try {
      const searchResult = await dashboardService.getCandidates(request)
      response.status(200).send(searchResult)
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  getCandidateStatus: async (request, response) => {
    try {
      const searchResult = await dashboardService.getCandidateStatus(request)
      response.status(200).send(searchResult)
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.DASHBOARD.EXCEPTION_CANDIDATE_STATUS_MSG,
        error: ex,
      })
    }
  },


  getUpcomingInterviews: async (request, response) => {
    try {
      const searchResult = await dashboardService.getUpcomingInterviews(request)
      response.status(200).send(searchResult);
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.DASHBOARD.EXCEPTION_UPCOMING_INTERVIEW_MSG,
        error: ex,
      })
    }
  }
}
