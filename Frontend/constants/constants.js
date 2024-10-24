const PORT=8080;
const SERVER="localhost";
const API_PATH = "api/v1/product"
export const ENDPOINT_PRODUCT_URL=`http://${SERVER}:${PORT}/${API_PATH}`;

export const HTTP_STATUS = {
    CREATED: 201,
    OK: 200,
};

export const PRODUCT_TYPE = {
    MATERIAL: "MATERIAL",
    DIGITAL: "DIGITAL",
};