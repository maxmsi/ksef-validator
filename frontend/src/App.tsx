import './App.css';
import { InvoiceUploader } from './components/InvoiceUploader';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🛡️ KSeF Pre-Flight Validator</h1>
      <p>Sprawdź swoją fakturę zanim wyślesz ją do Ministerstwa Finansów.</p>
      
      {/* Nasz nowy komponent */}
      <InvoiceUploader />
      
    </div>
  );
}

export default App;