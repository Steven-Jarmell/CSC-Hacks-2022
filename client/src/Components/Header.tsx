import PittLogo from "../Images/pitt-csc-image.png";

const Header = () => {
	return (
		<div className="header-container">
			<img src={PittLogo} alt="Pitt Logo"></img>
			<h1>Summer 2023 Internships</h1>
		</div>
	);
};

export default Header;
