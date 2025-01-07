import Header from './Header';
import Footer from './Footer';
import WordList from './WordList';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-6 pr-72"> 
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <Footer />
      <WordList />
    </div>
  );
}