# api-products
api para demo de productos con login

## Url Api
```
https://api-products-nu.vercel.app/
```

## Endpoints
### Users
#### Register
```
/user/register
```
- Registra un usuario recibe el siguiente json
```
{
 "name": "string",
 "email": "string",
 "password": "string"
}
```
- Devuelve
```
{
 "msg": "usuario registrado"
}
```
#### Login
```
/user/login
```
- Logea un usuario recibe este json
```
{
 "email": "string",
 "password": "string"
}
```
- Devuelve
```
{
 "msg": "Bienvenido",
 "token": "token"
}
```
#### Get User Data
```
/user/getuser
```
- Recibe un header de autorizacion tipo Bearer
```
Authorization > "Bearer token"
```
- retorna los datos dem usuario
### Products
