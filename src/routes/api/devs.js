import express from "express";
import devsController from "#src/controllers/devsController";
import exposeMiddleware from "#src/middleware/authGard";

const router = express.Router();

router.use(exposeMiddleware.protect);

router.get("/", devsController.allDevs);

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
  devsController.createDev
);

router.delete(
  "/:id",
  exposeMiddleware.protect,
  (req, res, next) => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  },
  devsController.deleteDev
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
  devsController.updateDev
);

export default router;
