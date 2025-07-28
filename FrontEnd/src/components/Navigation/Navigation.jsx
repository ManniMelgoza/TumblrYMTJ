// src/components/Navigation/Navigation.jsx
import ProfileButton from '../Navigation/ProfileButton';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="spacer" />
        <ProfileButton />
      </div>
    </nav>
  );
};

export default Navigation;

