import routes from '../src/routes/index';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
