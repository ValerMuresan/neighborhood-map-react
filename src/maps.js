const api= 'https://api.foursquare.com/v2'
// Get unique token for storing bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

/* Dealing with errors*/
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

/* Obtain map places*/
export const getLocationsAll = () =>
  fetch(`${api}/venues/search?&radius=10000&limit10&client_id=XMN2F3BTJSPQMYSFK044F4PU0XHOODODBDR2GHQ4R1NFEL53&client_secret=AJJB00LQAXAX4EBLDZR3B4FFNUYOHJVM21ZO0K3JWOI5Y3FA&limit=9&v=20180323&ll=45.134503,25.73285`)
    .then(handleErrors)
   .then(res => res.json())
    .then(data => data.response.venues)
   .catch(error => {throw Error("Error While getting All Locations data from FourSquare API")})

/*Obtain places using  search selector */
export const getSelectedAll = (query) =>
  fetch(`${api}/venues/search?&radius=10000&query=${query}&limit10&client_id=XMN2F3BTJSPQMYSFK044F4PU0XHOODODBDR2GHQ4R1NFEL53&client_secret=AJJB00LQAXAX4EBLDZR3B4FFNUYOHJVM21ZO0K3JWOI5Y3FA&limit=9&v=20180323&ll=45.134503,25.73285`)
    .then(handleErrors)
   .then(res => res.json())
    .then(data => data.response.venues)
   .catch(error => {throw Error("Error While getting All Locations data from FourSquare API")})
