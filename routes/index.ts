import express from 'express'
import Gateway from '../api/Gateway'

const router = express.Router()

router.get('/', Gateway.index)

export default router