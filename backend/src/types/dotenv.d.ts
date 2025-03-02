declare module 'dotenv' {
    export function config(options?: { path?: string }): { parsed?: { [key: string]: string } };
}