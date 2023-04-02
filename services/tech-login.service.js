const { techUser } = require("../models/tech-login.model");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function loginTech({ email, password }, callback) {
    const techUserModel = await techUser.findOne({ email });

    if (techUserModel != null) {
        if (bcrypt.compareSync(password, techUserModel.password)) {
            const token = auth.generateAccessToken(techUserModel.toJSON());
            return callback(null, { ...techUserModel.toJSON(), token });
        } else {
            return callback({
                message: "Invalid Email/Password"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Email/Password"
        });
    }
}

async function registerTech(params, callback) {
    if (params.email === undefined) {
        return callback({
            message: "Email Required!"
        });
    }
    // let isTechExist = await techUser.findOne({ techID: params.techID });
    // if (isTechExist) {
    //     return callback({
    //         message: "Technician Account Already Exist"
    //     });
    // }
    let isUserExist = await techUser.findOne({ email: params.email });

    if (isUserExist) {
        return callback({
            message: "Email is already registered"
        });
    }

    const salt = bcrypt.genSaltSync(10);
    params.password = bcrypt.hashSync(params.password, salt);

    const techuserSchema = new techUser(params);
    techuserSchema.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getTechUsers(params, callback) {
    const techName = params.techName;
    var condition = techName ? { techName: { $regex: new RegExp(techName), $options: "i" } }

        : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
    let page = (Math.abs(params.page) || 1) - 1;


    techUser
        .find(condition, "techName email")
        .limit(perPage).skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });


}
module.exports = {
    registerTech,
    loginTech,
    getTechUsers


};