const EvaluationService = require("../services/EvaluationService");
const CONSTANTS_CONFIG = require("../config/constants-config")
const CommonUtil = require("../utils/CommonUtil");

const evaluationService = new EvaluationService();


module.exports = {

  // Get all Evaluations details 
  getAllEvaluations: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const evaluationResult = await evaluationService.getAllEvaluations(request)
        response.status(200).send(evaluationResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Get Evaluations details  by Evaluation id
  getEvaluationById: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const evaluationResult = await evaluationService.getEvaluationById(request)
        response.status(200).send(evaluationResult)
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Add Evaluations details
  addEvaluation: async (request, response) => {

    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "candidate_id")) {
            if (CommonUtil.validateString(request, "body", "interviewer_id")) {
              if (CommonUtil.validateString(request, "body", "evaluation_for")) {
                if (CommonUtil.validateString(request, "body", "evaluation_by")) {
                  if (CommonUtil.validateString(request, "body", "comment")) {

                    try {
                      const evaluationResult = await evaluationService.addEvaluation(request)
                      response.status(200).send(evaluationResult)
                    } catch (ex) {
                      response.status(ex.statusCode || 500).send({
                        message: ex.message || CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.EXCEPTION_MSG,
                        error: ex,
                      })
                    }
                  } else {
                    response.status(400).send({
                      message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVOLUTION_COMMENT
                    });
                  }
                } else {
                  response.status(400).send({
                    message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVOLUTION_BY
                  });
                }
              }
              else {
                response.status(400).send({
                  message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVOLUTION_FOR
                });
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_INTERVIEWER_ID
              });
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_CANDIDATE_ID
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

  //update evaluation
  updateEvaluations: async (request, response) => {
    if (Object.keys(request.body).length !== 0) {
      if (CommonUtil.validateString(request, "body", "candidate_id")) {
        if (CommonUtil.validateString(request, "body", "interviewer_id")) {
          if (CommonUtil.validateString(request, "body", "evaluation_for")) {
            if (CommonUtil.validateString(request, "body", "evaluation_by"))
              if (CommonUtil.validateString(request, "body", "comment")) {
                try {
                  const searchResult = await evaluationService.updateEvaluations(request)
                  response.status(200).send(searchResult)
                } catch (ex) {
                  response.status(ex.statusCode || 500).send({
                    message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
                    error: ex,
                  })
                }
              } else {
                response.status(400).send({
                  message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVALUATION_COMMENT,
                });
              }
            else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVALUATION_EVALUATION_BY,
              });
            }
          }
          else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVALUATION_EVALUATION_FOR,
            });
          }
        }

        else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_EVALUATION_INTERVIEWER_ID,
          });
        };
      }
      else {
        response.status(400).send({
          message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_EVALUATION_CANDIDATE_ID,
        })
      }
    }
  }
}