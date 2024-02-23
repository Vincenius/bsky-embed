import { customElement } from 'solid-element';
import App from './App';

customElement('my-component', getInitialProps(), App);

function getInitialProps() {
    return { };
  }
  