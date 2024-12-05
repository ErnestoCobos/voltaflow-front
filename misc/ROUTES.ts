const isDev = process.env.NODE_ENV === 'development';


const ROUTES = {
    LOGIN: `${isDev ? "/app" : ""}/auth/login`,
    SIGNUP: `${isDev ? "/app" : ""}/auth/signup`,
    FORGOT_PASSWORD: `${isDev ? "/app" : ""}/auth/forgot-password`,
};

export default ROUTES;