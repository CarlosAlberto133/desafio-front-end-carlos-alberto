import Bimestre1 from './components/bimestres/bimestre1/Bimestre1'
import Bimestre2 from './components/bimestres/bimestre2/Bimestre2'
import Bimestre3 from './components/bimestres/bimestre3/Bimestre3'
import Bimestre4 from './components/bimestres/bimestre4/Bimestre4'
import './App.css'

function App() {
  return (
    <div className='App'>
      <div className='container-app'>
        <div>
          <Bimestre1 />
        </div>
        <div>
          <Bimestre2 />
        </div>
        <div>
          <Bimestre3 />
        </div>
        <div>
          <Bimestre4 />
        </div>
      </div>
    </div>
  )
}

export default App