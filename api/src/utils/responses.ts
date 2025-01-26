export const internal_response = (message: string, error?: any) => {
    console.log(`[INTERNAL RESPONSE] - Message: ${message}`);
    console.error(error);
};

export const client_response = (
    res: any,
    status: number,
    message: string,
    data?: any
) => {
    return res.status(status).json({
        message: message,
        data: data,
    });
};

export const set_cookies = (res: any, refresh_token: any) => {
    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
    });
};

export const remove_cookies = (res: any) => {
    res.clearCookie('refresh_token');
};
