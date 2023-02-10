function loginSwal() {
  Swal.fire({
    title: 'Login Form',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    confirmButtonColor: '#1DA1F2',
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return {
        login: login,
        password: password
      }
    }
  }).then((result) => {
    login(result.value.login, result.value.password)
  })
}

function login(username, password) {
  var request = new XMLHttpRequest();
  var url = "http://127.0.0.1:5000/login";
  var data = JSON.stringify({
    "username": username,
    "password": password
  });

  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  request.send(data);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var response = JSON.parse(request.responseText);
      console.log(response);
      // Add your success logic here
      Swal.fire({title:'Login Successful', confirmButtonColor: '#1DA1F2'}).then(() => {
        window.location.reload();
      })

    } else if (request.status == 400) {
      // Login failed
      var response = JSON.parse(request.responseText);
      console.error(response.message);

      // Add your failure logic here

      Swal.fire('Login Failed')


    } else {
      // We reached our target server, but it returned an error
      console.error("Server error:", request.status, request.responseText);
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
    console.error("Request error:", request.status, request.responseText);
  };
}



function registerSwal() {
  Swal.fire({
    title: "Registration Form",
    html: `<input type="text" id="register" class="swal2-input" placeholder="Username">
          <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: "Sign up",
    focusConfirm: false,
    confirmButtonColor: '#1DA1F2',
    preConfirm: () => {
      const register = Swal.getPopup().querySelector("#register").value;
      const password = Swal.getPopup().querySelector("#password").value;
      if (!register || !password) {
        Swal.showValidationMessage(`Please enter a username and password`);
      }
      return {
        register: register,
        password: password,
      };
    },
  }).then((result) => {
    register(result.value.register, result.value.password);
  });
}

function register(username, password) {
  var request = new XMLHttpRequest();
  var url = "http://127.0.0.1:5000/register";
  var data = JSON.stringify({
    "username": username,
    "password": password
  });

  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  request.send(data);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var response = JSON.parse(request.responseText);
      console.log(response);

      // Add your success logic here

      window.location.reload();


    } else if (request.status == 400) {
      // Registration failed
      var response = JSON.parse(request.responseText);
      console.error(response.message);

      // Add your failure logic here

      swal.fire("Username already in use.")

    } else {
      // We reached our target server, but it returned an error
      console.error("Server error:", request.status, request.responseText);
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
    console.error("Request error:", request.status, request.responseText);
  };
}


const tweetButton = document.getElementById('tweetButton')

tweetButton.addEventListener('click', () => {
  tweet();
})


function tweet() {
  var request = new XMLHttpRequest();
  var url = "http://127.0.0.1:5000/post";
  var data = JSON.stringify({
    "username": document.getElementById('username_value').value,
    "description": document.getElementById('tweetDescription').value
  });

  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  request.send(data);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var response = JSON.parse(request.responseText);
      console.log(response);

      // Add your success logic here

      window.location.href = window.location.href;


    } else if (request.status == 400) {
      // Registration failed
      var response = JSON.parse(request.responseText);
      console.error(response.message);

      // Add your failure logic here

      swal.fire("Something went wrong")

    } else {
      // We reached our target server, but it returned an error
      console.error("Server error:", request.status, request.responseText);
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
    console.error("Request error:", request.status, request.responseText);
  };
}
