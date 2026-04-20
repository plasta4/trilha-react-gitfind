import './styles.css'

import {useState} from 'react'

import {Header} from '../../components/Header'
import background from '../../assets/background.png'
import ItemList from '../../components/ItemList'

const App = () => {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json();

    console.log(newUser)

    if(newUser.login){
      const {avatar_url, name, login, bio} = newUser;
      setCurrentUser({avatar_url, name, login, bio});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json();

      if(newRepos.length){
          setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={background} className="background" alt="Github Logo"></img>
        <div className="info">
          <div className="search">
            <input name="user" value={user} 
            onChange={event => setUser(event.target.value)} 
            placeholder="@username" />

            <button onClick={handleGetData}>Buscar</button>

          </div>
          {currentUser?.login ? (
            <><div className="profile">
            <img src={currentUser.avatar_url} alt="User" className="profile-picture"></img>
            <div>
              <h3>{currentUser?.name ? currentUser.name : currentUser.login}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio ? currentUser.bio : 'Sem descrição'}</p>
            </div>
          </div>

          <hr /></>) : null}

          {repos?.length ? (<><div className="repositories">
            <h1>Repositórios</h1>
            {repos.map(repo => {
              return <ItemList title={repo.name} description={repo.description ? repo.description : "Sem descrição"} key={repo.id}/>
            })}

          </div></>) : null}
          
        </div>
      </div>
    </div>
  );
}

export default App;
