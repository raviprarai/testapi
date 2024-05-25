const router = require("express").Router();
const userRouter = require("../controller/userController");
router.post( "/addUserData", userRouter.addUserData);
router.get( "/getAllUserData", userRouter.getAllUserData);
router.put( "/updateData/:id", userRouter.updateData);
router.delete( "/deletedData/:id", userRouter.deletedData);
router.post( "/userlogin", userRouter.userlogin);
router.get( "/oneUserData/:id", userRouter.oneUserData);

module.exports = router;
