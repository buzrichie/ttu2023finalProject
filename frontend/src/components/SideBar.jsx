import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
// import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = (props) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const {user} = props
  const {links} = props
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center  gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white hover:text-gray-200 text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <>{user &&
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <span><img src="images/NavLogo.png" alt="SMaster"/></span><span>SchoolMaster</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((link) => (
              <div key={link.title}>
                  <NavLink
                    to={`/${link.href}`}
                    key={link.href}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    
                    <span className="capitalize ">{link.title}</span>
                  </NavLink>
              </div>
              // <p>{link.title}</p>
            ))}
          </div>
        </>
      )}
    </div>}
    </>
  );
};

export default Sidebar;
