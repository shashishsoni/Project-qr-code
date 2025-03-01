interface User {
    username: string;
    password: string;
}

const users: User[] = [];

export const registerUser = (username: string, password: string) => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        throw new Error('User already exists');
    }
    users.push({ username, password });
};

export const loginUser = (username: string, password: string) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        throw new Error('Invalid username or password');
    }
}; 