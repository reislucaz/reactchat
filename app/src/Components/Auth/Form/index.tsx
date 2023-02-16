import './index.css'

function Form({ children, onSubmit }: { children: React.ReactNode, onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} className="container-form">
      {children}
    </form>
  )
}

export default Form;
