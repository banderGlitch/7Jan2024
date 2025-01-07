import Navigation from './Navigation';
export default function Header() {
    return (
        <header className="h-16 py-4 px-6 border-b border-gray-800 bg-black z-10 relative"> {/* Added height and z-index */}
            <Navigation />
        </header>
    );
}