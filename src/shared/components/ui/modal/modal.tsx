import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ children, setIsOpen, isOpen, title }: ModalProps) => {
  return (
    isOpen ? (
      <div>
        <div>
          <h1>title</h1>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        <div>{children}</div>
      </div>
    ) : <></>
  );
};
