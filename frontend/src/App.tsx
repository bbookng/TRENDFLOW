import { Outlet } from 'react-router-dom';
import BaseLayout from '@/Layout/BaseLayout';

const App = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default App;
