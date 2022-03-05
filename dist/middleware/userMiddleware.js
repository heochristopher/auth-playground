"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.getUsers = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User_1.User.find();
        res.json(Users);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //find an existing user
        let user = yield User_1.User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send("User already registered.");
        user = new User_1.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        user.password = yield bcryptjs_1.default.hash(user.password, 10);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (!existingUser) {
            console.log('email not registered');
        }
        const validPassword = yield bcryptjs_1.default.compareSync(password, existingUser.password);
        if (!validPassword) {
            console.log('not valid');
            return;
        }
        console.log('valid');
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
