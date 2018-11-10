# ExpressJS Basics

### Create a new project
Create a new folder for your project
Create package.json file using npm init (Use server.js as entrypoint)
Create server.js file
Open the folder in your favorite code editor
<details>
<summary>Show code</summary>
<p>

```console
mkdir myapp
cd myapp
npm init
touch server.js
code .
```

</p>
</details>


### Install express
Use npm install to <code>install express</code>
Open up server.js on your editor
<details>
<summary>Show code</summary>
<p>

```console
npm install express
code server.js
```

</p>
</details>


### Import express
Create a variable <code>express</code> and assign it to <code>require('express')</code>
<details>
<summary>Show code</summary>
<p>

```javascript
const express = require('express')
```

</p>
</details>


### Create an instance of express app
Create a variable <code>app</code> and assign it to the return value of calling express

<details>
<summary>Show code</summary>
<p>

```javascript
const app = express()
```

</p>
</details>


### Create a server
Create a variable <code>port</code> and assign it to <code>3000</code>
Use app.listen() to create a server and pass in the port as the first argument
You can also pass in a callback function as an optional 2nd argument

<details>
<summary>Show code</summary>
<p>

```javascript
app.listen(port, () => console.log(`Server is listening on port ${port}`))
```

</p>
</details>


### Add a root route
Use <code>app.get()</code>
Pass in the root route <code>/</code> as the first argument and a route handler(middleware) as the second argument
<details>
<summary>Show code</summary>
<p>

```javascript
app.get('/', (req, res) => {
  res.send('This is the root route')
})
```

</p>
</details>


### Create a middleware
At the top of the file, use let to create a variable requestNumber and initialize it to 0
Create a function called logger which takes in 3 parameters <code>(req,res,next)</code> and inside the function log <code>Request #</code> and the value of requestNumber
Increment requestNumber and call the next function

<details>
<summary>Show code</summary>
<p>

```javascript
let requestNumber = 1
const logger = (req, res, next) => {
  console.log('Request #', requestNumber)
  ++requestNumber
  next()
}
```

</p>
</details>


### Use logger middleware
To use the middleware, use app.use() and pass in the middleware as argument

<details>
<summary>Show code</summary>
<p>

```javascript
app.use(logger)
```

</p>
</details>


### Add a new folder and name it <code>views</code>. Inside the views folder, create an index.html file
You're free to create this from scratch but I highly encourage copying the html code below and paste it in your html file to save time

<details>
<summary>Show code</summary>
<p>

```console
mkdir views
cd views
touch index.html
code index.html
> copying the html code below is highly encouraged
> or you can use this
html:5 (in VS code)
html (in atom)
```

</p>
</details>

<details>
<summary>or feel free to copy this code in your html file</summary>
<p>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My First Express App</title>
</head>
<body>

</body>
</html>

```

</p>
</details>


### Add an <code>h1</code>
You can put any text you like

<details>
<summary>or just copy this code 🙃</summary>
<p>

```html
  <h1>Welcome to SoCal Codecamp!</h1>
```

</p>
</details>


### Use <code>ejs</code> as view engine
Install <code>ejs</code> and set it as view engine
Change the extension of index.html file to ejs -> index.ejs

<details>
<summary>Show code</summary>
<p>

```javascript
npm install ejs

app.set('view engine', ejs)
```

</p>
</details>


### Add a register form
Inside the views folder, create a register.ejs file

Create a form with an action attribute set to <code>/register</code> and a method attribute set to <code>POST</code>

Inside the form, add an input with type attribute set to <code>text</code>, name attribute set to <code>email</code>, and a placeholder attribute set to <code>Email</code>

Add another input with type attribute set to <code>password</code>, name attribute set to <code>password</code>, and a placeholder attribute set to <code>Password</code>

Lastly, add a button with type attribute set to <code>submit</code>. Use <code>Register</code> as button text

<details>
<summary>or copy this code 🙃</summary>
<p>

```html
<h1>Register</h1>
<form action="/register" method="POST">
  <input type="text" name="email" placeholder="Email">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Register</button>
