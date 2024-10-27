import { createContainer, asClass } from "awilix";
import UserRepo from "./src/User/UserRepo.js";
import UserService from "./src/User/UserService.js";
import UserController from "./src/User/UserController.js";

const container = createContainer();

container.register({
  userRepo: asClass(UserRepo).scoped(),
  userService: asClass(UserService).scoped(),
  userController: asClass(UserController).scoped(),
});

export default container;
