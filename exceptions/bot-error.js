module.exports = class BotError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);

        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors = []) {
        return new BotError(400, message, errors);
    }
}