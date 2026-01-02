import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const deleteImageByUrl = async (imageUrl: string) => {
  if (!imageUrl) return;

  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};
