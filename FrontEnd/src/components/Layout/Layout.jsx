import Sidebar from "../Sidebar/Sidebar";
import Navigation from "../Navigation/Navigation"; // <- renamed from TopNav
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Navigation /> 
        {children}
      </div>
    </div>
  );
};

export default Layout;

