import { ApiError } from "./errorHandler.js"


export const urlVersioning = (version) => (req, res, next) =>{
    if(req.path.startsWith(`/api/${version}`)) {
        next()
    } else {
        next(new ApiError(400, `This route is not available in version ${version}`))
    }
}

export const headerVersioning = (version) => (req, res, next) => {
    if(req.get["Accept-Version"] === version) {
        next()
    } else {
        next(new ApiError(400, `This route is not available in version ${version}`))
    }
}

export const contentTypeVersioning = (version) => (req, res, next) => {
    const contentType = req.get["Content-Type"]

    if(contentType && contentType.includes(`application/vnd.app-v${version}+json`)) {
        next()
    } else {
        next(new ApiError(400, `This route is not available in version ${version}`))
    }
}