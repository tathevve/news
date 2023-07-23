const CONSTANTS = {
    MAP_ZOOM: 11,
    MAP_WIDTH: '100%',
    MAP_HEIGHT: '100%',
    CURRENCY: {
      AMD: 'AMD',
      USD: 'USD',
    },
    LANGUAGE: {
      hy: 'am',
      ru: 'ru',
      'en-US': 'en',
    },
    MOBILE_SIZE: 1201,
    LETTERS_ACCEPTED_ONLY: /[-+/*!@#$%^&*()_=}{|`~\\><,.?":;'[\]]|\d+/g,
    // LATIN_LETTERS_WITH_SPACE: /^$|^[a-zA-Z]+( [a-zA-Z]+)*$/,
    LATIN_LETTERS_WITH_SPACE: /^$|^[a-zA-Z._ '-]+$/,
    LATIN_LETTERS: /^$|^[0-9a-zA-Z._'-@]+$/,
    LETTERS_WITH_SPACE: /^$|^[a-zA-Zա-ևԱ-Ֆа-яА-Я._ '-]+$/,
  
    LATIN_ADDRESS: /^$|^[a-zA-Z0-9._ '/-]+$/,
    ARM_RUS_ENG_ADDRESS: /^$|^[a-zA-Zա-ևԱ-Ֆа-яА-Я0-9._ '/-]+$/,
    ARM_LETTERS: /^$|^[ա-ևԱ-Ֆ._'/-]+$/,
    EMAIL_REGEX:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    // LATIN_ADDRESS: /^$|^[a-zA-Z0-9/-]+( [a-zA-Z0-9/-]+)*$/,
    YOUTUBE_PARSER:
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
  };
  
  export default CONSTANTS;
  