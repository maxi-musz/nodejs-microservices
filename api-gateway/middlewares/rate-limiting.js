import rateLimit from 'express-rate-limit';

export const createBasiRateLimiter = (maxRequests, time) => {
    return rateLimit({
        max: maxRequests,
        windowMs: time,
        message : "Too many requests, please try again later",
        headers : true,
        standardHeaders: true,
        legacyHeaders: true,
})}