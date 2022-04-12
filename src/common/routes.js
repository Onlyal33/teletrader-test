const host = '';
const prefix = 'v1';

export default {
  symbolPath: (id) => [host, prefix, 'pubticker', id].join('/'),
  symbolsPath: () => [host, prefix, 'symbols'].join('/'),
};
