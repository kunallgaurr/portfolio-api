export interface RecieveMailParams {
    name: string;
    email: string;
    message: string;
}

export interface GetAllMessagesParams {
    pageNumber?: number;
    pageSize?: number;
    type?: string;
    q?: string;
}