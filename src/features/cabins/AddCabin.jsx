import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
  // no state management inside this component
  // use compound component pattern so that modal keep track of its state internally - open/close

  return (
    <div>
    <Modal>
      <Modal.Open windowName='cabin-form'>
        <Button>Add cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

      {/*<Modal.Open windowName='table'>
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>*/}
  </Modal>
    </div>
  );

  /* const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
     {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}><CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/></Modal>}
    </div>
  ); */
}
