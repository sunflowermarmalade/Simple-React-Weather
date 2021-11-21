const path = require('path')

const express = require('express')
const favicon = require('serve-favicon')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(favicon(path.join(process.cwd(), 'favicon.ico')))
const axios = require('axios')

app.set('port', process.env.PORT || 9999)

app.enable('trust proxy')


// DarkSky API
app.use('/api/weather', async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query
    await axios.get(
      `https://api.darksky.net/forecast/API_KEY/${latitude},${longitude}?units=uk2`
    ).then(response => res.status(200).json(response.data)).catch(err => console.log("ERR: " + err))
  } catch (err) {
    next(err)
  }
})

// Add phone number
app.use('/api/addphone', async (req, res, next) => {
  try {
    const { phone, lat, long } = req.query
    
  } catch (err) {
    next(err)
  }
})

app.listen(
  app.get('port'),
  () => console.log(`Server is listening at port ${app.get('port')}`)
)
