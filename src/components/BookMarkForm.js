// components/MyForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { db } from '@/setup/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { fetchBookmark, fetchCategory } from '@/utils/fetchFuncs';
import { toast } from 'react-toastify';
import { auth } from "@/setup/firebase";


const BookMarkForm = ({ toggleModal, categories, setCategories, setBookmarks, selectedBookmark }) => {
    const [categ, setCateg] = useState("");
    const initialValues = {
        title: selectedBookmark?.title || "",
        url: selectedBookmark?.url || "",
        desc: selectedBookmark?.desc || "",
        category: selectedBookmark?.category || "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters').max(45, 'Title must be at most 30 characters'),
        url: Yup.string().required('URL is required').min(3, 'URL must be at least 3 characters').max(200, 'URL must be at most 200 characters'),
        desc: Yup.string().required('Description is required').min(3, 'Description must be at least 3 characters').max(300, 'Description must be at most 300 characters'),
        category: Yup.string().required('Category is required'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        // Handle form submission here
        setSubmitting(true);
        try {
            // taking current user ID.
            const user = auth.currentUser;
            const userUID = user.uid;
            // Saving into DB
            if (selectedBookmark?.id) {
                await updateDoc(doc(db, 'bookmarks', selectedBookmark?.id), { ...values });
                toast.success("Successfully Updated Bookmark.", { style: { fontSize: "12px" } });
            } else {
                await addDoc(collection(db, "bookmarks"), { ...values });
                toast.success("Successfully Added Bookmark.", { style: { fontSize: "12px" } });
            }
            const bookmarkDataArray = await fetchBookmark(values.category);
            setBookmarks(bookmarkDataArray);
            toggleModal();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const onSubmitCategory = async () => {

        try {
            await addDoc(collection(db, "category"), { name: categ });
            const categoryDataArray = await fetchCategory()
            setCategories(categoryDataArray);
            setCateg("");
            toast.success("Successfully Added Category.", {
                style: { fontSize: "12px" },
            });
        } catch (error) {
            console.error('Error adding document: ', error);
            toast.error("unable to Add Category.", {
                style: { fontSize: "12px" },
            });
        }
    };


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="max-w-md mx-auto ">
                <div className="relative z-0 w-full mb-4 group">
                    <Field type="text" name="title" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
                        placeholder=" " required />
                    <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Bookmark Title </label>
                    <ErrorMessage name="title" component="div" className="text-red-600 text-xs mt-2" />
                </div>

                <div className="relative z-0 w-full mb-4 group">
                    <Field type="url" name="url" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
                        placeholder=" " required />
                    <label htmlFor="url" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Bookmark URL </label>
                    <ErrorMessage name="url" component="div" className="text-red-600 text-xs mt-2" />
                </div>

                <div className="relative z-0 w-full mb-4 group">
                    <Field type="text" name="desc" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
                        placeholder=" " required />
                    <label htmlFor="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Bookmark Description </label>
                    <ErrorMessage name="desc" component="div" className="text-red-600 text-xs mt-2" />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm mb-2 dark:text-gray-400 "> Category </label>
                    <Field as="select" id="category" name="category" required className="w-full bg-transparent outline-transparent p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500" >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (<option key={index} value={category.name}> {category.name.charAt(0).toUpperCase() + category.name.slice(1)} </option>))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-600 text-xs mt-2" />
                </div>

                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Submit </button>
                </div>

                <div className="bg-black my-10 text-white flex items-center justify-center">
                    <div className="bg-white h-px w-screen"></div>
                </div>

                <div className="relative z-0 w-full mb-8 group flex items-center">
                    <div className="flex-grow">
                        <input
                            type="text"
                            name="add_category"
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
                            placeholder=" "
                            value={categ}
                            onChange={e => setCateg(e.target.value)}
                        />
                        <label
                            htmlFor="add_category"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Category Name
                        </label>
                    </div>
                    <button onClick={onSubmitCategory} type="button" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ml-2"> Add category</button>
                </div>
            </Form>
        </Formik>
    );
};

export default BookMarkForm;
