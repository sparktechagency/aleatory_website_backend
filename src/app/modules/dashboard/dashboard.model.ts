import mongoose, { Model, Schema, Types } from "mongoose";
import { ICuisine, IComment, IReview, IVibe, ICoordinates, IRestaurant } from "./dsashbaord.interface";

const Coordinates = new Schema<ICoordinates>({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true,
        validate: {
            validator: function (arr: number[]) {
                return arr.length === 2;
            },
            message: 'Coordinates must be an array of two numbers (longitude, latitude).',
        },
    },
});


const CommentSchema = new Schema<IComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    replay: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    text: {
        type: String,
        required: true
    }
})

const ReviewSchema = new Schema<IReview>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    review: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    feedback: {
        type: String,
        required: true,
    },
});

const cuisineSchema = new Schema<ICuisine>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }
);

const vibeSchema = new Schema<IVibe>(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }
);

const faqSchema = new mongoose.Schema(
    {
        questions: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    },
);

const termsAndConditionsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
    }
);

const aboutUsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
    }
);

const helpSupportSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
    }
);

const privacyPolicySchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
    }
);

const restaurantsSchema = new Schema<IRestaurant>(
    {
        cover_photo: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cuisine: {
            type: Schema.Types.ObjectId,
            ref: 'Cuisine',
            required: true
        },
        vibe: {
            type: Schema.Types.ObjectId,
            ref: 'Vibe',
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        website_address: {
            type: String,
            required: true
        },
        open_hours: {
            type: String,
            required: true
        },
        price_range: {
            type: String,
            required: true
        },
        overview: {
            type: String,
            required: true
        },
        signature: {
            type: String,
            required: true
        },
        gallery_photo: {
            type: [String],
            required: true
        },
        locations: {
            type: Coordinates,
            required: true
        }
    },
    { timestamps: true }
);


const Comment: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);
const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>('Restaurant', restaurantsSchema);

const Review: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);
const Cuisine: Model<ICuisine> = mongoose.model<ICuisine>('Cuisine', cuisineSchema);
const Vibe: Model<IVibe> = mongoose.model<IVibe>('Vibe', vibeSchema);
const Faq = mongoose.model('Faq', faqSchema);
const TermsConditions = mongoose.model('TermsConditions', termsAndConditionsSchema);
const HelpSupport = mongoose.model('HelpSupport', helpSupportSchema);
const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);


export { Restaurant, Comment, Review, Cuisine, Faq, TermsConditions, PrivacyPolicy, HelpSupport, AboutUs, Vibe };


// enum: ["African", "American", "Asian", "Caribbean", "Chinese", "Cuban", "East-African", "Ethiopian", "European", "French", "German", "Greek", "Indian", "Irish", "Israeli", "Italian", "Jamaican", "Japanese", "Korean", "Latin-American", "Mediterranean", "Mexican", "Middle-Eastern", "Moroccan", "North-African", "Persian", "Peruvian", "Puerto-Rican", "Russian", "Spanish", "Tex-Mex", "Thai", "Vietnamese", "West-African"],
