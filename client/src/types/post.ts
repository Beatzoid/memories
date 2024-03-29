export interface Post {
    _id?: string;
    creator?: string;
    name?: string;
    title: string;
    message: string;
    tags: string[];
    selectedFile: string;
    likes: any[];
    createdAt?: string;
}
