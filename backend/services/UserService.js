const jwt = require("jsonwebtoken")
const CONSTANTS_CONFIG = require("../config/constants-config")
const userDao = require("../dao/UserDao")
const commonUtil = require("../utils/CommonUtil");
const { use } = require("../routes");

function UserService() { }

UserService.prototype.userLogin = async (request) => {
  let user = {};
  const loginObj = commonUtil.isEmpty(request.body) ? null : request.body
  try {
    const userResult = await userDao.findUserByEmail(loginObj.email, loginObj.password)
    let success = {}
    if (userResult && userResult.length == 0) {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.FETCH_USER_NOT_FOUND_MSG,
        data: userResult
      }
    }
    else {
      // Creating the json webtoken with signature and key
      const token = jwt.sign(
        { email: userResult[0].email, userId: userResult[0].user_id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );

      user.user_id = userResult[0].user_id
      user.first_name = userResult[0].first_name
      user.last_name = userResult[0].last_name
      user.user_type = userResult[0].user_type
      user.token = token
      user.expiresIn = 3600

      if (user.err) {
        return user.err
      }

      if (user.ChallengeName === "NEW_PASSWORD_REQUIRED") {
        success = {
          message:
            CONSTANTS_CONFIG.MAPPER.LOGIN.LOGIN_SUCCESSFUL_NEW_PASSWORD_MSG,
          code: "NewPasswordRequired",
          data: user
        }
      } else {
        success = {
          message: CONSTANTS_CONFIG.MAPPER.LOGIN.LOGIN_SUCCESSFUL_MSG,
          data: user
        }
      }
    }
    return success
  } catch (error) {
    return false
  }
};

// Get all users details
UserService.prototype.getAllUsers = async (request) => {
  let user = {}
  user = await userDao.getAllUsers()

  if (user && user.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.FETCH_USER_FOUND_MSG,
      data: user
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.FETCH_USER_NOT_FOUND_MSG,
      data: user
    }
  }
  return success
};

// Get user details by id

UserService.prototype.getUserById = async (request) => {
  let user = {}
  const id = request.params.id
  user = await userDao.getUserById(id)

  if (user && user.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.FETCH_USER_FOUND_MSG,
      data: user
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.FETCH_USER_NOT_FOUND_MSG,
      data: user,
    }
  }
  return success
}

// Create user

UserService.prototype.createUser = async (request) => {

  const { password, first_name, middle_name, last_name, email, mobile, user_type, created_by } = request.body

  let user = {}
  user = await userDao.createUser(password, first_name, middle_name, last_name, email, mobile, user_type, created_by)

  if (user && user.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_USER.SUCCESS_MSG,
      data: user
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_USER.EXCEPTION_MSG,
      data: user
    }
  }
  return success
};

// Update user

UserService.prototype.updateUser = async (request) => {

  const { first_name, middle_name, last_name, email, mobile, user_type } = request.body
  let user = {}
  const id = request.params.id
  user = await userDao.updateUser(first_name, middle_name, last_name, email, mobile, user_type, id)

  if (user && user.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_USER.SUCCESS_MSG,
      data: user
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_USER.ERROR_MSG,
      data: user
    }
  }
  return success
}



// Delete user

UserService.prototype.deleteUser = async (request) => {
  let user = {}
  const id = request.params.id;
  user = await userDao.deleteUser(id);

  if (user && user.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_USER.SUCCESS_MSG,
      data: user
    }
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_USER.ERROR_MSG,
      data: user
    }
  }
  return success
}


module.exports = UserService
