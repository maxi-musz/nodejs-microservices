

export class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.name = "APIError";
        this.message = message;
    }
}

export const asynchandler = (fn) => async(req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error);
    });
}

export const globalErrorHandler = (err, req, res, next) => {
    console.log(`Global error handler called: ${err.stack}`);

    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            status: "error",
            statusCode: err.statusCode,
            message: err.message,
        });
    } 
    // mongoose error 
    else if(err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
            success: false,
            status: "error",
            statusCode: 400,
            message: messages,
        });
    } else {
        res.status(500).json({
            success: false,
            status: "error",
            statusCode: 500,
            message: err.message,
        });
    }


}

