import { rest } from 'msw';
import { setToken, getToken } from '@/utils/token';

export const handlers = [
    rest.get('/api/status', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'ok',
            }),
        );
    }),
    rest.post('/api/login', (req, res, ctx) => {
        const token = Math.random().toString(16).slice(2);
        setToken(token);

        return res(
            // Respond with a 200 status code
            ctx.json({
                code: 0,
                status: 200,
                msg: 'Login Success',
                data: {
                    expire: -1,
                    token: Math.random().toString(16).slice(2),
                },
            }),
        );
    }),
    rest.get('/api/user', (req, res, ctx) => {
        const isAuthenticated = getToken();
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.status(403),
                ctx.json({
                    code: -1,
                    status: 403,
                    msg: 'Not authorized',
                }),
            );
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                status: 200,
                msg: 'Login Success',
                data: {
                    username: 'admin',
                },
            }),
        );
    }),
];
