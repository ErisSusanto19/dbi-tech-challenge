export interface Influencer {
    id: number;
    imageUrl: string;
    name: string;
    instagramHandle: string;
    instagramUrl: string;
    followers: string;
    bookingUrl: string;
}

export interface Testimonial {
    name: string,
    role: string;
    imageUrl: string;
    rating: number;
    testimonial: string;
}

export interface InstagramProfileData {
    username: string;
    full_name: string;
    follower_count: number;
    following_count: number;
    media_count: number;
    is_private: boolean;
    is_spam_filtered: boolean;
}

export interface InstagramApiResponse {
    status: string;
    data: InstagramProfileData;
}