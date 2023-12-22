import { Link, useLocation } from 'react-router-dom';
import { RiUserReceived2Fill, RiUserAddFill, RiUserSharedFill } from 'react-icons/ri';
import Logo from './Ui/Logo';
import { useContext } from 'react';
import { AuthContext } from './Providers/AuthProvider';
import { toast } from 'react-toastify';

const Header = () => {
  const location = useLocation();
  const { loading, handleLogout } = useContext(AuthContext);

  const handleSignOut = () => {
    handleLogout()
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className={`w-full py-3 px-5 ${location !== '/' && 'bg-base-300'}`}>
      <div className="container mx-auto w-full flex justify-between items-center">
        <Link
          to={'/'}
          className="w-40"
        >
          <Logo color={'fill-primary'} />
        </Link>
        {loading ? (
          <div className="join space-x-0.5 uppercase">
            <Link
              className="btn btn-base-100 join-item inline-flex items-center"
              to={'/signin'}
            >
              <RiUserReceived2Fill className="text-base" />
              <span className="hidden md:inline-block tracking-wide">Sign In</span>
            </Link>
            <Link
              className="btn btn-base-100 join-item inline-flex items-center"
              to={'/signup'}
            >
              <RiUserAddFill className="text-base" />
              <span className="hidden md:inline-block tracking-wide">Sign Up</span>
            </Link>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-base-100"
            onClick={handleSignOut}
          >
            <RiUserSharedFill className="text-base" />
            <span className="hidden md:inline-block tracking-wide">Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
