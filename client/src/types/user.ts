export default interface IUser {
    id?: number | null; // It's better to use specific types instead of 'any' if possible
    username: string;
    password: string;
    roles?: string[]; // Use specific type 'string[]' instead of 'Array<string>'
}
