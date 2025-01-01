const CONSTANTS_CONFIG = require("../config/constants-config");
const EvaluationsDao = require("../dao/EvaluationsDao");

function EvaluationService() { }

// Get all Evaluations details
EvaluationService.prototype.getAllEvaluations = async (request) => {
  let evaluation = {};
  evaluation = await EvaluationsDao.getAllEvaluations();

  const success = {
    message: (evaluation.length == 0)
      ? CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.EVALUATION_LIST_NOT_FOUND_MSG
      : CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.EVALUATION_LIST_FOUND_MSG,
    data: evaluation,
  };
  return success;
};

// Get Evaluations details by Evaluation id
EvaluationService.prototype.getEvaluationById = async (request) => {
  const evaluationId = request.params.id;
  const evaluation = await EvaluationsDao.getEvaluationById(evaluationId);

  const success = {
    message: (evaluation.length == 0)
      ? CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.FETCH_EVALUATION_NOT_FOUND_MSG
      : CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.FETCH_EVALUATION_FOUND_MSG,
    data: evaluation
  };

  return success;
};


// Add Evaluations details
EvaluationService.prototype.addEvaluation = async (request) => {
  const { interviewer_id, candidate_id, evaluation_for, evaluation_by, position_assigned, round, comment } = request.body;
  const evaluation = await EvaluationsDao.addEvaluation(interviewer_id, candidate_id, evaluation_for, evaluation_by, position_assigned, round, comment);

  const success = {
    message: (evaluation.length == 0)
      ? CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.ERROR_MSG
      : CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.SUCCESS_MSG,
    data: evaluation,
  };

  return success;
};

//update evaluation
EvaluationService.prototype.updateEvaluations = async (request) => {
  const evaluation_id = request.params.id
  const { candidate_id, interviewer_id, round, evaluation_for, position_assigned, evaluation_by, comment } = request.body

  let evaluation = await EvaluationsDao.updateEvaluations(evaluation_id, candidate_id, interviewer_id, round, evaluation_for, position_assigned, evaluation_by, comment);

  if (evaluation && evaluation.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.SUCCESS_MSG,
      data: evaluation_id
    };
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.ERROR_MSG
    };
  }
  return success;
}


module.exports = EvaluationService;
