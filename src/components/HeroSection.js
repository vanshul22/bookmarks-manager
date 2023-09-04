import React from 'react'

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 h-screen flex flex-col justify-center items-center p-8 text-white">
            <div className="max-w-md text-center">
                <h2 className="text-4xl font-semibold mb-4">Welcome to Bookmarks App</h2>
                <p className="text-lg mb-8">Explore your favorite bookmarks easily.</p>
                <button
                    className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                    onClick={() => {
                        const section = document.getElementById('bookmark-list');
                        section.scrollIntoView({ behavior: 'smooth' });
                    }} > Get Started
                </button>
            </div>
        </section>
    )
}

export default HeroSection;