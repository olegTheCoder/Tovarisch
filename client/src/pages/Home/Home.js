import style from './style.module.css'
const { REACT_APP_API_URLFRONT} = process.env;


function Home() {
  return <div><img src={`${REACT_APP_API_URLFRONT}/3333.png`} className={style.bear}/></div>;
}

export default Home;

