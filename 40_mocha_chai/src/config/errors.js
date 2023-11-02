export default {
    auth: { message: "invalid credentials", status: "error", statusCode: 401 },
    forbidden: { message: "not allowed", status: "error", statusCode: 403 },
    adopted: { message: "already adopted", status: "error", statusCode: 400 }, 
    invalid: { message: "invalid params", status: "error", statusCode: 400 }, 
    incomplete: { message: "incomplete values", status: "error", statusCode: 400 }, 
    notFound: { message: "not found docs", status: "error", statusCode: 404 },
    notFoundOne: { message: "not found doc", status: "error", statusCode: 404 },
}