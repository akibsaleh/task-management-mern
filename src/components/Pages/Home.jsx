import { Link } from 'react-router-dom';
import hero from '../../assets/hero.svg';
const Home = () => {
  return (
    <div className="flex flex-col w-full h-full grow justify-center">
      <div className="flex justify-between items-center container mx-auto max-w-screen-xl">
        <div className="flex flex-col max-w-[520px] gap-y-5">
          <h1 className="capitalize text-5xl leading-tight font-black">
          Productive Day With <br /> <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary'>Seamless Efficiency!</span>
          </h1>
          <p className='font-sm pb-5'>Conquer your day with Taskedo, task management application designed for seamless efficiency and unmatched productivity!</p>
          <div className="flex items-center gap-x-3">
            <Link to={'/login'} className='btn btn-outline text-lg font-semibold uppercase tracking-wider'>Let’s Explore</Link>
          </div>
        </div>
        <div className='w-fit'>
          <img src={hero} alt='Taskedo' className='w-full max-w-xl'/>
        </div>
      </div>
    </div>
  );
};

export default Home;
