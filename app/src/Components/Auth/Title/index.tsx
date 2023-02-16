import './index.css'

function Title ({ text, style }: { text: string, style?: React.CSSProperties }){
    return (
        <h1 className="container-title" style={{...style}}>{text}</h1>
    )
}

export default Title;
