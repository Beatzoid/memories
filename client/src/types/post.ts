export interface Post {
    _id?: string;
    creator: string;
    title: string;
    message: string;
    tags: string;
    selectedFile: string;
    createdAt?: string;
    likeCount?: number;
}
