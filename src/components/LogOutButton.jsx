import Button from "./../elements/Button";
import {auth} from './../firebase/firebase.config';
import {signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const LogOutButton = () => {
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate('/log-in');
        } catch(error){
            console.log(error);
        }
    }

  return (
    <Button as="button" onClick={logOut}>
        <LogOutButton />
    </Button>
  )
}

export default LogOutButton
