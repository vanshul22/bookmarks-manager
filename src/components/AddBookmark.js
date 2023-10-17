import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import BookMarkForm from './BookMarkForm';

const AddBookmark = ({ categories, setBookmarks, setCategories, selectedBookmark, setSelectedBookmark, isOpen, setIsOpen }) => {

    const toggleModal = () => {
        setSelectedBookmark({ id: 0, title: '', url: '', desc: '', category: '' });
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleModal} className="flex items-center justify-center gap-3">
                <BsFillBookmarkPlusFill size={30} className='px-1 rounded bg-gradient-to-r from-blue-600 to-purple-600' />
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={toggleModal}></div>
                    <div className={`modal-container w-[90%] max-w-screen-md`}>
                        <div className="modal-content bg-black  border border-white rounded-lg shadow-2xl shadow-slate-900">
                            <h3 className='text-center text-2xl font-extrabold text-gradient py-10' > Add Bookmark </h3>
                            <BookMarkForm toggleModal={toggleModal} categories={categories} setCategories={setCategories} setBookmarks={setBookmarks} selectedBookmark={selectedBookmark} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddBookmark;