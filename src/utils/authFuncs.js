import { auth } from '@/setup/firebase';

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

export const isLoggedIn = async () => {
    const user = await getCurrentUser();
    return user !== null;
};