</form>
```

</p>
</details>


### Create a get route to <code>/register</code>
Use <code>app.get()</code> and pass in <code>/register</code> as the path
Send a response to render <code>register.ejs</code>

<details>
<summary>Show code</summary>
<p>

```javascript
app.get('/register', (req, res) => {
  res.render('register')
})
```

</p>
</details>


### Create a mock database
At the top of your server.js file, use <code>let</code> to create a variable mockDB and initialize it to an empty array
This is what our data will look like:
```
let mockDB =[
  {
    email: 'email@email.com',
    password: 'whatever'
  }
]
```

<details>
<summary>Show code</summary>
<p>

```javascript
let mockDB = []
```

</p>
</details>


### Create a post route to <code>/register</code>
Since this is  a post route, we'll have to use <code>app.post()</code>

<details>
<summary>Show code</summary>
<p>

```javascript
app.post('/register', (req, res) => {
  mockDB.push(req.body)
})
```

</p>
</details>


### Import and use body-parser
Create a variable <code>bodyParser</code> and assign it to <code>require('body-parser')</code>
<details>
<summary>Show code</summary>
<p>

```javascript
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
```

</p>
</details>


### Create addTimestamp middleware
Add a new line after the logger function and create a function called <code>timeStamp</code> which takes in 3 parameters <code>(req,res,next)</code>

Inside the function, create a variable <code>date</code> and assign it to <code>new Date().toLocaleString()</code>

Add a new property to <code>req.body</code> called <code>created</code> and assign <code>date</code> to it

Don't forget to call the <code>next</code> function at the end
<details>
<summary>Show code</summary>
<p>

```javascript
const addTimestamp = (req, res, next) => {
  const date = new Date().toLocaleString()
  req.body.created = date
  next()
}
```

</p>
</details>


### Use addTimestamp middleware in post <code>/register</code> route
Add addTimestamp as a 2nd parameter to app.post()

<details>
<summary>Show code</summary>
<p>

```javascript
app.post('/register', addTimestamp, (req, res) => {
  mockDB.push(req.body)
})
```

</p>
</details>


### Create list.ejs file
Inside the views folder, create a new file called list.ejs
Paste the code below to the file
<details>
<summary>Show code</summary>
<p>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My First Express App</title>
</head>
<body>
  <h1>Registered Campers</h1>
  <ul>
    <% for(let camper of campers) { %>
      <li><%= camper.name %></li>
    <% }%>
  </ul>
</body>
</html>

```

</p>
</details>

### Send a response from the post <code>/register</code> route
Render the <code>list.ejs</code> as the response
Pass in an object literal as a second parameter with mockDB as campers

<details>
<summary>Show code</summary>
<p>

```javascript
app.post('/register', addTimestamp, (req, res) => {
  mockDB.push(req.body)
  res.render('list', {campers: mockDB})
})
```

</p>
</details>

### Use partials
Inside views folder, create another folder called partials
Create header.ejs and footer.ejs files
Copy the code below and paste in respective files

<details>
<summary>header</summary>
<p>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My First Express App</title>
</head>
<body>
```

</p>
</details>

<details>
<summary>footer</summary>
<p>

```html
</body>
</html>
```

</p>
</details>

<details>
<summary>use it by adding these to the ejs files</summary>
<p>

```html
<% include partials/header %>
<% include partials/footer %>
```

</p>
</details>


### Bonus


<details>
<summary>Add a button to index.ejs file to go directly to <code>/register</code> route</summary>
<p>

```html
<% include partials/header %>

  <h1>Welcome to SoCal Codecamp!</h1>
  <button id="register">Register</button>

  <script>
    const register = document.getElementById('register')
    register.addEventListener('click', () =>{
      window.location.href = 'http://localhost:3000/register'
    })
  </script>

<% include partials/footer %>
```

</p>
</details>


<details>
<summary>Use <code>public</code> folder to serve static files</summary>
<p>

```javascript
app.use(express.static('public))
```

</p>
</details>


<details>
<summary>Move all <code>scripts</code> to main.js inside public folder</summary>
<p>

```javascript
<script>
  const register = document.getElementById('register')
  register.addEventListener('click', () =>{
    window.location.href = 'http://localhost:3000/register'
  })
</script>
```

</p>
</details>


<details>
<summary>Add <code>script</code> tag to index.ejs</summary>
<p>

```html
<% include partials/header %>

  <h1>Welcome to SoCal Codecamp!</h1>
  <button id="register">Register</button>

  <script src="main.js"></script>
<% include partials/footer %>

```

</p>
</details>


<details>
<summary>Use bcrypt to encrypt password</summary>
<p>

```javascript
npm install bcrypt

const bcrypt = require('bcrypt')
const saltRounds = 10

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash
    mockDB.push(req.body)
    res.render('list', {campers: mockDB})
  });
})
```

</p>
</details>


<details>
<summary>Use nanoid</summary>
<p>

```javascript
npm install nanoid

const nanoid = require('nanoid')
const saltRounds = 10

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash
    req.body.id = nanoid()
    mockDB.push(req.body)
    res.render('list', {campers: mockDB})
  });
})
```

</p>
</details>

