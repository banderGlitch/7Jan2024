export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 py-3 px-6 border-t border-gray-800 bg-black z-10">
      <div className="container mx-auto text-center text-gray-400">
        <p>W3W | {currentYear} | All rights reserved.</p>
      </div>
    </footer>
  );
}