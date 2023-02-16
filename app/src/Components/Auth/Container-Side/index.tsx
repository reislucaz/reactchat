import './index.css'

function ContainerSide({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
    return (
        <div className="container-side" style={style}>
            {children}
        </div>
    )
}

export default ContainerSide;
