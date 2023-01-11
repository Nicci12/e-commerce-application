const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { passwordsMatch, isNewUser, hashPwd, isExistingUser, verifyPwd } = require("../middleware/usersMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { signUpSchema, loginSchema } = require("../schemas/allSchemas");

router.post("/signup", validateBody(signUpSchema), passwordsMatch, isNewUser, hashPwd, UsersController.signUp);


router.post("/login", validateBody(loginSchema), isExistingUser, verifyPwd,  UsersController.login);


module.exports = router;
