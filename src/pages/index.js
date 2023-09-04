import HeroSection from '@/components/HeroSection'
import BookmarkList from '@/components/BookmarkList'
import { useEffect, useState } from 'react'
import { fetchCategory } from '@/utils/fetchFuncs'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { isLoggedIn } from '@/utils/authFuncs';
import Signin from '@/components/SignIn';
import ForgotPassword from '@/components/ForgotPassword';
import { auth, signOut } from "@/setup/firebase";


export default function Home() {
  const [screen, setScreen] = useState("");

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoryDataArray = await fetchCategory()
      setCategories(categoryDataArray);
      // console.log("fetch", categoryDataArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const checkLoginStatus = async () => {
    let loggedIn;
    // Checking if user is login or not.
    loggedIn = await isLoggedIn();
    if (!loggedIn) {
      setScreen("signin");
      console.log('User is not logged in:', loggedIn);
    } else {
      setScreen("home");
      fetchCategories();
      console.log('User is logged in:', loggedIn);
    }
  };

  const onClickLogout = async () => {
    try {
      await signOut(auth);
      // Sign-out successful.
      toast.success("User signed out successfully.");
      setScreen("signin");
    } catch (error) {
      // An error happened.
      toast.error("User unable to Signout");
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        screen === "home" ? (
          <>
            <HeroSection />
            <div id='bookmark-list'>
              {categories.length !== 0 ? categories.map((category, index) => (
                <BookmarkList key={index} category={category.name} categories={categories} />
              )) : <></>}
            </div>
          </>
        ) : screen === "signin" ? (
          <Signin setScreen={setScreen} fetchCategories={fetchCategories} />
        ) : screen === "forgot" ? (
          <ForgotPassword setScreen={setScreen} />
        ) : null
      }
      <footer className="flex justify-around bg-gray-900 text-gray-300 py-2">
        <div></div>
        <div>
          <p className='text-sm'>&copy; 2023. All Rights Reserved. Created by <a className='text-indigo-600 hover:text-white' href={`mailto:vkvanshulkesharwani54@gmail.com`}>Vanshul Kesharwani</a></p>
        </div>
        <div>
          {screen !== "signin" && screen !== "forgot" && (
            <button
              onClick={onClickLogout}
              className='hover:animate-bounce focus:animate-none bg-gradient-to-r from-blue-600 to-purple-600 focus:text-white bg-clip-text text-transparent'>
              LogOut
            </button>
          )}
        </div>
      </footer>
      <ToastContainer theme="dark" closeOnClick />
    </>
  )
}
