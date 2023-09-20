import { Link } from "react-router-dom";


const TemporalNavBar = (props) => {
    const {user} = props
    
    return ( <> <nav className="bg-white p-4" style={{zIndex: "1000001", position:"fixed", top:"0", left:"0", width:"100%"}}>
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
  </> );
}
 
export default TemporalNavBar;