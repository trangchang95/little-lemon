import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Little Lemon Restaurant Website</title>
        <meta name="description" content="Little Lemon Restaurant Description" />
        <meta property="og:title" content="Little Lemon Restaurant" />
        <meta property="og:description" content="Little Lemon Restaurant Description" />
        <meta property="og:image" content="../assets/Logo.png" />
      </Helmet>
      <Header />
      <Nav />
      <Main />
      <Footer />
  </div>
  );
}

export default App;
