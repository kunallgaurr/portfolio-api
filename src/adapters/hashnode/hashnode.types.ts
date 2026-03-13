export enum HashnodeMode {
    POSTS = 'posts',
    PUBLISHER = 'publisher',
    TAG = 'tag',
    CATEGORY = 'category',
    SEARCH = 'search',
    USER = 'user',
    USER_FEED = 'user-feed',
    USER_FEED_POSTS = 'user-feed-posts',
    USER_FEED_POSTS_POSTS = 'user-feed-posts-posts',
    USER_FEED_POSTS_POSTS_POSTS = 'user-feed-posts-posts-posts',
    USER_FEED_POSTS_POSTS_POSTS_POSTS = 'user-feed-posts-posts-posts-posts',
}

export interface HashnodeParams {
    mode: HashnodeMode;
}