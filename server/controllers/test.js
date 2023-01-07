const getTest = async (req, res, next) => {
  res.json({
    message: 'Test API is Working!',
  })
}

module.exports = {getTest}