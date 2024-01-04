import React from 'react'
import More from '../../assets/More.svg'
import './BtnLancarNota.css'

interface BtnLancarNotaProps {
    onClick: () => void
}

const BtnLancarNota: React.FC<BtnLancarNotaProps> = ({ onClick }) => {
    return (
        <div>
            <button
                className="btn"
                type="button"
                onClick={onClick}
            >
                Lançar nota
                <img src={More} alt="botão" />
            </button>
        </div>
    )
}

export default BtnLancarNota