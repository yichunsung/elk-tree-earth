import { useState } from 'react';

const About = () => {

  const [pageName, setPageName] = useState('About Us');

  const changeName = () => {
    setPageName('Hello Hahahaha');
  }

  return (
    <main>
      <h2>
        { pageName }
      </h2>
      <button onClick={ () => { changeName() } }>Change Name</button>
    </main>
  )
}

export default About;
