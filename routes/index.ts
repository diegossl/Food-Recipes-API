import express, { Router } from 'express'
import RecipeController from '../api/RecipeController'

const router: Router = express.Router()

router.get('/', RecipeController.getAllRecipes)

export default router