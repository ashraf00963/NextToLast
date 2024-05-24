import { Link } from 'react-browser-router';
import { Maintenance } from '../assets';
import './coming-soon.css';

function ComingSoon () {
    return (
        <div className='coming-soon-page'>
            <div className='coming-soon-content'>
                <img src={Maintenance} alt='Maintenance icon' />
                <h2 className='purple-white-font'>Coming Soon</h2>
                <button><Link to='/'>Go Back Home</Link></button>
            </div>
        </div>
    )
};

export default ComingSoon;