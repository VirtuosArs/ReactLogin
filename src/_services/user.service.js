import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    loginT,
    loginT1,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/users/authenticate', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function loginT(username, password) {
    // axios.get('https://api.github.com/users/maecapozzi')
    // .then(response => console.log(response))
    // var url = 'http://139.59.70.142:4062/api/v1/user/signIn';
    var url = 'http://api.toogletravel.com/api/v1/user/signIn';
    
    console.log(url);

    // axios.post(url, username, password).then(
    //     response => console.log(response)
    // )

    

    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
          }),
        body: JSON.stringify({ 
            'userName': username,
            'password': password,
         }), 
      })
      .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
      })
      .catch((error) => {
          console.error(error);
      });

    
}

function loginT1(username, password) {
    var url = 'http://api.toogletravel.com/api/v1/user/signIn';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'userName': username,
            'password': password,
         })
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(userName => {
            // login successful if there's a jwt token in the response
            if (userName && userName.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(userName));
            }
            console.log("User is=>"+ userName)
            return userName;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}