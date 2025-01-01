const CONSTANTS_CONFIG = require("../config/constants-config");
const ProfileDao = require("../dao/ProfileDao");

function ProfileService() { }

ProfileService.prototype.getProfile = async (request) => {
  let profile = {};
  const id = request.params.id;
  profile = await ProfileDao.getProfile(id);

  if (profile && profile.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_PROFILE.PROFILE_FOUND_MSG,
      data: profile,
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_PROFILE.PROFILE_NOT_FOUND_MSG,
      data: profile,
    }
  }
  return success;
};

module.exports = ProfileService;