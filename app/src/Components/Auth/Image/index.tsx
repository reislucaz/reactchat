function Image ({ src, alt, width, height }: { src: string, alt: string, width: string, height: string }) {
    return (
        <img src={src} alt={alt} style={{ width, height }} loading="lazy"/>
    )
}

export default Image;
