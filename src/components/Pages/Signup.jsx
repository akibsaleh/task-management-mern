import RegisterForm from '../Ui/RegisterForm';
import regBanner from '../../assets/registration-bg.webp';

const Signup = () => {
    return (
        <div className="flex">
        <div className="w-1/2 flex flex-col items-end">
          <div className='w-full max-w-md h-fit mr-20 py-20'>
              <RegisterForm />
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          <div style={{backgroundImage: `url(${regBanner})`}} className='w-full h-full max-w-full max-h-full block grow bg-cover bg-no-repeat bg-left-top' ></div>
        </div>
      </div>
    );
};

export default Signup;