import { createContainer, asClass } from "awilix";
import UserRepo from "./src/User/UserRepo.js";
import UserService from "./src/User/UserService.js";
import UserController from "./src/User/UserController.js";

import CompanyRepo from "./src/Company/CompanyRepo.js";
import CompanyService from "./src/Company/CompanyService.js";
import CompanyController from "./src/Company/CompanyController.js";

import StocksHistoryRepo from "./src/StocksHistory/StocksHistoryRepo.js";
import StocksHistoryService from "./src/StocksHistory/StocksHistoryService.js";
import StocksHistoryController from "./src/StocksHistory/StocksHistoryController.js";

import UserStocksRepo from "./src/UserStocks/UserStocksRepo.js";
import UserStocksService from "./src/UserStocks/UserStocksService.js";
import UserStocksController from "./src/UserStocks/UserStocksController.js";

import TransactionRepo from "./src/Transaction/TransactionRepo.js";

import UserProfitRepo from "./src/UserProfit/UserProfitRepo.js";
import UserProfitService from "./src/UserProfit/UserProfitService.js";
import UserProfitController from "./src/UserProfit/UserProfitController.js";
const container = createContainer();

container.register({
  userRepo: asClass(UserRepo).scoped(),
  userService: asClass(UserService).scoped(),
  userController: asClass(UserController).scoped(),

  companyRepo: asClass(CompanyRepo).scoped(),
  companyService: asClass(CompanyService).scoped(),
  companyController: asClass(CompanyController).scoped(),

  stocksHistoryRepo: asClass(StocksHistoryRepo).scoped(),
  stocksHistoryService: asClass(StocksHistoryService).scoped(),
  stocksHistoryController: asClass(StocksHistoryController).scoped(),

  userStocksRepo: asClass(UserStocksRepo).scoped(),
  userStocksService: asClass(UserStocksService).scoped(),
  userStocksController: asClass(UserStocksController).scoped(),

  transactionRepo: asClass(TransactionRepo).scoped(),

  userProfitRepo: asClass(UserProfitRepo).scoped(),
  userProfitService: asClass(UserProfitService).scoped(),
  userProfitController: asClass(UserProfitController).scoped(),
});

export default container;
