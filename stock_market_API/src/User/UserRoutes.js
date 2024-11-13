"use strict";
import express from "express";
import { validate } from "express-validation";
import { userValidation } from "../../validations/userValidation.js";

const UserRoutes = (userController) => {
  const router = express.Router();

  router.post("/register", validate(userValidation.register), (req, res) =>
    userController.register(req, res)
  );

  router.post("/login", validate(userValidation.login), (req, res) =>
    userController.login(req, res)
  );

  router.get("/get-username/:username", (req, res) =>
    userController.getUserByUsername(req, res)
  );

  router.get("/get-leaderboards", (req, res) =>
    userController.getUserLeaderboards(req, res)
  );

  return router;
};

export default UserRoutes;
