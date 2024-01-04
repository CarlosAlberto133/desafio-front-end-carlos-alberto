import React, { useState } from 'react'
import axios from 'axios'
import X from '../../assets/X.svg'
import './Modal.css'

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  bimestreNome: string
  bimestre: string
  disciplinas: string[]
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, bimestreNome, disciplinas, bimestre, ...props }) => {
  const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null)
  const [nota, setNota] = useState<string | null>(null)

  const handleDisciplinaClick = (disciplina: string) => {
    setSelectedDisciplina(disciplina)
  }

  const handleConfirm = async () => {
    if (selectedDisciplina === null || nota === null) {
      alert('Por favor, selecione uma disciplina e insira uma nota.');
      return
    }

    try {
      await axios.post('http://localhost:3333/resultados', {
        bimestre,
        disciplina: selectedDisciplina,
        nota: Number(nota),
      })
      onClose();
      setNota(null)
    } catch (error: any) {
      if (error.response) {
        console.error(`Erro ao obter notas do ${bimestreNome}:`, error.response.data.error)
        alert(`${error.response.data.error}`)
      } else if (error.request) {
        console.error('Não houve resposta do servidor:', error.request)
        alert('Erro: Não houve resposta do servidor')
      } else {
        console.error('Erro ao configurar a requisição:', error.message)
        alert('Erro: ' + error.message)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal" {...props}>
        <div className="modal-header">
          <span className='bimestre-name'>{bimestreNome}</span>
          <button className="close-button" onClick={onClose}>
            <img src={X} alt='fechar' />
          </button>
        </div>
        <div className="modal-content">
          <span className='disciplina-color'>Disciplina</span>
          <div className="disciplinas">
            {disciplinas.map((disciplina) => (
              <button
                key={disciplina}
                className={`disciplina-button ${selectedDisciplina === disciplina ? 'selected' : ''} ${disciplina.toLowerCase()}`}
                onClick={() => handleDisciplinaClick(disciplina)}
              >
                {disciplina}
              </button>
            ))}
          </div>
          <div className="nota-input">
            <label>Nota:</label>
            <input
              type="number"
              className='input-nota'
              value={nota || ''}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className='btn-confirm' onClick={handleConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal