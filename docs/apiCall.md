# ApiCall
After endless iterations of http clients it has been time to create standard that relies on the fetch method and enables easy access as well as the transformation to service based access to the backend.

`ApiCall` is a class and idea that should solve this demand and let's you decide how to get the data. Simply call it and receive a `Promise` in response ... the rest is up to you and your idea.

It's based on being embedded into the `AppCore` where it will use the `UserContext` data to make requests. 

To modify the request headers you can directly access them in the class and overwrite some defaults.

## Usage
```Javascript
const apiPath = "/api";

// ### prepare a new text renderer, register pipes ###
app.apiCall = new ApiCall(app);

/* ### default header looks like : ###
    mode = "cors";
    credentials = "same-origin";
    redirect = "follow";
    referrerPolicy = "no-referrer";
    headers = {
        "Upgrade-Insecure-Requests": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
    }
*/

// ### let's change the redirect for a demo ###
app.apiCall.redirect = "error";

```
`ApiCall`holds a method for the most common request methods and can easily be extended to whatever is missing.

## Methods and functions
* [setErrorHandler()](#setErrorHandler)
* [get()](#get)
* [post()](#post)
* [put()](#put)
* [patch()](#patch)
* [delete()](#put)

## setErrorHandler()
to make the http client more convenient you can define a function to be called in case the requests report error. Just imagine you would need to write a function to display errors in every request! ... you can save the time for that by assigning a function to take over on those occasions. 

Finally `ApiCall` will `throw` the response it got.

#### params: 
* `requestErrorHandler`: function - The function to call on errors while on requests. It will carry the response object in the first param!

```javascript
app.apiCall.setErrorHandler(requestErrorHandler); 
```
## get()
The simple get method that usually delivers data from the backend.

#### params: 
* `Path`: String - The path we want to get data from

```javascript
// ### GET data e.g. an array of customers ###
app.apiCall.get(`${apiPath}/customers`).then(
    (response) => {
        // ### place the data ###
        this.app.data.customers = localDatabase(response);
    },
    (error) => {
        // ### error holds the error object from fetch ###
        console.log(error);
    }
);
```
## post()
The POST method used to create new data.

#### params: 
* `Path`: String - The path we want to send data to
* `Payload`: Object - the data to create with

```javascript
// ### POST data - like when creating an ocurrence ###
let dto = {
    'lastName': "Oakenfold",
    'firstName': "Paul",
}

app.apiCall.post(`${apiPath}/customers`,dto).then(
    (response) => {
        // ### do something with the response ###
    },
    (error) => {
        // ### error holds the error object from fetch ###
        console.log(error);
    }
);
```
## put()
The PUT method used to create new data.

#### params: 
* `Path`: String- The path we want to send data to
* `Payload`: Object - the data to create with

```javascript
// ### PUT data - like when creating an ocurrence ###
let dto = {
    'lastName': "Schumcher",
    'firstName': "Thomas",
}

app.apiCall.put(`${apiPath}/customers`,dto).then(
    (response) => {
        // ### do something with the response ###
    },
    (error) => {
        // ### error holds the error object from fetch ###
        console.log(error);
    }
);
```
## patch()
The PATCH method used to update data.

#### params: 
* `Path`: String- The path we want to send data to
* `Payload`: Object - the data to update to

```javascript
// ### PATCH data - like when creating an ocurrence ###
let dto = {
    'lastName': "Löffel",
    'firstName': "Markus",
}

app.apiCall.patch(`${apiPath}/customers/c2135`,dto).then(
    (response) => {
        // ### do something with the response ###
    },
    (error) => {
        // ### error holds the error object from fetch ###
        console.log(error);
    }
);
```
## delete()
The DELETE method used to remove data.

#### params: 
* `Path`: String- The path we want to send data to
* `Payload`: Object - the data used to delete something

```javascript
// ### DELETE data ###
let dto = {
    'lastName': "Gerdes",
    'firstName': "Hans Peter",
}

app.apiCall.patch(`${apiPath}/customers/c8261`,dto).then(
    (response) => {
        // ### do something with the response ###
    },
    (error) => {
        // ### error holds the error object from fetch ###
        console.log(error);
    }
);
```
