const ReportService = require("../services/ReportService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const commonUtil = require("../utils/CommonUtil");

const reportsService = new ReportService();

module.exports = {
  // Get All report details
  getReports: async (request, response) => {
    try {
      const permission = await commonUtil.checkAuth(request)
      if (permission) {
        const searchResult = await reportsService.getReports(request)
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({ message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER })
      }
    } catch (ex) {
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_REPORT_LIST.EXCEPTION_MSG,
        error: ex
      })
    }
  }
}

