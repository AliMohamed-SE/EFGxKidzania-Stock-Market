"use strict";
import express from "express";

const TransactionRoutes = (transactionController) => {
  const router = express.Router();

  router.get("/get-buy", (req, res) =>
    transactionController.getBuyTransactions(req, res)
  );

  router.get("/get-sell", (req, res) =>
    transactionController.getSellTransactions(req, res)
  );

  return router;
};

export default TransactionRoutes;
