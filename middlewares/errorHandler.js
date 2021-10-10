module.exports = (err, req, res, next) => {
  const code = err.statusCode || 500
  const message = err.message || 'Something went wrong'
  res.render('error', { error: { code, message } })
}
