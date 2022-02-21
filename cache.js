import * as SecureStore from "expo-secure-store";
export async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
}
export async function getToken(key) {
    return SecureStore.getItemAsync(key);
}
export const tokenCache = {
    getToken,
    saveToken,
};