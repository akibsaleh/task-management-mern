import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <Header />
      {/* children of root route renders here  */}
      <main className='flex flex-col flex-1 w-full'>
          <Outlet></Outlet>
      </main>
      <Footer />
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </div>
  );
};

export default Layout;
