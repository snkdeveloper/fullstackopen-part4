const app = require('./app')
const config = require('./ok/config')
const logger = require('./ok/logger')
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
  