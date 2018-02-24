import enquire from 'enquire.js';

if (typeof window !== 'undefined') {
  const matchMediaPolyfill = mediaQuery => {
    return {
      Media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

export function enquireScreen(callback, registerString) {
  if (!enquire) {
    return;
  }
  enquire.register(registerString, {
    match: () => {
      callback && callback(true);
    },
    unmatch: () => {
      callback && callback(false);
    },
  });
}
