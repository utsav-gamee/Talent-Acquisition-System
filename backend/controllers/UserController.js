const UserService = require("../services/UserService")
const CONSTANTS_CONFIG = require("../config/constants-config")
const commonUtil = require("../utils/CommonUtil")

const userService = new UserService()

module.exports = {
  userLogin: async (request, response) => {
    if (Object.keys(request.body).length !== 0) {
      if (commonUtil.validateString(request, "body", "email")) {
        if (commonUtil.validateString(request, "body", "password")) {
          try {
            const user = await userService.userLogin(request)
            response.status(200).send(user)
          } catch (ex) {
            response.status(ex.statusCode || 500).send({
              message:
                ex.message ||
                CONSTANTS_CONFIG.MAPPER.ADD_USER.EXCEPTION_MSG,
              error: ex
            })

            if (ex.code === "UserNotConfirmedException") {
              response.status(512).send({
                message:
                  ex.message || CONSTANTS_CONFIG.MAPPER.LOGIN.LOGIN_FAILURE_MSG,
                error: ex
              })
            } else {
              response.status(ex.statusCode || 500).send({
                message:
                  ex.message || CONSTANTS_CONFIG.MAPPER.LOGIN.LOGIN_FAILURE_MSG,
                error: ex
              })
            }
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_PASSWORD
          })
        }
      } else {
        response.status(400).send({
          message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EMAIL
        })
      }
    } else {
      response.status(400).send({
        message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY
      })
    }
  },

  getAllUsers: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await userService.getAllUsers(request)
        response.status(200).send(searchResult)
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  getUserById: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await userService.getUserById(request)
        response.status(200).send(searchResult)
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  createUser: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (commonUtil.validateString(request, "body", "first_name")) {
            if (commonUtil.validateString(request, "body", "middle_name")) {
              if (commonUtil.validateString(request, "body", "last_name")) {
                if (commonUtil.validateString(request, "body", "email")) {
                  if (commonUtil.validateString(request, "body", "user_type")) {
                    try {
                      const searchResult = await userService.createUser(request)

                      response.status(200).json(searchResult);
                    } catch (ex) {
                      response.status(ex.statusCode || 500).send({
                        message:
                          ex.message ||
                          CONSTANTS_CONFIG.MAPPER.ADD_USER.EXCEPTION_MSG,
                        error: ex
                      })
                    }
                  } else {
                    response.status(400).send({
                      message:
                        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_USER_TYPE
                    })
                  }
                } else {
                  response.status(400).send({
                    message:
                      CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EMAIL
                  })
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_LAST_NAME
                })
              }
            } else {
              response.status(400).send({
                message:
                  CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_MIDDLE_NAME
              })
            }
          } else {
            response.status(400).send({
              message:
                CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_FIRST_NAME
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

  updateUser: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (commonUtil.validateString(request, "body", "first_name")) {
            if (commonUtil.validateString(request, "body", "middle_name")) {
              if (commonUtil.validateString(request, "body", "last_name")) {
                if (commonUtil.validateString(request, "body", "email")) {
                  if (commonUtil.validateString(request, "body", "user_type")) {
                    try {
                      const searchResult = await userService.updateUser(request)
                      response.status(200).json(searchResult);
                    } catch (ex) {
                      response.status(ex.statusCode || 500).send({
                        message:
                          ex.message ||
                          CONSTANTS_CONFIG.MAPPER.ADD_USER.EXCEPTION_MSG,
                        error: ex,
                      })
                    }
                  } else {
                    response.status(400).send({
                      message:
                        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                          .REQUIRED_USER_TYPE,
                    });
                  }
                } else {
                  response.status(400).send({
                    message:
                      CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EMAIL,
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
              })
            }
          } else {
            response.status(400).send({
              message:
                CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_FIRST_NAME,
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
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  deleteUser: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await userService.deleteUser(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.DELETE_USER.EXCEPTION_MSG,
        error: ex
      })
    }
  }
}
