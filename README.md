# Anywhere Fitness API

#### Heroku deployment https://anywhere-fitness.herokuapp.com/

### What is Anywhere Fitness?

Today fitness happens everywhere and today's fitness instructors need a convenient way to create classes, accept payments and manage class attendance. Anywhere Fitness is designed to solve this problem. Fitness Instructor now have the power to create and manage classes and accept payments in the palm of their hands. 

---

### Start Server

run `yarn server` or `yarn start`



## Schema



#### Users Table

| name       | type    | required | description            | unique |
|------------|---------|----------|------------------------|--------|
| username   | string  | yes      |  user name             | yes    |
| password   | string  | yes      | user password          | no     |
| instructor | boolean | yes      | is user an instructor? | no     |


#### Classes Table

| name     | type   | required | description                | unique |
|----------|--------|----------|----------------------------|--------|
| name     | string | yes      | class name                 | no     |
| location | string | yes      | location of class          | no     |
| schedule | string | yes      | what is the class schedule | no     |
| image    | string | no       | image for class            | no     |

#### Users Classes Table

| name           | type    | required | description                                              | unique |
|----------------|---------|----------|----------------------------------------------------------|--------|
| user_id        | integer | yes      | id of user associated with class                         | yes    |
| class_id       | integer | yes      | id of class associated with user                         | yes    |
| uses_remaining | integer | yes      | number of classes a user has remaining on their purchase | no     |



## Endpoints



#### Headers

| name          | type   | required | description                              |
|---------------|--------|----------|------------------------------------------|
| Content-type  | string | yes      | must be application/json                 |
| Authorization | string | yes      | must be token received on login/register |



## Authorization


#### POST Register
`https://anywhere-fitness.herokuapp.com/auth/register`

```js
{
	"username": "new_user",
	"password": "pass",
	"instructor": true
}
```

#### POST Login
`https://anywhere-fitness.herokuapp.com/auth/login`
```js
{
	"username": "new_user",
	"password": "pass"
}
```

#### On Login and Register You Will Receive a Token

```js
{
  "id": 3,
  "instructor": false
  "token": "eyJhbGciOiJ3ODQ0MX0.6es5Q9hZJw5U8a5EyWucbMM60xRoGX5_U3kQQ5BVPH0"
}
```


#### GET Classes
`https://anywhere-fitness.herokuapp.com/classes`

```js
[
  {
    "id": 1,
    "name": "CrossFit",
    "schedule": "Thursday & Saturday 11:00 AM",
    "location": "123 Main Street",
    "image": null,
    "instructor_id": 1
  },
  {
    "id": 2,
    "name": "Tai-Chi",
    "schedule": "Saturday 11:00 AM",
    "location": "456 Parker Ave",
    "image": null,
    "instructor_id": 3
  }
]
  ```
#### GET Classes by ID  
`https://anywhere-fitness.herokuapp.com/classes/:id`

```js
  {
    "id": 1,
    "name": "CrossFit",
    "schedule": "Thursday & Saturday 11:00 AM",
    "location": "123 Main Street",
    "image": null,
    "instructor_id": 1
  }
  ```


#### GET Clients by Class ID
`https://anywhere-fitness.herokuapp.com/classes/:id/list`

On Success Returns Array of Users

```js
[
  {
    "id": 2,
    "username": "workout_warrior_1",
    "uses_remaining": 10
  }
]
```

#### GET Classes by Instructor
`https://anywhere-fitness.herokuapp.com/classes/instructor/:id`
```js
[
  {
    "name": "CrossFit",
    "username": "instructor",
    "schedule": "Thursday & Saturday 11:00 AM",
    "location": "123 Main Street",
    "image": null,
    "id": 1
  },
  {
    "name": "Yoga",
    "username": "instructor",
    "schedule": "Sunday 9:00 AM",
    "location": "1600 Fox Drive",
    "image": null,
    "id": 3
  }
]
```

#### GET Classes by Client
`https://anywhere-fitness.herokuapp.com/classes/client/:id`

Returns an Array of All Classes Signed up by the Client add id for the client in the URL
```js
[
  {
    "name": "CrossFit",
    "schedule": "Thursday & Saturday 11:00 AM",
    "location": "123 Main Street",
    "uses_remaining": 10,
    "image": null,
    "id": 1,
    "user_id": 2
  },
  {
    "name": "Yoga",
    "schedule": "Sunday 9:00 AM",
    "location": "1600 Fox Drive",
    "uses_remaining": 10,
    "image": null,
    "id": 3,
    "user_id": 2
  },
  {
    "name": "Pilates",
    "schedule": "MWF 11:00 AM",
    "location": "123 Main Street",
    "uses_remaining": 10,
    "image": null,
    "id": 4,
    "user_id": 2
  }
]
```

#### POST Add Class
`https://anywhere-fitness.herokuapp.com/classes`
```js

{
	"name" : "KickBoxing",
	"schedule" : "Tues & Thurs 3PM",
	"location": "201 Baker St"
}
```

#### POST ADD Client to Class By ID

`https://anywhere-fitness.herokuapp.com/classes/add/:id`

Returns an Array of Classes for the `user_id` provided

Include `user_id` in the Body of the Request and Class ID in the URL

```js
{
	"user_id": 2
}
```

#### DELETE Class
`https://anywhere-fitness.herokuapp.com/classes/:id`

Returns an Array of All Classes Remaining

On Success
```js
{
  "message": "class deleted"
}
```
On Failure
```js
{
  "message": "error removing class either not authorized or class does not exist"
}
```

#### DELETE Class By Instructor ID
`https://anywhere-fitness.herokuapp.com/classes/instructor/:id/remove`

Send the Class You Want to Delete in the Body of the Request and Send Instructor ID in URL

```js
{
	"id": 4
}
```

Returns an Array of All Classes By Instructor

```js
[
  {
    "name": "CrossFit",
    "username": "instructor",
    "schedule": "Thursday & Saturday 11:00 AM",
    "location": "123 Main Street",
    "image": null,
    "id": 1
  }
]
```
#### DELETE Client From Class by Class ID For CLIENTS
`https://anywhere-fitness.herokuapp.com/classes/remove/:id/client`

Returns an Array of Classes That Client is Signed up for

Send Class ID in the URL String and the User ID in the Body of the Request

```js
{
	"user_id": 4
}
```
#### DELETE Client From Class by Class ID For INSTRUCTORS
`https://anywhere-fitness.herokuapp.com/classes/remove/:id/instructor`

Returns an Array of Clients Signed up for Class Based on ID Provided in URL

Send Class ID in the URL String and the User ID in the Body of the Request

```js
{
	"user_id": 3
}
```

#### PUT Update Uses Remaining By Class ID
`https://anywhere-fitness.herokuapp.com/classes/:id/list/update`

Send `user_id` and `uses_remaining` in the Body of the Request and Class ID in URL

Returns an Array of Clients Signed up for the Class Based on ID Provided


```js
{
	"user_id": 4,
	"uses_remaining": 8
}
```
