const InterviewService = require("../services/InterviewService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const CommonUtil = require("../utils/CommonUtil");

const interviewService = new InterviewService();

module.exports = {

  //get all interviews
  getAllInterviews: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await interviewService.getAllInterviews(request)
        response.status(200).send(searchResult)
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  //get interview by id
  getInterviewsById: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await interviewService.getInterviewsById(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  //create interview
  createInterviews: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "interviewer_id")) {
            if (CommonUtil.validateString(request, "body", "candidate_id")) {
              if (CommonUtil.validateString(request, "body", "event_id")) {
                try {
                  const searchResult = await interviewService.createInterviews(request);
                  response.status(200).send(searchResult);
                } catch (ex) {
                  response.status(ex.statusCode || 500).send({
                    message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.EXCEPTION_MSG,
                    error: ex
                  })
                }
              } else {
                response.status(400).send({
                  message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_ID
                })
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_CANDIDATE_ID
              })
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_ID
            })
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY
          })
        }
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.ADD_USER_EXCEPTION.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  //update interview
  updateInterviews: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "interviewer_id")) {
            if (CommonUtil.validateString(request, "body", "candidate_id")) {
              if (CommonUtil.validateString(request, "body", "event_id")) {
                try {
                  const searchResult = await interviewService.updateInterviews(request)
                  response.status(200).send(searchResult)
                } catch (ex) {
                  response.status(ex.statusCode || 500).send({
                    message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.EXCEPTION_MSG,
                    error: ex
                  })
                }
              } else {
                response.status(400).send({
                  message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_ID,
                });
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_CANDIDATE_ID,
              });
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_ID,
            });
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
          });
        }
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.ADD_USER_EXCEPTION.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  //delete interview by id
  deleteInterviews: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await interviewService.deleteInterviews(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  }
}
