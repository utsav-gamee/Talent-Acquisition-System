const CONSTANTS_CONFIG = require("../config/constants-config");
const eventDao = require("../dao/EventDao");

function EventService() { }

// Get all events details
EventService.prototype.getAllEvents = async (request) => {
  let event = {};
  event = await eventDao.getAllEvents();

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
};

//get events by id
EventService.prototype.getEventsById = async (request) => {
  const eventId = request.params.id;
  let event = {};
  event = await eventDao.getEventsById(eventId);

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.FETCH_EVENT_FOUND_MSG,
      data: event,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.FETCH_EVENT_NOT_FOUND_MSG,

    }
  }
  return success;
};

//create events
EventService.prototype.createEvents = async (request) => {

  const { event_name, total_interviews, time, created_by, user_id } = request.body

  let event = await eventDao.createEvents(event_name, total_interviews, time, created_by, user_id);

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.ADD_EVENT.SUCCESS_MSG,
      data: event
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_EVENT.ERROR_MSG
    }
  }

  return success;
};

//update events
EventService.prototype.updateEvents = async (request) => {

  const { event_name, total_interviews, time, created_by, user_id } = request.body
  const eventId = request.params.id;

  let event = await eventDao.updateEvents(eventId, event_name, total_interviews, time, created_by, user_id);

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.UPDATE_EVENT.SUCCESS_MSG,
      data: event
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_EVENT.ERROR_MSG
    }
  }

  return success;

};

//delete events
EventService.prototype.deleteEvents = async (request) => {
  const eventId = request.params.id;

  let event = await eventDao.deleteEvents(eventId);

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.DELETE_EVENT.SUCCESS_MSG,
      data: event
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_EVENT.ERROR_MSG,
    };
  }

  return success;
};

module.exports = EventService;
