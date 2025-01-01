const InterviewersService = require("../services/InterviewersService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const CommonUtil = require("../utils/CommonUtil");

const interviewersService = new InterviewersService();

module.exports = {
  // Get all interviewers details
  getAllInterviewers: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const interviewerResult = await interviewersService.getAllInterviewers(
          request
        )
        response.status(200).send(interviewerResult)
      }
      else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Get interviewer details by interviewer id
  getInterviewerById: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {

        const interviewerResult = await interviewersService.getInterviewerById(request)
        response.status(200).send(interviewerResult)
      }
      else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Add interviewer details
  addInterviewer: async (request, response) => {

    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "user_id")) {
            if (CommonUtil.validateString(request, "body", "designation")) {
              if (CommonUtil.validateString(request, "body", "domain")) {
                if (CommonUtil.validateString(request, "body", "skills")) {
                  if (CommonUtil.validateInt(request, "body", "experience")) {

                    try {
                      const interviewerResult =
                        await interviewersService.addInterviewer(request)
                      response.status(200).send(interviewerResult);
                    } catch (ex) {
                      response.status(ex.statusCode || 500).send({
                        message:
                          ex.message ||
                          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
                        error: ex
                      })
                    }
                  } else {
                    response.status(400).send({
                      message:
                        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_EXPERIENCE
                    })
                  }
                } else {
                  response.status(400).send({
                    message:
                      CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_SKILLS
                  })
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_DOMAIN
                })
              }
            } else {
              response.status(400).send({
                message:
                  CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_DESIGNATION
              })
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_USER_ID
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
        message: ex.message || CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Remove interviewer details by interviewer id
  removeInterviewer: async (request, response) => {

    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const interviewerResult = await interviewersService.removeInterviewer(request)
        response.status(200).send(interviewerResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Update interviewer details by interviewer id
  updateInterviewer: async (request, response) => {

    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {

        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "user_id")) {
            if (CommonUtil.validateString(request, "body", "designation")) {
              if (CommonUtil.validateString(request, "body", "domain")) {
                if (CommonUtil.validateString(request, "body", "skills")) {
                  if (CommonUtil.validateInt(request, "body", "experience")) {

                    try {
                      const interviewerResult = await interviewersService.updateInterviewer(request)
                      response.status(200).send(interviewerResult);
                    } catch (ex) {
                      response.status(ex.statusCode || 500).send({
                        message:
                          ex.message ||
                          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
                        error: ex
                      })
                    }
                  } else {
                    response.status(400).send({
                      message:
                        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_EXPERIENCE
                    })
                  }
                } else {
                  response.status(400).send({
                    message:
                      CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_SKILLS
                  })
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_DOMAIN
                })
              }
            } else {
              response.status(400).send({
                message:
                  CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_DESIGNATION
              })
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_USER_ID
            });
          }
        }
        else {
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
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },


  //get interviewers from user table
  getInterviewersFromUsers: async (request, response) => {
    try {
      const interviewerResult = await interviewersService.getInterviewersFromUsers(request)
      response.status(200).send(interviewerResult);
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  }
}

