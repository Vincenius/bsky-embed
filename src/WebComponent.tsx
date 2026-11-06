import { customElement } from 'solid-element';
import BskyEmbed from './BskyEmbed';

customElement('bsky-embed', {
  username: '',
  filter: '',
  feed: '',
  limit: 10,
  mode: '',
  linkTarget: '_self',
  linkImage: false,
  customStyles: '',
  customStylesFile: '',
  disableStyles: false,
  search: '',
  loadMore: false,
  disableAutoplay: false,
  disableImages: false,
  disableVideos: false,
  dateFormat: {},
}, BskyEmbed);
