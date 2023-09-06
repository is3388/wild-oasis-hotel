// create a new react component by using the styled function of an html element passing a strict with the css stle
// the style only scopes to this component

/*const test = css`text-align: center;
${10 > 5 && "background-color: orange;"}`;
To use it, ${test}*/

// pass props into component and conditional to set styling

import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${(props) =>
    props.type === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  
    ${(props) =>
    props.type === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  
    ${(props) =>
    props.type === 'h3' &&
    css`
      font-size: 1rem;
      font-weight: 500;
    `}
  

  //background-color: orange;
`;

export default Heading;
