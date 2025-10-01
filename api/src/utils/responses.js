export const client_response = (res, status, message, data = undefined) => {
    res.status(status).json({ message, data });
}