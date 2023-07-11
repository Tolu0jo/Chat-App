import { Request, Response } from "express";
import {key, appId, secret} from '../config'
import Pusher from 'pusher'

const pusher = new Pusher({
    appId: appId,
    key: key,
    secret: secret,
    cluster: "eu",
    useTLS: true
  });

export const Chat = (req:Request, res:Response ) =>{
    pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
      });

      // Save messages

      res.status(201).json([])
}