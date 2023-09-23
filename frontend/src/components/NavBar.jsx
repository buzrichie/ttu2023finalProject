import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {RxAvatar} from "react-icons/rx"

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
const Navbar = (props) => {
  let localUser = JSON.parse(localStorage.getItem("userData"))
  
    const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const {user} = props
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const logOut=()=>{
    localStorage.removeItem("user")
    localStorage.removeItem("userData")
    localStorage.removeItem("newuser")
    location.href="/login" 
  }
  
  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <>{user ?
    <>
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
       
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <RxAvatar className="rounded-full w-7 h-7 text-blue-600"/>
            <p className='flex items-center'>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        
        {user?<Link to="#" onClick={()=>{logOut()}} className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-4 w-50 hover:text-white rounded">LogOut</Link>:<Link to="auth/*" className="text-gray-400 font-bold ml-1 text-14">LogIn</Link>}
      </div>
    </div>
    </>:<> <nav className="bg-white p-4" style={{zIndex: "1000001", position:"fixed", top:"0", left:"0", width:"100%"}}>
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex text-black items-center font-bold text-xl">
        {/* Your brand name */}
        <img src="images/NavLogo.png" className="w-12 h-12"/>
        <Link to="/">SchoolMaster</Link>
      </div>
        <div>
          {user ? (
            // If user is logged in, show logout button
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            // If user is not logged in, show login button
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 w-50 hover:text-white rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
    </>}
    </>
  );
};

export default Navbar;
