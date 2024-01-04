import Bimestre from '../bimestre/Bimestre'

const Bimestre2 = () => {
  const disciplinas = ['Biologia', 'Artes', 'Geografia', 'Sociologia']
  return <Bimestre
    bimestreAtual="Bimestre 2"
    bimestreNome="SEGUNDO"
    disciplinas={disciplinas}
  />
}

export default Bimestre2