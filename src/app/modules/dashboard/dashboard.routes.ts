import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { DashboardController } from './dashboard.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = express.Router();

// =============================
router.get('/get_total_count',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DashboardController.totalCount,
);
router.get('/get_user_growth',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DashboardController.getMonthlyUserGrowth,
);
router.get('/top_restaurants',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DashboardController.getTopRestaurants,
);

// =============================
router.get('/get_all_user',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DashboardController.getAllUser,
);
// =Vibe =======================
router.post('/create-vibes',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  DashboardController.createVibeIntoDB,
);
router.get(
  '/all-vibes',
  DashboardController.allVibes,
);
router.patch(
  '/edit-vibes/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  DashboardController.updateVibes,
);
router.delete(
  '/delete-vibes/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DashboardController.deleteVibes,
);
// =Cuisine ====================
router.post('/create-cuisine',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  DashboardController.cuisineInsertIntoDB,
);
router.get(
  '/all-cuisine',
  DashboardController.allCuisine,
);
router.patch(
  '/edit-cuisine/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  DashboardController.updateCuisine,
);
router.delete(
  '/delete-cuisine/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DashboardController.deleteCuisine,
);
// ==============================
router.post('/add-faqs',
  DashboardController.addFaq,
);
router.patch('/update-faqs/:id',
  DashboardController.updateFaq,
);
router.delete('/delete-faqs/:id',
  DashboardController.deleteFaq,
);
router.get('/get-faqs',
  DashboardController.getFaq,
);
// ==============================
router.post('/add-rules',
  DashboardController.addTermsConditions,
);
router.get('/get-rules',
  DashboardController.getTermsConditions,
);
// ==============================
router.post('/addupdate_help_support',
  DashboardController.addHelpSupport,
);
router.get('/get_help_support',
  DashboardController.getHelpSupport,
);
// ==============================
router.post('/addupdate-privacy-policy',
  DashboardController.addPrivacyPolicy,
);
router.get('/get-privacy-policy',
  DashboardController.getPrivacyPolicy,
);
// ==============================
router.post('/addupdate-aboutus',
  DashboardController.addAboutUs,
);
router.get('/get_aboutus',
  DashboardController.getAboutUs,
);
// ==============================
router.post('/create_restaurant',
  uploadFile(),
  DashboardController.createRestaurant,
);
router.patch('/update_restaurant/:id',
  uploadFile(),
  DashboardController.updateRestaurant,
);
router.delete('/delete_restaurant/:id',
  DashboardController.deleteRestaurant,
);
router.get('/get_all_restaurant',
  DashboardController.getAllRestaurant,
);
router.get('/all_vibes_without_pagination',
  DashboardController.allVibesWithoutPagination,
);
router.get('/all_cuisine_without_pagination',
  DashboardController.allCuisineWithoutPagination,
);

router.get('/get_all_restaurants',
  DashboardController.getRestaurants,
);
router.get('/get_restaurant/:id',
  DashboardController.getRestaurantById,
);

// ==============================


export const DashboardRoutes = router;
