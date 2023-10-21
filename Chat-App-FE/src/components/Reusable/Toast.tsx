import { ToastProps } from "../../Interfaces/Reusable";

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const toastClass = `toast bg-${type} text-white`;

  return (
    <div className={toastClass} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-body">
        {message}
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Toast;