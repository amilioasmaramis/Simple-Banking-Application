module.exports = (err, req, res, next) => {
  console.log(err, '<<<<<<<:ERROR MASUK DARI ERROR HANDLER')
  console.log(err.name, '<<<<<<:ERROR NAME')
  console.log(err.message, '<<<<<<<:ERROR MSG')
  let statusCode = 500
  let errorCode = 'Internal server error'
  let message = 'Unexpected error.'

  switch (err.name) {
    case 'error_400_username_email_password_empty':
      statusCode = 400
      errorCode = 'Validation error'
      message = 'Please enter username, email and password'
      break
      
    case 'error_400_email_password_empty':
      statusCode = 400
      errorCode = 'Validation error'
      message = 'Please enter email and password'
      break

    case 'error_400_wrong_email_password':
      statusCode = 400
      errorCode = 'Validation error'
      message = 'Wrong email or password'
      break

    case 'error_404_user_not_found':
      statusCode = 404
      errorCode = 'Not Found'
      message = 'Requested user was not found'
      break

    default:
      break
  }

  res.status(statusCode).json({ errorCode, message })
}
