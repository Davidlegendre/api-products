# api-products
api para demo de productos con login

## Url Api
```
https://api-products-nu.vercel.app/
```

## Endpoints
### Users
#### Register POST
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
#### Login POST
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
#### Get User Data GET
```
/user/getuser
```
- Recibe un header de autorizacion tipo Bearer
```
Authorization > "Bearer token"
```
- retorna los datos del usuario

### Products
#### Registrar POST
```
/products/create
```
- recibe este json
```
{
 "productName": "string",
 "description": "string",
 "price": number
}
```
- recibe un header de autorizacion del token
- devuelve el producto creado

#### Obtener todos GET
```
/products/
```
- retorna todos los productos
- recibe una autorizacion en el header del token

#### Obtener uno GET
```
/products/getone/:id
```
- retorna el producto segun su id
- recibe una autorizacion en el header del token

#### Modificar uno PATCH
```
/products/update/:id
```
- modifica un producto segun su id
- recibe el mismo json que el de registrar
- devuelve el producto modificado
- recibe una autorizacion en el header del token

#### Eliminar uno DELETE
```
/products/delete/:id
```
- elimina un producto segun su id
- retorna un mensaje diciendo que se elimino
- recibe una autorizacion en el header del token
