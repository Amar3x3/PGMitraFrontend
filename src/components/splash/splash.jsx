import './splash.css';
import splashImage from '../../assets/splashImage.png'
import { useNavigate } from 'react-router-dom';

const Splash = () => {
    const navigate = useNavigate();

    const handleClick = () => {  
        navigate('/role');   
    };

    return (
        <div className="splash-container">
            <div className="splash-content">
                <img className='splash-img' src={splashImage} alt="SplashImage" />
                <h1 className="splash-title">Welcome to PG Manager</h1>
                <p className="splash-subtitle">Managing PGs made easy!</p>
                <button className='splash-start-button' onClick={handleClick} >Get Started</button>
            </div>
        </div>
    );
};

export default Splash