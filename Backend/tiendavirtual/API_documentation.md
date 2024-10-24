# API Documentation

## 1. Get All Products

- **URL**: `/api/v1/product`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.

### Parameters

This endpoint does not require any parameters in the request.

### Request Body

No body is required for this request.

### Response

- **Code 200**: If the request is successful, a list of products is returned.

#### Example Successful Response

```json
[
    {
        "id": 1,
        "code": "123458",
        "name": "LAPTOP",
        "productType": "MATERIAL",
        "downloadLink": null,
        "tax": 5.0
    },
    {
        "id": 2,
        "code": "123459",
        "name": "Video",
        "productType": "DIGITAL",
        "downloadLink": "https://www.doceleguas.com/download",
        "tax": 0
    }
]

```

## 2. Insert New Product

- **URL**: `/api/v1/product`
- **Method**: `POST`
- **Description**: Inserts a new product into the system.

### Response

- **Code 201**: If the request is successful, the new product is returned.


### Request Body

The request body must be a JSON object. The structure of the object depends on the type of product being inserted.

#### For MATERIAL Product

```json
{
    "code": "AD34",
    "name": "Laptop",
    "productType": "MATERIAL",
    "tax": 5
}
```
#### For DIGITAL Product

```json
{
    "code": "BY45",
    "name": "Music",
    "productType": "DIGITAL",
    "downloadLink": "https://www.doceleguas.com/download"
}
```

## 3. Update Product

- **URL**: `/api/v1/product/{code}`
- **Method**: `PUT`
- **Description**: Updates the details of a specific product identified by the product code.

### Parameters

- **code** (path parameter): The unique code of the product to be updated. This should be included in the URL.

### Response

- **Code 200**: If the request is successful, the updated product is returned.


### Request Body

The request body must contain the following fields depending on the type of product:

#### For MATERIAL
In case you want to change productType to DIGITAL you should include productType and downloadLink fields.
If you want to change productType to MATERIAL you should include productType and tax fields. 
If not, only necessary fields like name, tax, downloadLink

```json
{
    "name": "NEW NAME",
    "productType": "DIGITAL",
    "downloadLink": "https://www.doceleguas.com/download"
}
```
#### For DIGITAL
```json
{
    "name": "NEW NAME",
    "productType": "MATERIAL",
    "tax": 1.25
}
```

## 4. Delete Product

- **URL**: `/api/v1/product/{code}`
- **Method**: `DELETE`
- **Description**: Delete a specific product identified by the product code.

### Parameters

- **code** (path parameter): The unique code of the product to be deleted. This should be included in the URL.

### Response

- **Code 200**: If the request is successful, no data is returned.

### Request Body

This endpoint does not require a request body.



`Emanuel Avellon Lopez | Cuba | Oct, 2024
Thanks 👨🏻‍💻!`
