
import QueryBuilder from "../../../builder/QueryBuilder";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import { AboutUs, Cuisine, Faq, HelpSupport, PrivacyPolicy, Restaurant, TermsConditions, Vibe } from "./dashboard.model";
import { ICoordinates, ICuisine, IRestaurant, IVibe } from "./dsashbaord.interface";
import { logger } from "../../../shared/logger";
import { Transaction } from "../payment/payment.model";
import httpStatus from "http-status";

// ===========================================
const getYearRange = (year: any) => {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    return { startDate, endDate };
};

const totalCount = async () => {

    const totalIncome = await Transaction.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
            },
        },
    ]);

    const totalUsers = await User.countDocuments();
    // const totalRecipe = await Recipe.countDocuments();

    return {
        totalIncome: totalIncome.length > 0 ? totalIncome[0].total : 0,
        totalUsers,
        // totalRecipe
    };
};

//     try {
//         const currentYear = new Date().getFullYear();
//         const selectedYear = year || currentYear;

//         const { startDate, endDate } = getYearRange(selectedYear);

//         const monthlySubscriptionGrowth = await Subscription.aggregate([
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: startDate,
//                         $lt: endDate,
//                     },
//                 },
//             },
//             {
//                 $group: {
//                     _id: {
//                         month: { $month: '$createdAt' },
//                         year: { $year: '$createdAt' },
//                     },
//                     count: { $sum: 1 },
//                 },
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     month: '$_id.month',
//                     year: '$_id.year',
//                     count: 1,
//                 },
//             },
//             {
//                 $sort: { month: 1 },
//             },
//         ]);

//         const months = [
//             'Jan',
//             'Feb',
//             'Mar',
//             'Apr',
//             'May',
//             'Jun',
//             'Jul',
//             'Aug',
//             'Sep',
//             'Oct',
//             'Nov',
//             'Dec',
//         ];

//         const result = Array.from({ length: 12 }, (_, i) => {
//             const monthData = monthlySubscriptionGrowth.find(
//                 data => data.month === i + 1,
//             ) || { month: i + 1, count: 0, year: selectedYear };
//             return {
//                 ...monthData,
//                 month: months[i],
//             };
//         });

//         return {
//             year: selectedYear,
//             data: result,
//         };
//     } catch (error) {
//         console.error('Error in getMonthlySubscriptionGrowth function: ', error);
//         throw error;
//     }
// };

const getMonthlyUserGrowth = async (year?: number) => {
    try {
        const currentYear = new Date().getFullYear();
        const selectedYear = year || currentYear;

        const { startDate, endDate } = getYearRange(selectedYear);

        const monthlyUserGrowth = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    year: '$_id.year',
                    count: 1,
                },
            },
            {
                $sort: { month: 1 },
            },
        ]);

        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        const result = [];
        for (let i = 1; i <= 12; i++) {
            const monthData = monthlyUserGrowth.find(data => data.month === i) || {
                month: i,
                count: 0,
                year: selectedYear,
            };
            result.push({
                ...monthData,
                month: months[i - 1],
            });
        }

        return {
            year: selectedYear,
            data: result,
        };
    } catch (error) {
        logger.error('Error in getMonthlyUserGrowth function: ', error);
        throw error;
    }
};

// ===========================================
const getAllUser = async (query: any) => {
    const { page, limit, searchTerm } = query;

    if (query?.searchTerm) {
        delete query.page;
    }
    const userQuery = new QueryBuilder(User.find()
        , query)
        .search(["name", "email"])
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();

    console.log(result)

    return { result, meta };

};

// Adds ===================================
const cuisineInsertIntoDB = async (files: any, payload: ICuisine) => {
    if (!files?.image) {
        throw new ApiError(400, 'File is missing');
    }

    if (files?.image) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }


    if (!payload?.title) {
        throw new ApiError(400, 'Title is missing');
    }

    return await Cuisine.create(payload);
};

