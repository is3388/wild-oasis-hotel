import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles'; // must not have children
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

// create a new react component by using the styled function of an html element passing a strict with the css stle
// the style only scopes to this component
//const H1 = styled.h1`
//  font-size: 30px;
//  font-weight: 600;
//  background-color: orange;
//`;
// use as props like this: as='' pass in whatever will be rendered in the html

const StyledApp = styled.div`
  //background-color: orange;
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h2'>Check in and out</Heading>
              <Button
                onClick={() => alert('Checking in')}
              >
                Check in
              </Button>
              <Button 
              variation='secondary'
              size='small'
              onClick={() => alert('Checking out')}>Check out</Button>
            </div>
          </Row>

          <Row>
            <Heading as='h3'>Form</Heading>
            <form>
              <Input type='number' placeholder='number of guests' />
              <Input type='number' placeholder='number of guests' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}
