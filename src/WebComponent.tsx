import { customElement } from 'solid-element';
import BskyEmbed from './BskyEmbed';

customElement('bsky-embed', { username: '', feed: '', limit: 10, mode: '' }, BskyEmbed);
