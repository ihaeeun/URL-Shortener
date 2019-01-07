const crypto = require('crypto');

// function base62(urlPath) {
//     charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//       .split(''),
//     encode: integer => {
//       if (integer === 0) {
//         return 0;
//       }
//       let s = urlpath;
//       while (integer > 0) {
//         s = [base62.charset[integer % 62], ...s];
//         integer = Math.floor(integer / 62);
//       }
//       return s.join('');
//     },
//     decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
//       prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
//   };

const base62 = {
    charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split(''),
    encode: integer => {
      if (integer === 0) {
        return 0;
      }
      let s = 'html/view.html';
      while (integer > 0) {
        s = [base62.charset[integer % 62], ...s];
        integer = Math.floor(integer / 62);
      }
      return s.join('');
    }
    // decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
    //   prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
  };
  console.log(base62)
//   const urlPath = 'html/view.html'
//   const hash = crypto.createHash("sha1").update(urlPath);//substring(0,8);
// //   console.log(hash.digest(base62));
//   console.log(hash.digest('base62'));
  //console.log(hash.toString('ascii', 0, 7));