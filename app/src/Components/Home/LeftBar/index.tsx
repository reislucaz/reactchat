import './index.css';
import Avatar from './default.webp';
import SelectStatus from './SelectStatus';
import ExitButton from './ExitButton';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/auth';
import ConfigButton from './ConfigButton';

function LeftBar () {
    const { profile } = useContext(AuthContext);

    return (
        <div className="dashboard-item left-bar">
            <div className="profile">
                <img src={Avatar} alt="Avatar" className="profile-photo" />
                <p className="profile-name">{profile.name}</p>
                <SelectStatus />
            </div>
            <div className="config">
                <ConfigButton />
                <ExitButton />
            </div>
        </div>
    )
}

export default LeftBar;
