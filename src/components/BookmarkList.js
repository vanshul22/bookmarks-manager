import React, { useEffect, useState } from 'react';
import AddBookmark from './AddBookmark';
import { fetchBookmark } from '@/utils/fetchFuncs';

function BookmarkList({ category, categories, setCategories }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [expandedBookmarkId, setExpandedBookmarkId] = useState(null);

    async function fetchBookmarks() {
        try {
            const bookmarks = await fetchBookmark(category);
            // console.log("book", bookmarks)
            setBookmarks(bookmarks);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    }

    useEffect(() => {

        fetchBookmarks();

    }, []);


    return (
        bookmarks.length !== 0 ?
            <section id={`bookmark-list-${category}`}>
                <div className="py-10 px-10">
                    <div className="flex justify-between">
                        <div></div>
                        <h3 className="text-4xl text-center font-semibold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <AddBookmark categories={categories} setBookmarks={setBookmarks} setCategories={setCategories} />
                    </div>
                    <div>
                        <div className="grid sm:grid-cols-5 gap-4">
                            {bookmarks.map((bookmark, index) => (
                                <div key={index} className="bg-white rounded-lg shadow p-4">
                                    <h5 className="text-lg font-semibold mb-1">
                                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" >
                                            {bookmark.title}
                                        </a>
                                    </h5>
                                    <p className="text-gray-600">{expandedBookmarkId === bookmark.id ? bookmark.desc : null}</p>
                                    {expandedBookmarkId !== bookmark.id && (
                                        <button className="text-blue-600 hover:underline mt-2 block" onClick={() => setExpandedBookmarkId(bookmark.id)}> Read Description
                                        </button>
                                    )}
                                    {expandedBookmarkId === bookmark.id && (
                                        <button className="text-blue-600 hover:underline mt-2 block" onClick={() => setExpandedBookmarkId(null)} >
                                            Collapse Description
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            : <></>
    );
}

export default BookmarkList;