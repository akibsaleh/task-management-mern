import { useContext, useState } from 'react';
import MediaLogin from './MediaLogin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProvider';
import { updateProfile } from 'firebase/auth';

const RegisterForm = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line no-unused-vars
  const { handleEmailPassSignup, setProfileInfo } = useContext(AuthContext);

  const handleOnSubmit = async (data) => {
    setShowSpinner(true);
    const { name, photo, email, password } = data;
    try {
      const userCredential = await handleEmailPassSignup(email, password);
      if (userCredential?.user?.auth?.currentUser?.email) {
        updateProfile(userCredential?.user?.auth?.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            if (userCredential?.user?.auth?.currentUser?.displayName && userCredential?.user?.auth?.currentUser?.photoURL) {
              setProfileInfo({ name: userCredential?.user?.auth?.currentUser?.displayName, email: userCredential?.user?.auth?.currentUser?.email, photo: userCredential?.user?.auth?.currentUser?.photoURL });
              navigate('/dashboard', { replace: true });
              toast.success('Registration successful');
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (err) {
      console.log(err);
      if (err.message === 'Firebase: Error (auth/email-already-in-use).') toast.error('This email is already registered. Please try with another valid email.');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-y-5 bg-white p-8 rounded shadow-lg"
    >
      <MediaLogin />
      {/* Name  */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={`input input-bordered w-full max-w-full ${errors.email && '!input-error'}`}
          {...register('name', {
            required: 'Full name is required',
          })}
        />
        {errors.name && (
          <p
            role="alert"
            className="text-sm text-error mt-1"
          >
            {errors.name?.message}
          </p>
        )}
      </div>
      {/* Email  */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`input input-bordered w-full max-w-full ${errors.email && '!input-error'}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p
            role="alert"
            className="text-sm text-error mt-1"
          >
            {errors.email?.message}
          </p>
        )}
      </div>
      {/* Password  */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={`input input-bordered w-full max-w-full ${errors.password && '!input-error'}`}
          {...register('password', {
            required: 'Password is required',
            validate: {
              atleast6Character: (value) => /^.{6,}$/.test(value) || 'Password must be at least 6 characters long',
              atleast1Uppercase: (value) => /^(?=.*[A-Z]).+$/.test(value) || 'Password must be at least 1 uppercase',
              atleast1lowercaser: (value) => /^(?=.*[a-z]).+$/.test(value) || 'Password must be at least 1 lowercase',
              atleast1lspecial: (value) => /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).+$/.test(value) || 'Password must be at least 1 special charecter',
            },
          })}
        />
        {errors.password && (
          <p
            role="alert"
            className="text-sm text-error mt-1"
          >
            {errors.password?.message}
          </p>
        )}
      </div>
      {/* Name  */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm mb-2"
        >
          Photo Url
        </label>
        <input
          type="text"
          name="photo"
          id="photo"
          className={`input input-bordered w-full max-w-full ${errors.email && '!input-error'}`}
          {...register('photo', {
            required: 'Photo is required',
          })}
        />
        {errors.photo && (
          <p
            role="alert"
            className="text-sm text-error mt-1"
          >
            {errors.photo?.message}
          </p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-outline btn-secondary text-lg"
        >
          Sign in {showSpinner && <span className="loading loading-spinner"></span>}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
