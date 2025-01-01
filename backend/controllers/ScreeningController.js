const ScreeningService = require("../services/ScreeningService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const CommonUtil = require("../utils/CommonUtil");

const screeningService = new ScreeningService();

module.exports = {
  // Get all Screening details
  getAllScreenings: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const screeningResult = await screeningService.getAllScreenings(request)
        response.status(200).send(screeningResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Get Screening details  by Screening id
  getScreeningById: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const screeningResult = await screeningService.getScreeningById(request)
        response.status(200).send(screeningResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  // Add Screening details
  addScreening: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "candidate_id")) {
            if (CommonUtil.validateString(request, "body", "review")) {
              if (CommonUtil.validateString(request, "body", "designation")) {
                if (CommonUtil.validateString(request, "body", "skills")) {
                  try {
                    const screeningResult = await screeningService.addScreening(
                      request
                    )
                    response.status(200).send(screeningResult)
                  } catch (ex) {
                    response.status(ex.statusCode || 500).send({
                      message:
                        ex.message ||
                        CONSTANTS_CONFIG.MAPPER.ADD_SCREENING.EXCEPTION_MSG,
                      error: ex
                    })
                  }
                } else {
                  response.status(400).send({
                    message:
                      CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                        .REQUIRED_SCREENING_SKILLS
                  })
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                      .REQUIRED_SCREENING_DESIGNATIUON
                })
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_REVIEW
              })
            }
          } else {
            response.status(400).send({
              message:
                CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_CANDIDATE_ID
            })
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
          })
        }
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
        error: ex
      })
    }
  }
}
