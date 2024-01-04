import './Cards.css'
import notaVermelha from '../../assets/notaVermelha.svg'
import notaAmarela from '../../assets/notaAmarela.svg'
import notaVerde from '../../assets/notaVerde.svg'
import { format } from 'date-fns'

interface CardsProps {
    disciplina: string,
    dataDeLancamento: string,
    nota: string
}

export default function Cards({ disciplina, dataDeLancamento, nota }: CardsProps) {
    const getTextColor = () => {
        const numericNota = parseFloat(nota)

        if (numericNota >= 0 && numericNota <= 5.9) {
            return { color: 'red-color', icon: notaVermelha }
        } else if (numericNota >= 6 && numericNota <= 7.9) {
            return { color: 'yellow-color', icon: notaAmarela }
        } else if (numericNota >= 8 && numericNota <= 10) {
            return { color: 'green-color', icon: notaVerde }
        }
        return { color: '', icon: '' }
    }

    const colorClasses = getTextColor()
    const formattedDate = dataDeLancamento ? format(new Date(dataDeLancamento), 'dd/MM/yyyy') : ''

    return (
        <div className="card-container">
            <div>
                <label className="label">{disciplina}</label>
            </div>
            <span className='data-de-lançamento'>{formattedDate}</span>
            <div className='marcacao'>
                <div>
                    <img className={`notaImg ${colorClasses.color}`} src={colorClasses.icon} alt='nota' />
                </div>
                <span className={`nota ${colorClasses.color}`}>Nota: {nota}</span>
            </div>

        </div>
    )
}