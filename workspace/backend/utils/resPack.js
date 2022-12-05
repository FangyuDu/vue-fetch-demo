const SUCCESS_CODE = 0
const DEFAULT_ERROR_CODE = 1 // 1 - 99

// res.success
const success = (data) => {
  return {
    code: 0,
    error: '',
    body: data,
  }
}

// res.error
const error = (message, code = DEFAULT_ERROR_CODE) => {
  return {
    code: code,
    error: message,
    body: ''
  }
}

export default {
  success,
  error
}
