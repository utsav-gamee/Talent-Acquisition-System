const CandidateService = require("../services/CandidateService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const commonUtil = require("../utils/CommonUtil");

const candidateService = new CandidateService();

module.exports = {

  getAllCandidates: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await candidateService.getAllCandidates(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },


  getCandidateById: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await candidateService.getCandidateById(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },


  createCandidate: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (commonUtil.validateString(request, "body", "first_name")) {
            if (commonUtil.validateString(request, "body", "middle_name")) {
              if (commonUtil.validateString(request, "body", "last_name")) {
                if (commonUtil.validateString(request, "body", "email")) {
                  try {
                    const searchResult = await candidateService.createCandidate(
                      request
                    )
                    response.status(200).json(searchResult)
                  } catch (ex) {
                    response.status(ex.statusCode || 500).send({
                      message:
                        ex.message ||
                        CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
                      error: ex,
                    });
                  }
                } else {
                  response.status(400).send({
                    message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EMAIL,
                  });
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_LAST_NAME,
                });
              }
            } else {
              response.status(400).send({
                message:
                  CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_MIDDLE_NAME,
              });
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_FIRST_NAME,
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
        message: ex.message || CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  updateCandidate: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (commonUtil.validateString(request, "body", "first_name")) {
            if (commonUtil.validateString(request, "body", "middle_name")) {
              if (commonUtil.validateString(request, "body", "last_name")) {
                if (commonUtil.validateString(request, "body", "email")) {
                  try {
                    const searchResult = await candidateService.updateCandidate(
                      request
                    )
                    response.status(200).json(searchResult)
                  } catch (ex) {
                    response.status(ex.statusCode || 500).send({
                      message:
                        ex.message ||
                        CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
                      error: ex,
                    })
                  }
                } else {
                  response.status(400).send({
                    message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EMAIL,
                  })
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_LAST_NAME,
                })
              }
            } else {
              response.status(400).send({
                message:
                  CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_MIDDLE_NAME,
              })
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_FIRST_NAME,
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
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },


  deleteCandidate: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request);
      if (permission) {
        const searchResult = await candidateService.deleteCandidate(request)
        response.status(200).send(searchResult)
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.DELETE_CANDIDATE.EXCEPTION_MSG,
        error: ex,
      })
    }
  }
}


