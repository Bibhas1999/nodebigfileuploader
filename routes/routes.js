import express from 'express'   
import DefaultController from '../controllers/DefaultController.js'
const router = express.Router()

router.get('/',DefaultController.home)
router.get('/video',DefaultController.streamVideo)
router.get('/audio',DefaultController.streamAudio)
router.post('/upload/csv',DefaultController.uploadCSV)
router.post('/read-data',DefaultController.readData)

export default router