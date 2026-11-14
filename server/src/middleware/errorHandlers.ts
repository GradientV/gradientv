// where every error turns into a response
// routes just throw. Express 5 catches it (even from async functions) and
// skips straight to errorHandler, the one place an error becomes JSON
import type { NextFunction, Request, Response } from 'express';
import type { ErrorJSON } from '../../../shared/portal.js';

/** an error that already knows its status code */
export class HttpError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

/** what went wrong, in words, whatever was thrown */
export function messageOf(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

/** the extra fields errors from Express, its JSON reader and Mongoose can carry */
type ThrownError = Error & { status?: number; type?: string };

/** only reached when no route matched */
export function notFound(req: Request, _res: Response, next: NextFunction): void {
    next(new HttpError(404, `There is no ${req.method} ${req.originalUrl}`));
}

// Express spots an error handler by its four parameters, so _next has to stay
export function errorHandler(error: ThrownError, _req: Request, res: Response<ErrorJSON>, _next: NextFunction): void {
    let status = error.status ?? 500;
    let message = error.message;

    if (error.type === 'entity.parse.failed') {
        // express.json() couldn't read the body
        message = 'That request body is not valid JSON.';
    } else if (error.name === 'ValidationError') {
        // mongoose refused to save it (something missing, or too long)
        status = 400;
    } else if (error.name === 'CastError') {
        // an id that isn't even shaped like a Mongo id can't name anything
        status = 404;
        message = 'There is nothing with that id.';
    }

    if (status >= 500) {
        // details go in the server log, never to the browser
        console.error(error);
        message = 'Something went wrong on the server.';
    }

    // { error } is the shape the client's api.ts looks for
    res.status(status).json({ error: message });
}
