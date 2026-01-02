import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadImage = async (file: File): Promise<string> => {
  const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);

  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};
