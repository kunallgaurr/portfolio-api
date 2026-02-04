export enum ZenQuotesMode { 
    QUOTES = 'quotes', 
    TODAY = 'today', 
    AUTHOR = 'author', 
    RANDOM = 'random',
}

export interface ZenQuotesParams {
    mode: ZenQuotesMode
}

