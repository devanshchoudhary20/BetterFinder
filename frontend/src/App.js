import './App.css';
import { useEffect } from 'react';
import SelectFolder from './components/SelectFolder';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9cdnRSQ2lZU0B3Wkc=');
function App() {

  useEffect(() => {
    console.log(window.electronAPI)

  }, [])

  
  return (
    <div className="App p-4 bg-gray-100 min-h-screen">
      <SelectFolder />
    </div>
  );
}

export default App;