const allCuisine = async (query: Record<string, unknown>) => {
    const addsQuery = new QueryBuilder(Cuisine.find(), query)
        .search(['title'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await addsQuery.modelQuery;
    const meta = await addsQuery.countTotal();

    return {
        meta,
        data: result,
    };
};

const updateCuisine = async (req: any) => {
    const { files } = req as any;
    const id = req.params.id;
    const { ...CuisineData } = req.body;

    console.log("CuisineData", CuisineData)

    if (files && files.image) {
        CuisineData.image = `/images/image/${files.image[0].filename}`;
    }

    const isExist = await Cuisine.findOne({ _id: id });

    if (!isExist) {
        throw new ApiError(404, 'Cuisine not found !');
    }

    const result = await Cuisine.findOneAndUpdate(
        { _id: id },
        { ...CuisineData },
        {
            new: true,
        },
    );
    console.log("result", result)
    return result;
};

const deleteCuisine = async (id: string) => {
    const isExist = await Cuisine.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError(404, 'Cuisine not found !');
    }
    return await Cuisine.findByIdAndDelete(id);
};

// Vibe ===================================
const createVibeIntoDB = async (files: any, payload: IVibe) => {
    if (!files?.image) {
        throw new ApiError(400, 'File is missing');
    }

    if (files?.image) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    if (!payload?.name) {
        throw new ApiError(400, 'Name is missing');
    }

    return await Vibe.create(payload);
}

const updateVibes = async (req: any) => {
    const { files } = req as any;
    const id = req.params.id;
    const { ...VibesData } = req.body;

    console.log("VibesData", VibesData)

    if (files && files.image) {
        VibesData.image = `/images/image/${files.image[0].filename}`;
    }

    const isExist = await Vibe.findOne({ _id: id });

    if (!isExist) {
        throw new ApiError(404, 'Adds not found !');
    }

    const result = await Vibe.findOneAndUpdate(
        { _id: id },
        { ...VibesData },
        {
            new: true,
        },
    );
    console.log("result", result)
    return result;
};

const allVibes = async (query: Record<string, unknown>) => {
    const addsQuery = new QueryBuilder(Vibe.find(), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await addsQuery.modelQuery;
    const meta = await addsQuery.countTotal();

    return {
        meta,
        data: result,
    };
};

const deleteVibes = async (id: string) => {
    const isExist = await Vibe.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError(404, 'Adds not found !');
    }
    return await Vibe.findByIdAndDelete(id);
};

// =Faqs========================================
const addFaq = async (payload: any) => {

    if (!payload?.questions || !payload?.answer) {
        throw new Error("Question and answer are required");
    }

    return await Faq.create(payload);
};

const updateFaq = async (req: any) => {
    const id = req.params.id

    const payload = req.body
    if (!payload?.questions || !payload?.answer) {
        throw new Error("Question and answer are required");
    }

    const result = await Faq.findByIdAndUpdate(id, payload, { new: true });

    return result
};
const deleteFaq = async (req: any) => {
    const id = req.params.id
    return await Faq.findByIdAndDelete(id);
};
const getFaq = async () => {
    return await Faq.find();
};
// ==============
const addTermsConditions = async (payload: any) => {
    const checkIsExist = await TermsConditions.findOne();
    if (checkIsExist) {
        return await TermsConditions.findOneAndUpdate({}, payload, {
            new: true,
            runValidators: true,
        });
    } else {
        return await TermsConditions.create(payload);
    }
};

const getTermsConditions = async () => {
    return await TermsConditions.findOne();
};

const addHelpSupport = async (payload: any) => {
    const checkIsExist = await HelpSupport.findOne();
    if (checkIsExist) {
        return await HelpSupport.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await HelpSupport.create(payload);
    }
};

const getHelpSupport = async () => {
    const result = await HelpSupport.findOne();
    return result
};

const addAboutUs = async (payload: any) => {
    const checkIsExist = await AboutUs.findOne();
    if (checkIsExist) {
        return await AboutUs.findOneAndUpdate({}, payload, {
            new: true,
            runValidators: true,
        });
    } else {
        return await AboutUs.create(payload);
    }
};

const getAboutUs = async () => {
    const result = await AboutUs.findOne();
    return result
};

const addPrivacyPolicy = async (payload: any) => {
    const checkIsExist = await PrivacyPolicy.findOne();
    if (checkIsExist) {
        return await PrivacyPolicy.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await PrivacyPolicy.create(payload);
    }
};

const getPrivacyPolicy = async () => {
    return await PrivacyPolicy.findOne();
};

// ==========================
const createRestaurant = async (req: Request, payload: IRestaurant) => {
    const { files } = req as any;

    const coordinates = { lng: -77.0369, lat: 38.8075 }

    // const { coordinates } = payload as any;

    if (!coordinates.lng || !coordinates.lat) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Location coordinates are required.");
    }

    if (files?.cover_photo && files.cover_photo[0]) {
        payload.cover_photo = `/images/restaurant/${files.cover_photo[0].filename}`;
    }

    if (files?.gallery_photo && files.gallery_photo?.length) {
        payload.gallery_photo = files.gallery_photo.map((file: any) =>
            `/images/restaurant/${file.filename}`
        );
    }

    payload.locations = {
        type: 'Point',
        coordinates: [coordinates.lng, coordinates.lat],
    } as ICoordinates;

    const restaurant = await Restaurant.create(payload);

    return restaurant
};

