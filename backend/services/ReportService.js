const CONSTANTS_CONFIG = require("../config/constants-config");
const ReportDao = require("../dao/ReportDao");

function ReportService() { }

// Get all report details
ReportService.prototype.getReports = async (request) => {
  const date1 = request.query.date1;
  const date2 = request.query.date2;
  let reports = {};
  reports = await ReportDao.getReports(date1, date2);

  const success = {
    message:
      reports.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_REPORT_LIST.REPORT_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_REPORT_LIST.REPORT_LIST_FOUND_MSG,
    data: reports,
  }
  return success;
};

module.exports = ReportService;
