import express from 'express';

import {
  registerUser,
  tokenLogin,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
} from '../controllers/user.controller';

const router = express.Router();

router.route('/user').post(registerUser);
router.route('/user/verify').post(verifyUser);
router.route('/user/login').post(login);
router.route('/user/forgotPassword').post(forgotPassword);
router.route('/user/resetPassword').post(resetPassword);
router.route('/user/tokenLogin').post(tokenLogin).get(tokenLogin);

// router.route('/collect').get(dailyReward);
// router.route('/user/landingEmail').post(emailLogin);
// router.route('/user/LandingForm').post(landingForm).get(landingGet);
// router.route('/user/general').put(general);
// router.route('/user/change-password').put(changePassword);
// router.route('/user/forgotPassword').post(forgotPassword);
// router.route('/week').post(weekly);
// router.route('/month').post(monthly);
// router.route('/year').post(yearly);
// router.route('/ApplyForAstro').post(ApplyForAstro);
// router.route('/tokenLogin').post(tokenLogin);
// router.route('/taro').post(taro);
// router.route('/forgotPassword').post(forgotPassword);
// router.route('/resetPassword').post(resetPassword);
// router.route('/AcceptAstroRequest').post(AcceptAstroRequest);
// router.route('/RejectAstroRequest').post(RejectAstroRequest);
// router.route('/GetAstrologerRequest').get(GetAstrologerRequest);
// router.route('/GetAstrologers').get(GetAstrologers);
// router.route('/GetAstrologer/:id').get(GetAstrologer);
// router.route('/Search').post(Search);
// router.route('/update').post(Update);
// router.route('/allUserGet').get(allUserGet);
// router.route('/ApplyForWorker').post(ApplyForWorker);
// router.route('/GetVendors').post(GetVendors);
// router.route('/Approved').post(Approved);
// router.route('/search').post(search);
// router.route('/offerCancel').post(offerCancel);
// router.route('/offerSuccess').post(offerSuccess);

export default router;
