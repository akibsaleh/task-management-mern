import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MediaLogin from './MediaLogin';
import { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [showSpinner, setshowSpinner] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleEmailPassSignin } = useContext(AuthContext);

  const handleOnSubmit = (data) => {
    setshowSpinner(true);
    const { email, password } = data;
    handleEmailPassSignin(email, password).then((useCred) => {
      if (useCred.user) {
        setshowSpinner(false);
        navigate('/dashboard');
        toast.success('Logged in successfully');
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-y-5 bg-white p-8 rounded shadow-lg"
    >
      <MediaLogin />
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

export default LoginForm;
