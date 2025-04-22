import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes';

const router = express.Router();

const moduleRoutes = [
  // -- done
  {
    path: '/auth',
    route: AuthRoutes,
  },
  // -- progressing
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
