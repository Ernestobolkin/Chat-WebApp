import { ReactNode } from "react";
import { Socket } from "socket.io-client";

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

export interface InputPasswordProps {
    name?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface PostCreationProps {
    socket: Socket;
}
  

export interface User {
    email: string;
    password: string;
}