// components/Layout.js
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('light', 'dark');
        html.classList.add(theme);
    }, [theme]);

    return (
        <div className="min-h-screen">
            <nav className="p-4 bg-gray-100">
                <ThemeToggle />
            </nav>
            <main className="p-8">{children}</main>
        </div>
    );
};

export default Layout;
