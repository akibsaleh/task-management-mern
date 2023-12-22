import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitterX, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-content text-base-100">
        <aside className='w-full max-w-1440 mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center'>
          <p>Copyright © 2023 - All right reserved by Taskedo</p>
          <nav className='inline-flex text-xl gap-3 items-center'>
            <h4 className='!my-0 text-base text-neutral-content/25'>Find us on</h4>
            <Link to={'#'}><BsFacebook /></Link>
            <Link to={'#'}><BsInstagram /></Link>
            <Link to={'#'}><BsTwitterX /></Link>
            <Link to={'#'}><BsLinkedin /></Link>
          </nav>
        </aside>
      </footer>
    );
};

export default Footer;