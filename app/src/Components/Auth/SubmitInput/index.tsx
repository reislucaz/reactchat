import './index.css'

function SubmitInput({ value, style }: { value: string, style?: React.CSSProperties }) {
    return (
        <input type="submit" className="container-form-input-submit" value={value} style={style}/>
    )
}

export default SubmitInput;
