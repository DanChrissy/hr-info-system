import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token: string) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp! > currentTime;
    } catch (error) {
        return false;
    }
};

export const decodeToken = (token: string) => {
    if (!token) return null;
    if (!isTokenValid(token)) return null;

    return jwtDecode(token);
}
