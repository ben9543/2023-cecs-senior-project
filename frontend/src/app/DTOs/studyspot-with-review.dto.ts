export interface Review{
    review_comments: string;
    review_id: number;
    review_rate: number;
    studyspot_name: string;
    user_id: number;
};

export interface StudyspotDetails{
    reviews: Review[];
    studspot_crowdedness_level: number;
    studyspot_ada: boolean;
    studyspot_easy_to_find: boolean;
    studyspot_image_url: string;
    studyspot_is_indoor: boolean;
    studyspot_location: string;
    studyspot_name: string;
    studyspot_noise_level: number;
    studyspot_power_outlets: boolean;
    studyspot_rating: number;
    studyspot_strong_wifi: boolean;
};