import { ReactNode } from "react";

export interface ButtonProps {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
  }

export interface ToastProps {
    onClose?: () => void;
    message: ReactNode;
    type?: string;
}