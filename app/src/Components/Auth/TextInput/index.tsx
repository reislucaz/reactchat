import './index.css'

function TextInput({ placeholder, name, id, type, onChange }: { placeholder: string, name: string, id: string, type: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <input
            type={type}
            className="container-form-input"
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={onChange}
        />
    )
}

export default TextInput;
