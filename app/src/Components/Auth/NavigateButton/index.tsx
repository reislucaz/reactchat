import { useNavigate } from 'react-router-dom';
import './index.css'

function NavigateButton({ value, to, style }: { value: string, to: string,  style?: React.CSSProperties }) {
    const navigate = useNavigate();

    return (
        <button style={style} className="navigate-button" onClick={() => navigate(to)}>{value}</button>
    )
}

export default NavigateButton;
