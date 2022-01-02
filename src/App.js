import './App.css'
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //suffle cards
  const suffleCards = () => {
    const suffledCards = [...cardImages, ...cardImages] //double cards array
      .sort(() => Math.random() - 0.5) //suffle cards
      .map((card) => ({ ...card, id: Math.random() })) //add random id property for each card
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(suffledCards)
    setTurns(0)
  }
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  useEffect(() => suffleCards(), [])

  //Compare 2 selected card
  useEffect(() => {
    if (choiceOne && choiceTwo) { //if both choiceOne & choiceTwo are selected (warning: first mounted)    
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
            setCards(prev => {
                return prev.map(card => {
                    if (card.src === choiceOne.src) {
                        return { ...card, matched: true }
                    } else return card
                })
            })
            resetTurn()
        } else {
            setTimeout(() => resetTurn(), 1000)
        }
    }
    return () => {
        //cleanup
    }
  }, [choiceOne, choiceTwo])
  
  const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => 
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
        )}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App