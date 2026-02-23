const REDIS_KEYS = {
    QUOTES_CACHING: {
        KEY: 'quotes_caching',
        TTL: 60 * 60 * 24
    }
}

export const constants = {
    START_TIME: 8,
    END_TIME: 20,
    RATE_LIMIT_WINDOW: 2,
    RATE_LIMIT_MAX_REQUESTS: 3,
    REDIS_KEYS
}