import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: Props): React.ReactElement => {
  const modalRoot = document.getElementById('modal-root') as Element;
  return createPortal(children, modalRoot);
};

export default ModalPortal;
