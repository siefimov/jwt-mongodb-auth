const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        // check if password already exists
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`User with email '${email}' exists.`);
        }
        // hashing the password
        const hashPassword = await bcrypt.hash(password, 3);
        // create activation link
        const activationLink = uuid.v4();

        // store to DB email and encrypted password
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        // send user mail for activation
        await mailService.sendActiovationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async login() {}

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('None corrected activation link');
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();
