const bcrypt = require("bcryptjs");

const userModel = require('../database').models.user;

let create = (data, callback) => {
	const newUser = new userModel(data);
	newUser.save(callback);
};

let createIfNotExists = (data, callback) => {
	let newUser = new userModel(data);
	userModel.findOne({
		'email': data.email
	}).then((user) => {
		if (user && user._id) {
			throw new Error('User Already exists');
		}

		newUser.save(callback);
	}).catch((err) => {
		callback(err);
	});
};

//authenticate input against database
let authenticate = (email, password, callback) => {
	userModel.findOne({
			email: email
		})
		.exec(function (err, user) {
			if (err) {
				return callback(err);
			} else if (!user) {
				err = new Error('User not found.');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function (err, result) {
				if (result === true) {
					return callback(null, user);
				}

				return callback(new Error('Email/password is not correct, please try again!'), {});
			});
		});
};


let getOnlineUsers = (callback) => {
	userModel.find({
		'online': false
	}).then((results) => {
		callback(results);
	}).catch((err) => {
		callback(err);
	});
};


module.exports = {
	create,
	createIfNotExists,
	authenticate, 
	getOnlineUsers
};