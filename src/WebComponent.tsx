import { customElement } from 'solid-element';
import BskyEmbed from './BskyEmbed';

customElement('bsky-embed', {
  username: '',
  feed: '',
  limit: 10,
  mode: '',
  linkTarget: '_self',
  linkImage: false,
  customStyles: '',
  disableStyles: false,
  search: '',
  loadMore: false,
  dateFormat: {},
}, BskyEmbed);
