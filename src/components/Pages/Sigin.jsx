import accessBanner from '../../assets/hacker-man-laptop.webp';
import LoginForm from '../Ui/LoginForm';
const Sigin = () => {
  return (
    <div className="flex justify-center items-center h-full grow">
      <div id="first" className="w-1/2 h-full flex flex-col grow items-end">
        <div className='w-full max-w-md mr-20 py-10'>
            <LoginForm />
        </div>
      </div>
      <div id='second' className="w-1/2 h-full flex flex-col grow bg-red-200">
        <img src={accessBanner} alt="Sign in Banner" className='access-bg' />
      </div>
    </div>
  );
};

export default Sigin;
