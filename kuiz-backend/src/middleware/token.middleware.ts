import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { tokenDecode } from "../token/token.service";
import { Request, Response } from "express";

export const tokenMiddleware = async (
  req: Request,
  res: Response<{ id: 1 }>,
  next: Function,
) => {
  if (req.headers.authorization) {
    Logger.log("tokenMiddleware");
    const userToken = tokenDecode(req.headers.authorization);
    res.locals.user = userToken;
  }
  next();
};
