import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { isLoading, logout } = useLogout();

  if (isLoading) return <Spinner />;

  return (
    <ButtonIcon onClick={logout}>
      { !isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
