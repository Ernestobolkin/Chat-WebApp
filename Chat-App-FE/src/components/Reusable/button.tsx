import { ButtonProps } from "../../Interfaces/Reusable";

  const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    className,
  }) => {
    const buttonClassName = `${className || "btn btn-success "}`;
    return (
        <button type="submit" className={buttonClassName} onClick={onClick}>
          {children}
        </button>
      );
  };
  
  export default Button;