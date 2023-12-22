import { FcGoogle } from 'react-icons/fc';

const MediaLogin = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-neutral text-lg"
      >
        <FcGoogle />
        Sign In with Google
      </button>
      <div className="divider">OR</div>
      <p className="text-center text-sm leading-none">Enter your email and password to sign in</p>
    </>
  );
};

export default MediaLogin;
