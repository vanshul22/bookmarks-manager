import { db } from "@/setup/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchCategory = async () => {
    // Reference to the 'category' collection
    const categoryCollection = collection(db, 'category');

    // Fetch documents from the collection
    const querySnapshot = await getDocs(categoryCollection);

    // Use the map function to extract data from each document and store in an array
    const categoryDataArray = querySnapshot.docs.map((doc) => doc.data());

    // Return the array containing category data
    return categoryDataArray;
}

// Function to fetch bookmarks based on a specified category
export const fetchBookmark = async (category) => {
    // Reference to the 'bookmarks' collection
    const bookmarksCollection = collection(db, 'bookmarks');

    // Create a query to fetch documents where the 'category' field matches the specified category
    const querySnapshot = await getDocs(query(bookmarksCollection, where('category', '==', category)));

    // Extract data from each document and store it in an array
    const bookmarks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Return the array containing bookmark data
    return bookmarks;
}
