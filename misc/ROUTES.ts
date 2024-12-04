const isDev = process.env.NODE_ENV === 'development';

const ROUTES = {
    LOGIN: `${isDev && "/app"}/auth/login`,
};

export default ROUTES;