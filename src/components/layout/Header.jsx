import Navigation from './Navigation';
export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 py-4 px-6 border-b border-gray-800 bg-black z-50"> {/* Added height and z-index */}
            <Navigation />
        </header>
    );
}