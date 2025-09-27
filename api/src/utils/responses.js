export const client_response = (res, status, message, data = undefined) => {
    res.status(status).json({ message, data });
}

//Set cookie
export const set_cookie = (res, refresh_token) => {
    console.log(process.env.NODE_ENV, refresh_token);
    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 14 * 24 * 60 * 60 * 1000,
        path: '/'
    });
}

export const remove_cookies = (res) => {
    res.clearCookie('refresh_token');
}