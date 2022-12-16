import React, {Suspense} from 'react';
import LoadingScreen from './component/loading-screen';
import './app.css';

const AdminSignUpComponent = React.lazy(() => import('./pages/register/admin'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={LoadingScreen}>
        <AdminSignUpComponent />
      </Suspense>
    </div>
  );
}

export default App;
