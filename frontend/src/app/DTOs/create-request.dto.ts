export interface CreateRequestDTO {
    user_id: string;
    studyspot_name: string;
    university_name: string;
    is_indoor: boolean;
    ada: boolean;
    power_outlets: boolean;
    easy_to_find: boolean;
    image_url: string;
    location: string;
    noise_level: number;
    crowdedness_level: number;
    strong_wifi: boolean;
    reason: string;
  }