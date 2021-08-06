import firebase from "firebase/app";
import "firebase/storage";
import { upload } from "./upload.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYY4pqIT3Vz2F7YL4X4E5Gh5LsE2KwmKI",
  authDomain: "frontend-upload-1f762.firebaseapp.com",
  projectId: "frontend-upload-1f762",
  storageBucket: "frontend-upload-1f762.appspot.com",
  messagingSenderId: "247620249463",
  appId: "1:247620249463:web:a243f0eab0d4b528b52372",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload("#file", {
  multi: true,
  accept: [".png", ".jpg", ".jpeg", ".gif"],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`image/${file.name}`);
      const task = ref.put(file);
      task.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(
              0
            ) + "%";
          const block = blocks[index].querySelector(".preview-info-progress");
          block.textContent = percentage;
          block.style.width = percentage;
        },
        (error) => {
          console.log(error);
        },
        (complete) => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log("Download URL:", url);
          });
        }
      );
    });
  },
});
