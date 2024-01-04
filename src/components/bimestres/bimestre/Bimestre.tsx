import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../../card/Cards'
import Trash from '../../../assets/Trash.svg'
import BtnLancarNota from '../../btn/BtnLancarNota'
import './Bimestre.css'
import Modal from '../../modal/Modal'

interface Nota {
  id: string
  disciplina: string
  criadoEm: string
  nota: string
}

interface BimestreProps {
  bimestreNome: string
  bimestreAtual: string
  disciplinas: string[]
}

function Bimestre({ bimestreNome, disciplinas, bimestreAtual }: BimestreProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notas, setNotas] = useState<Nota[]>([])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    fetchData()
  }

  const handleDelete = async (notaId: string) => {
    try {
      await axios.delete(`http://localhost:3333/resultados/${notaId}`)
      fetchData()
    } catch (error) {
      console.error('Erro ao excluir nota:', error)
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get<Nota[]>(`http://localhost:3333/resultados/${bimestreNome}`)
      setNotas(response.data ?? [])
    } catch (error: any) {
      if (error.response) {
        console.error(`Erro ao obter notas do ${bimestreNome}:`, error.response.data.error)
        alert(`Erro: ${error.response.data.error}\nDetalhes: ${error.response.data.errorMessage}`)
      } else if (error.request) {
        console.error('Não houve resposta do servidor:', error.request)
        alert('Erro: Não houve resposta do servidor')
      } else {
        console.error('Erro ao configurar a requisição:', error.message)
        alert('Erro: ' + error.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bimestreNome])

  return (
    <div className='container'>
      <div className='info-container'>
        <label className='bimestres'>{bimestreAtual}</label>
        <div className="tooltip-container">
          <BtnLancarNota onClick={handleOpenModal} />
          <span className="tooltip-text">Adicionar</span>
        </div>
      </div>
      <div className='container-card'>
        {notas.map((nota) => (
          <div className='card' key={nota.id}>
            <div className={`card${nota.disciplina}`}>
              <Card
                disciplina={nota.disciplina}
                dataDeLancamento={nota.criadoEm}
                nota={nota.nota.toString()}
              />
            </div>
            <div>
              <button className='delete-button' onClick={() => handleDelete(nota.id)}>
                <img className='trash' src={Trash} alt='trash' />
                <span className="tooltip-text">Remover</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        disciplinas={disciplinas}
        bimestre={bimestreNome}
        bimestreNome={bimestreAtual}
      />
    </div>
  )
}

export default Bimestre