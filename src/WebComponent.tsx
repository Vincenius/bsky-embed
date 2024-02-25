import { customElement } from 'solid-element';
import App from './App';

customElement('bsky-embed', { username: '', limit: 10 }, App);
