module.exports = class BotError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);

        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new BotError(401, 'User not authorized');
    }

    static BadRequest(message, errors = []) {
        return new BotError(400, message, errors);
    }
}