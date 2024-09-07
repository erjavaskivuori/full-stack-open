const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
  const arr = parts.map(a => a.exercises)
  const initialValue = 0;
  const sumWithInitial = arr.reduce(
    (accumulator, currentValue) => 
    accumulator + currentValue, initialValue)

  return (
    <b>
      total of {sumWithInitial} exercises
    </b>
  )
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>
  
const Content = ({ parts }) => 
  <div>
    {parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
  </div>

const Course = ({ course }) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course