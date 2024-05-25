const userDb = require("../model/user")
const { UserSchema, updateUserSchema, loginScehma } = require("../validators/allValidator")
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addUserData = async (req, res) => {
    try {
        const { error } = UserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 0,
                message: error.details[0].message
            });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const result = await userDb.create({
                uniqueId: uuidv4(),
                title: req.body.title,
                email: req.body.email,
                name: req.body.name,
                phonenumber: req.body.phonenumber,
                password: hashedPassword
            })
            return res.status(200).json({
                status: 1,
                message: "User Add Successfully",
                result
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        })
    }
}
exports.getAllUserData = async (req, res) => {
    try {
        const result = await userDb.find().sort("-createdAt")
        if (!result[0]) {
            return res.status(404).json({
                status: 0,
                message: "Data Not Founded"
            })
        } else {
            return res.status(200).json({
                status: 1,
                message: "All Data Founded Successfully",
                result
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        })
    }
}
exports.updateData = async (req, res) => {
    try {
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 0,
                message: error.details[0].message
            });
        } else {
            const result = await userDb.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                email: req.body.email,
                name: req.body.name,
                phonenumber: req.body.phonenumber
            }, { new: true })
            if (!result) {
                return res.status(404).json({
                    status: 0,
                    message: "Data Not Founded"
                })
            } else {
                return res.status(200).json({
                    status: 1,
                    message: "Data Updated Successfully",
                    result
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        })
    }
}
exports.deletedData = async (req, res) => {
    try {
        const result = await userDb.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({
                status: 0,
                message: "Data Not Founded"
            })
        } else {
            return res.status(200).json({
                status: 1,
                message: "Data Deleted Successfully",
                result
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        })
    }
}
exports.userlogin = async (req, res) => {
    try {
        const { error } = loginScehma.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 0,
                message: error.details[0].message
            });
        } else {
            let userResult = await userDb.findOne({ email: req.body.email });
            if (!userResult) {
                return res.status(404).json({
                    status: 0,
                    message: "Email Not found",
                });
            }
            let passCheck = bcrypt.compareSync(
                req.body.password,
                userResult.password
            );
            if (passCheck == false) {
                return res.status(401).json({
                    status: 0,
                    message: "Incorrect password.",
                });
            } else {
                let dataToken = {
                    _id: userResult._id,
                };
                let token = jwt.sign(dataToken, "12345678", {
                    expiresIn: "30d",
                });
                return res.status(200).json({
                    status: 1,
                    message: "Login Successfully.....",
                    responseResult: userResult,
                    token,
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        });
    }
};
exports.oneUserData = async (req, res) => {
    try {
        const result = await userDb.findById(req.params.id)
        if (!result) {
            return res.status(404).json({
                status: 0,
                message: "Data Not Founded"
            })
        } else {
            return res.status(200).json({
                status: 1,
                message: "All Data Founded Successfully",
                result
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString()
        })
    }
}