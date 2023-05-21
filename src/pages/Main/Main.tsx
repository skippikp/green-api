import Contacts from '../../containers/Contacts/Contacts';
import Chat from '../../containers/Chat/Chat';
import './Main.scss';

const Main = () => {
  return (
    <div className='main-container'>
      <Contacts />
      <Chat />
    </div>
  )
}

export default Main