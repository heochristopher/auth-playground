import express from 'express'
import {getUsers, createUser, login, updateUsers, deleteUser, post} from '../middleware/userMiddleware'
import {requiresAuth} from '../middleware/token'
const router = express.Router()

router.get('/', getUsers)
router.post('/register', createUser)
router.post('/login', login)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)
router.post('/post', requiresAuth, post)
// router.get('/profile', getProfile)

export {router}