const updateRestaurant = async (id: string, req: Request, payload: Partial<IRestaurant>) => {
    const { files } = req as any;

    if (files?.cover_photo && files.cover_photo[0]) {
        payload.cover_photo = `/images/restaurant/${files.cover_photo[0].filename}`;
    }

    if (files?.gallery_photo && files.gallery_photo?.length) {
        payload.gallery_photo = files.gallery_photo.map((file: any) =>
            `/images/restaurant/${file.filename}`
        );
    }

    if (payload.coordinates) {
        if (!payload.coordinates?.lng || !payload.coordinates?.lat) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Valid coordinates are required(Check lng and lat).");
        }

        payload.locations = {
            type: 'Point',
            coordinates: [payload.coordinates?.lng, payload.coordinates?.lat],
        } as ICoordinates;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!updatedRestaurant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found.');
    }

    return updatedRestaurant;
};

const deleteRestaurant = async (id: string) => {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found.');
    }

    return deletedRestaurant;
};



const getAllRestaurant = async (query: Record<string, unknown>) => {
    const restaurantQuery = new QueryBuilder(Restaurant.find(), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await restaurantQuery.modelQuery;
    const meta = await restaurantQuery.countTotal();

    return {
        meta,
        data: result,
    };
};

const allVibesWithoutPagination = async (query: Record<string, unknown>) => {
    console.log("query", query)
    const addsQuery = new QueryBuilder(Vibe.find(), query)
        .search(['name'])
        .filter()

    const result = await addsQuery.modelQuery;

    return {
        data: result,
    };
};

const allCuisineWithoutPagination = async (query: Record<string, unknown>) => {
    console.log("query", query)
    const addsQuery = new QueryBuilder(Cuisine.find(), query)
        .search(['name'])
        .filter()

    const result = await addsQuery.modelQuery;

    return {
        data: result,
    };
};
export const DashboardService = {
    totalCount,
    getAllUser,
    cuisineInsertIntoDB,
    allCuisine,
    updateCuisine,
    deleteCuisine,
    addFaq,
    updateFaq,
    deleteFaq,
    getFaq,
    addTermsConditions,
    getTermsConditions,
    addPrivacyPolicy,
    getPrivacyPolicy,
    getMonthlyUserGrowth,
    addHelpSupport,
    getHelpSupport,
    addAboutUs,
    getAboutUs,
    createVibeIntoDB,
    deleteVibes,
    allVibes,
    updateVibes,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
    getAllRestaurant,
    allVibesWithoutPagination,
    allCuisineWithoutPagination
};