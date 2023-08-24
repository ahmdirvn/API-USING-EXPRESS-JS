# TODO API BUILD WITH EXPRESS JS

Projek ini menggunakan bahasa pemrogaman utama java script dengan framework backend express dan untuk database menggunakan mysql.kemudian menggunakan bcrypt java script untuk hash password dan menggunakan JWT (json web token) ntuk authentikasi user 


#### INSTALASI
- npm init -y
- npm i express
- npm i bcrypt
- npm i nodemon
- npm i json web token
- npm run dev (running)

#### CONTENT 
- POST REGISTER USER
- POST LOGIN USER 
- POST OR CREATE TODO
- GET OR READ TODO
- PUT OR UPDATE TODO
- DELETE OR DELETE TODO


##### POST OR REGISTER USER 

- REQUEST
```sh
http://localhost:10000/api/v1/user/register
```

```sh
{
    "name" : "ahmadirvan",
    "email" : "ahmadirvan9c@gmail.com",
    "password" : "123456"
}
```
- RESPONSE

```sh
{
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 11,
        "warningStatus": 0
    }
}
```



##### POST OR LOGIN USER 


- REQUEST
```sh
http://localhost:10000/api/v1/user/login
```
```sh
{
    "email" : "ahmadirvan9c@gmail.com",
    "password" : "123456"
}
```
- RESPONSE

```sh
    "user": {
        "id": 10,
        "name": "ahmadirvan",
        "email": "ahmadirvan9c@gmail.com",
        "password": "$2b$10$/.xWJirtPHLM9.OYldhb/eisznz5uB.VZUlqvdhEYkXiZWyH29umS",
        "createdAt": "2023-08-23 21:32:42",
        "updatedAt": "2023-08-23 21:32:42"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJhaG1hZGlydmFuIiwiZW1haWwiOiJhaG1hZGlydmFuOWNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkLy54V0ppcnRQSExNOS5PWWxkaGIvZWlzem56NXVCLlZaVWxxdmRoRVlrWGlaV3lIMjl1bVMiLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTIzIDIxOjMyOjQyIiwidXBkYXRlZEF0IjoiMjAyMy0wOC0yMyAyMTozMjo0MiIsImlhdCI6MTY5MjgzNjEyMX0.mwnuS7qc-6HT1YCn6Z_OnPMm6w6fMlzpktbW3W74FZo"
}
```


#### Gunakan Token untuk melakukan aksi CRUD dengan menempatkan pada bagian headers degan key bearer dan value nya token



##### POST OR CREATE TODO


- REQUEST
```sh
http://localhost:10000/api/v1/task/
```
```sh
{
    "title" : "kamis",
    "description" : "janganlupa istirahat"
}
```
- RESPONSE
```sh
   {
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 7,
        "warningStatus": 0
    }
}
```


##### GET OR READ TODO


- REQUEST
```sh
http://localhost:10000/api/v1/task/6  (by id)
```
```sh
http://localhost:10000/api/v1/task/ (all data)
```
- RESPONSE
```sh
{
    "status": true,
    "data": [
        {
            "id": 5,
            "userId": null,
            "title": "rabu",
            "description": "janganlupa istirahat",
            "createdAt": "2023-08-23 21:19:47",
            "updatedAt": "2023-08-23 21:19:47"
        },
        {
            "id": 6,
            "userId": null,
            "title": "kamis",
            "description": "janganlupa istirahat",
            "createdAt": "2023-08-23 22:53:00",
            "updatedAt": "2023-08-23 22:53:00"
        },
        {
            "id": 7,
            "userId": null,
            "title": "kamis",
            "description": "janganlupa istirahat",
            "createdAt": "2023-08-24 07:18:03",
            "updatedAt": "2023-08-24 07:18:03"
        }
    ]
}
```

##### PUT OR UPDATE TODO


- REQUEST
```sh
http://localhost:10000/api/v1/task/6
```
```sh
{
    "title":"selasa",
    "description" : "update hari selasa"
} 
```
- RESPONSE
```sh
   {
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    }
}
```


##### DELETE OR DELETE TODO


- REQUEST

```sh
http://localhost:10000/api/v1/task/6
```
- RESPONSE
```sh
  {
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    }
}
```




