import express from "express";
import projectsController from "#src/controllers/projectsController";
import authGard from "#src/middleware/authGard";

const router = express.Router();

router.get("/", projectsController.allProjects);

router.use(authGard.protect);

router.use((req, res, next) => {
  if (!req.isAdmin) {
    return res
      .status(403)
      .send("Forbidden: Only admins can perform this action");
  }
  next();
});

router.post(
  "/",
  exposeMiddleware.protect,
  (req, res, next) => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  },
  projectsController.createProject
);
router.put(
  "/:id",
  exposeMiddleware.protect,
  (req, res, next) => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  },
  projectsController.updateProject
);
router.patch(
  "/:id",
  exposeMiddleware.protect,
  (req, res, next) => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  },
  projectsController.patchProject
);

router.get(
  "/:id",
  exposeMiddleware.protect,
  (req, res, next) => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  },
  projectsController.oneProject
);

export default router;
