import { Routes } from '@interfaces/routes.interface';
import express, { Router } from 'express';
import { WebhookController } from '@/controllers/webhook.controller';

export class WebhookRoute implements Routes {
  public path = '/webhook';
  public router = Router();
  public webhook = new WebhookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, express.raw({ type: 'application/json' }), this.webhook.post);
  }
}
