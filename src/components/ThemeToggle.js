// components/ThemeToggle.js
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-gray-800 text-white"
        >
            Toggle Theme
        </button>
    );
};

export default ThemeToggle;
