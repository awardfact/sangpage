var express = require('express');
var router = express.Router();


const joinRouter = require("./member/Join");
const LoginRouter = require("./member/Login");
const KakaoLoginRouter = require("./member/KakaoLogin");
const LogoutRouter = require("./member/Logout");
const MemberUpdate = require("./member/MemberUpdate");
const CommonRouter = require("./Common");



//라우터 연결 
router.use("/member/join", joinRouter);
router.use("/member/login", LoginRouter);
router.use("/member/kakao_login", KakaoLoginRouter);
router.use("/member/logout", LogoutRouter);
router.use("/member/member_update", MemberUpdate);
router.use("/common", CommonRouter);


module.exports = router;

