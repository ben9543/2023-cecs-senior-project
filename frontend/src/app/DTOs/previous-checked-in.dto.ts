export interface PreviousCheckIn{
    survey_id: string,
    studyspot_name: string,
    user_id: string,
    survey_crowdednes_level: number,
    survey_noise_level: number,
    survey_wifi: number,
    survey_created_at: string,
    checked_out: boolean
}