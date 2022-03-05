import express from 'express'
import {getUsers, createUser, login} from '../middleware/userMiddleware'
const router = express.Router()

router.get('/', getUsers)
router.post('/register', createUser)
router.post('/login', login)

export {router}