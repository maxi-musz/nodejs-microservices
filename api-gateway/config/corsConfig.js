import cors from "cors";

export const configureCors = () => {
    return cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:3000",
            ]

            if(!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },

        methods: ["GET", "POST", "PUT", "DELETE"],

        allowedHeaders: [
            "Content-Type",
            "Authorizatioon",
            "Accept-Version",
        ],

        exposedHeaders: [
            "Content-Range",
            "X-Content-Range",
        ],

        credentials: true,

        preflightContinue: false,

        maxAge: 600, // cache preflight responses for 10 minutes, helps to avoid sending options request multiple times

        optionsSuccessStatus: 204,
    })
}