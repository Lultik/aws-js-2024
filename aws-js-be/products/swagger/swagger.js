// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "products",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Get list of all products",
            "schema": {
              "$ref": "#/definitions/ProductList"
            }
          },
          "404": {
            "description": "Products not found"
          },
          "500": {
            "description": "Internal server error"
          },
          "default": {
            "description": "default response"
          }
        }
      }
    },
    "/products/{id}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get.products/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Get product by ID",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "404": {
            "description": "Product not found"
          },
          "500": {
            "description": "Internal server error"
          },
          "default": {
            "description": "default response"
          }
        }
      }
    },
    "/products/": {
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post.products/",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/CreateProductBody"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Product created",
            "schema": {
              "$ref": "#/definitions/AvailableProduct"
            }
          },
          "400": {
            "description": "Body is not valid"
          },
          "500": {
            "description": "Internal server error"
          },
          "default": {
            "description": "default response"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        },
        "imageName": {
          "title": "Product.imageName",
          "type": "string"
        }
      },
      "required": [
        "description",
        "title",
        "id",
        "price",
        "imageName"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "Stock": {
      "properties": {
        "id": {
          "title": "Stock.id",
          "type": "string"
        },
        "count": {
          "title": "Stock.count",
          "type": "number"
        }
      },
      "required": [
        "id",
        "count"
      ],
      "additionalProperties": false,
      "title": "Stock",
      "type": "object"
    },
    "ProductList": {
      "items": {
        "$ref": "#/definitions/Product"
      },
      "title": "ProductList",
      "type": "array"
    },
    "AvailableProduct": {
      "allOf": [
        {
          "$ref": "#/definitions/Product"
        },
        {
          "$ref": "#/definitions/Stock"
        }
      ],
      "title": "AvailableProduct"
    },
    "CreateProductBody": {
      "properties": {
        "description": {
          "title": "CreateProductBody.description",
          "type": "string"
        },
        "title": {
          "title": "CreateProductBody.title",
          "type": "string"
        },
        "price": {
          "title": "CreateProductBody.price",
          "type": "number"
        },
        "count": {
          "title": "CreateProductBody.count",
          "type": "number"
        }
      },
      "required": [
        "description",
        "title",
        "price"
      ],
      "additionalProperties": false,
      "title": "CreateProductBody",
      "type": "object"
    }
  },
  "securityDefinitions": {}
};