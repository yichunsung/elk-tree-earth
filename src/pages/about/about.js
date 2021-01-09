import { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Link, Redirect } from "react-router-dom";

const About = () => {

  const [pageName, setPageName] = useState('About Us');

  const [isTrunToCompany, setIsTrunToCompany] = useState(false);

  const changeName = () => {
    setPageName('Hello Hahahaha');
    setIsTrunToCompany(true);
  } 

  if (isTrunToCompany) {
    return <Redirect to="/about/company" push={ true } />
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
