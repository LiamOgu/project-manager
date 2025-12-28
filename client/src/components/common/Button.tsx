interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return (
    <div>
      <button className="btn btn-primary">{text}</button>
    </div>
  );
}

export default Button;
