import reactDom from 'react-dom';

interface PortalPropsInterface {
  children: React.ReactNode;
}

const PortalProvider = ({ children }: PortalPropsInterface) => {
  const el = document.getElementById('modal');
  return reactDom.createPortal(children, el as HTMLElement);
};

export default PortalProvider;
