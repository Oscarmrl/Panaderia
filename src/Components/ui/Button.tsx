type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  };
  
  export default function Button({
    onClick,
    children,
    className = "",
    disabled = false,
    type = "button",
  }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`${className}`}
      >
        {children}
      </button>
    );
  }
  