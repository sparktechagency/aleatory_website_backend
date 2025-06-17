import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchasync';
import { DashboardService } from './dashboard.service';
import { ICuisine, IRestaurant, IVibe } from './dsashbaord.interface';

const totalCount: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardService.totalCount();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Get all count sucess!`,
      data: result,
    });
  },
);

const getMonthlyUserGrowth: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const year = req.query.year
      ? parseInt(req.query.year as string, 10)
      : undefined;
    const result = await DashboardService.getMonthlyUserGrowth(year);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Get all count success!`,
      data: result,
    });
  },
);

const getTopRestaurants: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardService.getTopRestaurants();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Get Top Restaurants!`,
      data: result,
    });
  },
);

// =User Management====================================
const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query as any;
    const result = await DashboardService.getAllUser(query as any);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Get all user!`,
      data: result,
    });
  },
);

// =Vibes Types Management======================================
// =Vibe Management==================================== 
const createVibeIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.createVibeIntoDB(req.files, req.body);
  sendResponse<IVibe>(res, {
    statusCode: 200,
    success: true,
    message: 'Vibe create successfully',
    data: result,
  });
});

const updateVibes = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.updateVibes(req);
  sendResponse<IVibe>(res, {
    statusCode: 200,
    success: true,
    message: 'Vibe update successfully',
    data: result,
  });
});

const allVibes = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.allVibes(req.query);
  sendResponse<IVibe[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Vibe Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteVibes = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.deleteVibes(req.params.id);
  sendResponse<IVibe>(res, {
    statusCode: 200,
    success: true,
    message: 'Vibes delete successfully',
    data: result,
  });
});

// =Cuisine Types Management=========================================================== 
const cuisineInsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.cuisineInsertIntoDB(req.files, req.body);
  sendResponse<ICuisine>(res, {
    statusCode: 200,
    success: true,
    message: 'Cuisine create successfully',
    data: result,
  });
});

const updateCuisine = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.updateCuisine(req);
  sendResponse<ICuisine>(res, {
    statusCode: 200,
    success: true,
    message: 'Cuisine update successfully',
    data: result,
  });
});

const deleteCuisine = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.deleteCuisine(req.params.id);
  sendResponse<ICuisine>(res, {
    statusCode: 200,
    success: true,
    message: 'Cuisine delete successfully',
    data: result,
  });
});

const allCuisine = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.allCuisine(req.query);
  sendResponse<ICuisine[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Cuisine Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// =FAQ==========================
const addFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.addFaq(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully create!',
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.updateFaq(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully Update!',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.deleteFaq(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully Delete!',
    data: result,
  });
});

const getFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getFaq();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully get!',
    data: result,
  });
});

// =Settings==========================
const addTermsConditions = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.addTermsConditions(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getTermsConditions = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getTermsConditions();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const addAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.addAboutUs(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getAboutUs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const addHelpSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.addHelpSupport(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getHelpSupport = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getHelpSupport();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const addPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.addPrivacyPolicy(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getPrivacyPolicy();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

// =Restaurant Management===============================
const createRestaurant = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body as IRestaurant;
  const result = await DashboardService.createRestaurant(req as any, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Successfully',
    data: result,
  });
});

const updateRestaurant = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body as IRestaurant;
  const id = req.params.id as string;
  const result = await DashboardService.updateRestaurant(id as string, req as any, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Successfully',
    data: result,
  });
});

const deleteRestaurant = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await DashboardService.deleteRestaurant(id as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Successfully',
    data: result,
  });
});

const getAllRestaurant = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as any;
  const result = await DashboardService.getAllRestaurant(query as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Successfully',
    data: result,
  });
});

const allVibesWithoutPagination = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.allVibesWithoutPagination(req.query);
  sendResponse<IVibe[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Vibe Retrieved successfully',
    data: result.data,
  });
});

const allCuisineWithoutPagination = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.allCuisineWithoutPagination(req.query);
  sendResponse<ICuisine[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Cuisine Retrieved successfully',
    data: result.data,
  });
});

// ===========================================
const getRestaurants = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getRestaurants(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved successfully',
    data: result,
  });
});

const getRestaurantById = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getRestaurantById(req.params?.id as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved successfully',
    data: result,
  });
});


// ================================


export const DashboardController = {
  getAllUser,
  cuisineInsertIntoDB,
  getTopRestaurants,
  updateCuisine,
  deleteCuisine,
  allCuisine,
  getFaq,
  deleteFaq,
  updateFaq,
  addFaq,
  addTermsConditions,
  getTermsConditions,
  addPrivacyPolicy,
  getPrivacyPolicy,
  totalCount,
  getMonthlyUserGrowth,
  addHelpSupport,
  getHelpSupport,
  addAboutUs,
  getAboutUs,
  createVibeIntoDB,
  deleteVibes,
  updateVibes,
  allVibes,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurant,
  allVibesWithoutPagination,
  allCuisineWithoutPagination,
  getRestaurants,
  getRestaurantById
};
