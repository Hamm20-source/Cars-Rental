import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import axios from "axios";
import { auth, database } from "./Firebase"; // Pastikan impor benar

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY; // API Key dari Firebase
const BASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const getToken = () => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

// 🔹 Fungsi untuk refresh token jika expired
export const refreshAuthToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Refresh token tidak ditemukan!");

    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }
    );

    const newToken = response.data.id_token;
    const newRefreshToken = response.data.refresh_token;
    const expirationTime = Date.now() + response.data.expires_in * 1000; // Simpan waktu expired baru

    // Simpan token yang diperbarui
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("token_expiration", expirationTime);

    console.log("Token diperbarui!");
    return newToken;
  } catch (error) {
    console.error("Gagal refresh token:", error.response?.data || error.message);
    return null;
  }
};

// 🔹 Fungsi untuk register user ke Firebase Auth + Realtime Database
export const signUpWithDatabase = async (name, email, password, role = "user") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const rentalsOwned = role === "owner" || role === "admin" ? [] : null;

    await set(ref(database, `users/${user.uid}`), {
      id: user.uid,
      name,
      email,
      role,
      rentals_owned: rentalsOwned,
      created_at: new Date().toISOString(),
    });

    console.log("User berhasil didaftarkan!");
    return user;
  } catch (error) {
    console.error("Error saat register:", error.message);
    throw error;
  }
};

// 🔹 Fungsi untuk login user
export const loginWithDatabase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ambil token
    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken; // Ambil refresh token
    const expirationTime = Date.now() + 3600 * 1000; // Token berlaku 1 jam

    // Simpan ke localStorage
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("token_expiration", expirationTime);

    console.log("User yang login:", user);

    // Ambil data user dari Realtime Database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();

      // Simpan data user ke localStorage
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("name", userData.name || "Guest");
      localStorage.setItem("email", userData.email);
      localStorage.setItem("profileImage", userData.image || "");
      localStorage.setItem("location", userData.location || "No Location");
      localStorage.setItem("phone", userData.phone || "No Phone Number");
      localStorage.setItem("rentalsOwned", JSON.stringify(userData.rentals_owned || "Not Owner"));
      localStorage.setItem("role", userData.role || "user");

      console.log("Login Berhasil!");
      return accessToken;
    } else {
      console.log("Akun tidak ditemukan di database!");
      return null;
    }
  } catch (error) {
    console.error("Error Login:", error.message);
    throw error;
  }
};

// 🔹 Fungsi untuk logout
export const logout = async () => {
  try {
    await signOut(auth);
    
    // Hapus semua data dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token_expiration");
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("location");
    localStorage.removeItem("phone");
    localStorage.removeItem("rentalsOwned");
    localStorage.removeItem("role");

    console.log("Logout Berhasil!");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
