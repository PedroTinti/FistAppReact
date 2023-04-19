import React, {useState, useEffect} from 'react';
import './style.css';
import { Card } from '../Card';

export function Home() {

  const [studentName, setStudentName] = useState();

  //Criamos um state novo para subitintuir os valores e conseguirmos criar novos cards de estudantes
  const [Students, setStudents] = useState([]);

  const [user, setUser] = useState({name: '', avatar:''});

  //Precimos criar uma função onde vai ser passada as informações para criação do card para o novo aluno
  function handleAddStudent(){
    const newStudent ={
      name: studentName,
      time: new Date().toLocaleDateString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    //Aqui setamos a subistituição dos valores com newStudent e o prevState salvamos o conteudo antrior, assim salvando uma lista de usuarios

     //Coloca " ..." para passar somente o valor e não o array com o valor
    setStudents(prevState => [...prevState ,newStudent]);

  }

  useEffect(() => {
    fetch('https://api.github.com/users/pedrotinti')
    .then(response => response.json())
    .then(data=> {
      setUser({
        name: data.name,
        avatar: data.avatar_url,

      })

    })
  },[]);  

  return (
    <div className='container'>
    <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Foto de imagem'></img>
        </div>
    </header>

    
      <input 
        type="text" 
        placeholder="Digite o nome..." 
        onChange={e => setStudentName(e.target.value)}

      />
      
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        Students.map(student => 
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time} 

          />
        ) 
      }

      
    </div>

  )
}

