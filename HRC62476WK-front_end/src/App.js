
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import TableContent from './components/InvoiceData/TableContent';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PieChart from './components/Charts/PieChart';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

function App() {
  useEffect(() => {
    
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      ArcElement
  );
  }, [])
  return (
    <div className="App">
    
      <Navbar/>
      <TableContent/>
      <Footer/>
      <PieChart/>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
