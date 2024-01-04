import Bimestre from '../bimestre/Bimestre'

const disciplinas = ['Biologia', 'Artes', 'Geografia', 'Sociologia']

const Bimestre1 = () => {

  return <Bimestre
    bimestreAtual="Bimestre 1"
    bimestreNome="PRIMEIRO"
    disciplinas={disciplinas}
  />
};

export default Bimestre1