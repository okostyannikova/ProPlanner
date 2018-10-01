import $ from 'jquery';

const AUTH_URL = 'https://apis.google.com/js/client:plus.js?onload=autoLogin';
const CLIENT_ID = '186649870077-vrb6g8dg8vp38on5uqki9lsg2jm3gvjr.apps.googleusercontent.com';
const USER_DATA = 'email profile';
const CALLBACK_URL =
  'http://backend.proplanner.formula1.cloud.provectus-it.com/auth/google_oauth2/callback';

// (() => {
//   axios.get(AUTH_URL, {
//     params: {
//       dataType: 'script',
//       cache: true,
//     },
//   });
// })();
$(() => {
  $.ajax({
    url: AUTH_URL,

    dataType: 'script',

    cache: true,
  });
});

export function autoInit() {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth', () => {
      window.gpAsyncInit = () => {
        window.gapi.auth.authorize(
          {
            immediate: true,
            response_type: 'code',
            cookie_policy: 'single_host_origin',
            client_id: CLIENT_ID,
            scope: USER_DATA,
          },
          response => console.log(`intialization: ${response}`)
        );
      };
    });
  });
}

export default function authorization() {
  return new Promise((resolve, reject) =>
    window.gapi.load('client:auth', () =>
      window.gapi.auth.authorize(
        {
          immediate: false,
          response_type: 'permission',
          cookie_policy: 'none',
          client_id: CLIENT_ID,
          scope: USER_DATA,
        },
        response => {
          if (response && !response.error) {
            // //////////// После CALLBACK_URL идут GET параметры, которые формируют полный URL
            // /////////// В jquery.ajax ключ data превращает весь объект в строку
            // /////////// В fetch и axios таких функций нет
            // /////////// Cors`ы не позволяют нормально превратить response(объект) в строку
            // /////////// Код ниже позволил сформировать Get-параметры в строку
            // let daw = '';
            // for (const key in response) {
            //   const qwe = Object.assign([], response[key]);
            //   daw += key;
            //   daw += '=';
            //   daw += qwe.join('');
            //   daw += '&';
            // }
            // console.log('daw', daw);
            // axios.get(`${CALLBACK_URL}?${daw}`).then(qwe => console.log('qwe', qwe));
            // ////////////////////

            resolve(
              $.ajax({
                url: CALLBACK_URL,
                data: response,
                // success: data => console.log(data),
              })
            );
          } else {
            console.log('failed');
            reject();
          }
        }
      )
    )
  );
}

export function setTokenToStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function logOut() {
  localStorage.removeItem('user');
}
