import './index.css'

function Container ({children, width, height, style} : { children: React.ReactNode, width: string, height: string, style?: React.CSSProperties}) {
    return (
        <div className="container-centered" style={ { width: 'auto', height, ...style }}>
            {children}
        </div>
    )
}

export default Container;
