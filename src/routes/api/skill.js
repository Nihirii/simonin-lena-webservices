import express from "express";
import skillController from "#src/controllers/skillController";
import authGard from "#src/middleware/authGard";

const router = express.Router();

router.post(
  "/users/:userId/skills",
  authGard.protect,
  skillController.addSkillToUser
);

router.get(
  "/users/:userId/skills",
  authGard.protect,
  skillController.getDevSkills
);
router.patch(
  "/users/:userId/skills",
  authGard.protect,
  skillController.updateDevSkills
);
router.delete(
  "/users/:userId/skills",
  authGard.protect,
  skillController.removeSkillFromDev
);

export default router;
