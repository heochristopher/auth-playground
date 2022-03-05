import express from 'express'
import {getUsers, createUser} from '../middleware/userMiddleware'
const router = express.Router()

router.get('/', getUsers)

router.post('/register', createUser)

export {router}