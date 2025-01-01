const EventService = require("../services/EventService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const CommonUtil = require("../utils/CommonUtil");

const eventService = new EventService();

module.exports = {

  //get all Events
  getAllEvents: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await eventService.getAllEvents(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  },
  //get Events by id
  getEventsById: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await eventService.getEventsById(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      })
    }
  },

  //create Events

  createEvents: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "event_name")) {
            if (CommonUtil.validateInt(request, "body", "total_interviews")) {
              try {
                const searchResult = await eventService.createEvents(request)
                response.status(200).send(searchResult)
              } catch (ex) {
                response.status(ex.statusCode || 500).send({
                  message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
                  error: ex
                })
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_TOTAL_INTERVIEWS,
              });
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_NAME,
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
        error: ex
      })
    }
  },

  //update event
  updateEvents: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "event_name")) {
            if (CommonUtil.validateInt(request, "body", "total_interviews")) {
              try {
                const searchResult = await eventService.updateEvents(request)
                response.status(200).send(searchResult)
              } catch (ex) {
                response.status(ex.statusCode || 500).send({
                  message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
                  error: ex
                })
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_TOTAL_INTERVIEWS,
              })
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_NAME,
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
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.ADD_USER_EXCEPTION.EXCEPTION_MSG,
        error: ex
      })
    }
  },

  //delete interview by id
  deleteEvents: async (request, response) => {
    try {
      const permission = await CommonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await eventService.deleteEvents(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  }
}
