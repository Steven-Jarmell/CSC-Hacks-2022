import PittLogo from "../Images/pitt-csc-image.png";
import './Header.css';

const Header = () => {
	return (
		<div className="header-container">
			<img src={PittLogo} alt="Pitt Logo" className="header-pitt-logo"></img>
			<h1 className="header-title">Summer 2023 Internships</h1>
		</div>
	);
};

export default Header;
