import { useState } from 'react'

const Header = ({ name }) => { 
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const MostVotes = ({ votes, anecdotes }) => {
  const max = Math.max(...votes)
  const anecdote = anecdotes[votes.indexOf(max)]
  return(
    <div>
      <p>
        {anecdote}<br></br>
        has {max} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  

  const handleNextClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      {anecdotes[selected]}<br></br>
      has {votes[selected]} votes <br></br>
      <Button handleClick={handleVoteClick} text="vote"/>
      <Button handleClick={handleNextClick} text="next anecdote"/><br></br>
      <Header name="Anecdote with most votes" />
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App