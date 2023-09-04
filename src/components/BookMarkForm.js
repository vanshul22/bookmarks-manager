// components/MyForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { db } from '@/setup/firebase';
import { collection, addDoc } from "firebase/firestore";
import { fetchBookmark, fetchCategory } from '@/utils/fetchFuncs';
import { toast } from 'react-toastify';


const BookMarkForm = ({ toggleModal, categories, setBookmarks }) => {
    const initialValues = {
        title: '',
        url: '',
        desc: '',
        category: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters').max(45, 'Title must be at most 30 characters'),
        url: Yup.string().required('URL is required').min(3, 'URL must be at least 3 characters').max(200, 'URL must be at most 200 characters'),
        desc: Yup.string().required('Description is required').min(3, 'Description must be at least 3 characters').max(100, 'Description must be at most 100 characters'),
        category: Yup.string().required('Category is required').min(3, 'Category must be at least 3 characters').max(45, 'Category must be at most 45 characters'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        // Handle form submission here
        setSubmitting(true);
        try {
            await addDoc(collection(db, "bookmarks"), values);
            const bookmarkDataArray = await fetchBookmark(values.category);
            setBookmarks(bookmarkDataArray);
            toast.success("Successfully Added Bookmark.");
            toggleModal();

        } catch (error) {
            console.error('Error adding document: ', error);
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
                        <Field
                            type="text"
                            name="add-category"
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="add-category"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Add Category
                        </label>
                        <ErrorMessage name="add-category" component="div" className="text-red-600 text-xs mt-2" />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ml-2"> Add category</button>
                </div>
            </Form>





        </Formik>
    );
};

export default BookMarkForm;
