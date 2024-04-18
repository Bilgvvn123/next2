import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyABAv1F82w-PRywW6UcppKbXHoHvNYCUlU",
	authDomain: "blog-83ab8.firebaseapp.com",
	projectId: "blog-83ab8",
	storageBucket: "blog-83ab8.appspot.com",
	messagingSenderId: "1023157075658",
	appId: "1:1023157075658:web:c68a3ff4919f69ae9efe33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
