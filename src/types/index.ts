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