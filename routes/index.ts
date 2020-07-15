import express, { Router } from 'express'
import SerieController from '../api/SerieController'

const router: Router = express.Router()

router.get('/', SerieController.getSeries)

export default router