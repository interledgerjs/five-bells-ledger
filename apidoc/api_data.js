define({ "api": [
  {
    "type": "get",
    "url": "/accounts/:name",
    "title": "Get Account",
    "name": "GetAccount",
    "group": "Account_Methods",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": "<p>Credentials to access the account. By default, only the account owner and admin can see details including account balance.</p>"
          }
        ]
      }
    },
    "description": "<p>Get information about an account.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The unique name for this account.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Get account",
        "content": "curl -X GET -H \"Authorization: Basic YWxpY2U6YWxpY2U=\" http://usd-ledger.example/accounts/alice",
        "type": "shell"
      }
    ],
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Object",
            "optional": false,
            "field": "Account",
            "description": "<p>The requested <a href=\"#account_object\">Account object</a>. If the request was <a href=\"#authentication\">authenticated</a> as the account owner or an admin, the response includes additional fields such as the account balance.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 Authenticated Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"http://usd-ledger.example/accounts/alice\",\n  \"name\": \"alice\",\n  \"balance\": \"100\",\n  \"is_disabled\": false\n}",
          "type": "json"
        },
        {
          "title": "200 Unauthenticated Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"http://usd-ledger.example/accounts/alice\",\n  \"name\": \"alice\",\n  \"ledger\": \"http://usd-ledger.example/USD\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/accounts.js",
    "groupTitle": "Account_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource could not be found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"id\": \"NotFoundError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/accounts/:name",
    "title": "Create or Update Account",
    "name": "PutAccount",
    "group": "Account_Methods",
    "version": "1.0.0",
    "description": "<p>Create or update a user. Only admins are allowed to create new accounts.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Account's unique identifier</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Put account",
        "content": "curl -X PUT -H \"Authorization: Basic YWxpY2U6YWxpY2U=\" \\\n-H \"Content-Type: application/json\" \\\n-d '{\"name\": \"alice\", \"balance\": \"100\"}' \\\nhttp://usd-ledger.example/accounts/alice",
        "type": "shell"
      }
    ],
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "Object",
            "optional": false,
            "field": "Account",
            "description": "<p>The newly-created <a href=\"#account_object\">Account object</a>, as saved.</p>"
          }
        ],
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Object",
            "optional": false,
            "field": "Account",
            "description": "<p>The updated <a href=\"#account_object\">Account object</a>, as saved.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 Get Account Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"http://usd-ledger.example/accounts/alice\",\n  \"name\": \"alice\",\n  \"balance\": \"100\",\n  \"is_disabled\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/accounts.js",
    "groupTitle": "Account_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>You do not have permissions to access this resource.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidBodyError",
            "description": "<p>The submitted JSON entity does not match the required schema.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnauthorizedError",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"id\": \"UnauthorizedError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        },
        {
          "title": "InvalidBodyError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidBodyError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/websocket",
    "title": "[Websocket] Subscribe to Account Notifications",
    "name": "SubscribeAccountNotifications",
    "group": "Account_Methods",
    "version": "1.0.0",
    "description": "<p>Subscribe to an account's real-time notifications via WebSocket.</p>",
    "examples": [
      {
        "title": "Subscribe to account transfers",
        "content": "wscat --auth alice:alice -c ws://usd-ledger.example/websocket",
        "type": "shell"
      },
      {
        "title": "Subscribe account (request)",
        "content": "{\n  \"jsonrpc\": \"2.0\",\n  \"id\": 1,\n  \"method\": \"subscribe_account\",\n  \"params\": {\n    \"eventType\": \"*\",\n    \"accounts\": [\"http://usd-ledger.example/accounts/alice\"]\n  }\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "101 Switching Protocols": [
          {
            "group": "101 Switching Protocols",
            "type": "None",
            "optional": false,
            "field": "...",
            "description": "<p>This methods opens a WebSocket connection with the server. There is no immediate response after opening the connection.</p>"
          }
        ],
        "Additional Messages": [
          {
            "group": "Additional Messages",
            "type": "Object",
            "optional": false,
            "field": "RpcRequest",
            "description": "<p>or RpcResponse; Notifications about the change in the state of any transfer that affects this account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Initial connection",
          "content": "HTTP/1.1 101 Switching Protocols",
          "type": "json"
        },
        {
          "title": "On connect",
          "content": "{\n  \"jsonrpc\": \"2.0\",\n  \"id\": null,\n  \"method\": \"connect\"\n}",
          "type": "json"
        },
        {
          "title": "Push transfer notification",
          "content": "{\n  \"jsonrpc\": \"2.0\",\n  \"id\": null,\n  \"method\": \"notify\",\n  \"params\": {\n    \"event\": \"transfer.update\",\n    \"resource\":{\n      \"debits\":[\n        {\n          \"account\":\"http://usd-ledger.example/accounts/alice\",\n          \"amount\":\"0.01\",\n          \"authorized\":true\n        }\n      ],\n      \"credits\":[\n        {\n          \"account\":\"http://usd-ledger.example/accounts/bob\",\n          \"amount\":\"0.01\"\n        }\n      ],\n      \"id\":\"http://usd-ledger.example/transfers/4f122511-989d-101e-f938-573993b75e22\",\n      \"ledger\":\"http://usd-localhost.example\",\n      \"state\":\"executed\",\n      \"timeline\":{\n        \"proposed_at\":\"2016-04-27T17:57:27.037Z\",\n        \"prepared_at\":\"2016-04-27T17:57:27.054Z\",\n        \"executed_at\":\"2016-04-27T17:57:27.060Z\"\n      }\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Push message notification",
          "content": "{\n  \"jsonrpc\": \"2.0\",\n  \"id\": null,\n  \"method\": \"notify\",\n  \"params\": {\n    \"event\": \"message.send\",\n    \"resource\":{\n      \"ledger\": \"http://usd-localhost.example\",\n      \"from\": \"http://usd-localhost.example/accounts/alice\",\n      \"to\": \"http://usd-localhost.example/accounts/bob\",\n      \"data\": { \"foo\": \"bar\" }\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Subscribe account (response)",
          "content": "{\n  \"jsonrpc\": \"2.0\",\n  \"id\": 1,\n  \"result\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Subscribe account (response)",
          "content": "{\n  \"jsonrpc\": \"2.0\",\n  \"id\": 1,\n  \"error\": {\n    \"code\": 4000,\n    \"message\": \"RpcError\",\n    \"data\": \"Invalid id\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/accounts.js",
    "groupTitle": "Account_Methods"
  },
  {
    "type": "get",
    "url": "/auth_token",
    "title": "Get Auth Token",
    "name": "GetAuthToken",
    "group": "Auth_Tokens",
    "version": "1.0.0",
    "description": "<p>Get a token that can be used to authenticate future requests.</p>",
    "examples": [
      {
        "title": "Get Auth Token",
        "content": "curl -X GET -H \"Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l\"\nhttp://usd-ledger.example/auth_token",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 Token Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ \"token\": \"9AtVZPN3t49Kx07stO813UHXv6pcES\" }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/authTokens.js",
    "groupTitle": "Auth_Tokens",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>You do not have permissions to access this resource.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnauthorizedError",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"id\": \"UnauthorizedError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/messages",
    "title": "Send Message",
    "name": "SendMessage",
    "group": "Message_Methods",
    "version": "1.0.0",
    "description": "<p>Send a message to another account. This is not a reliable delivery mechanism.</p>",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Message",
            "optional": false,
            "field": "Object",
            "description": "<p>A <a href=\"#message_object\">Message object</a> to be forwarded to the recipient.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Send a Message",
        "content": "curl -X POST -H \"Content-Type: application/json\" -d \\\n'{\n  \"ledger\": \"http://usd-ledger.example\",\n  \"from\": \"http://usd-ledger.example/accounts/alice\",\n  \"to\": \"http://usd-ledger.example/accounts/bob\",\n  \"data\": { \"foo\": \"bar\" }\n}' \\\nhttp://usd-ledger.example/messages",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "201 Message Accepted Response:",
          "content": "HTTP/1.1 201 CREATED",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/messages.js",
    "groupTitle": "Message_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidBodyError",
            "description": "<p>The submitted JSON entity does not match the required schema.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoSubscriptionsError",
            "description": "<p>Destination account could not be reached</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidBodyError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidBodyError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        },
        {
          "title": "NoSubscriptionsError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"NoSubscriptionsError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get Server Metadata",
    "name": "GetMetadata",
    "group": "Metadata_Methods",
    "version": "1.0.0",
    "description": "<p>This endpoint will return server metadata.</p>",
    "examples": [
      {
        "title": "Get Metadata",
        "content": "curl http://usd-ledger.example/",
        "type": "shell"
      }
    ],
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "String",
            "optional": true,
            "field": "currency_code",
            "description": "<p>Three-letter (<a href=\"http://www.xe.com/iso4217.php\">ISO 4217</a>) code of the currency this ledger tracks.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": true,
            "field": "currency_symbol",
            "description": "<p>Currency symbol to use in user interfaces for the currency represented in this ledger. For example, &quot;$&quot;.</p>"
          },
          {
            "group": "200 OK",
            "type": "Integer",
            "optional": false,
            "field": "precision",
            "description": "<p>How many total decimal digits of precision this ledger uses to represent currency amounts.</p>"
          },
          {
            "group": "200 OK",
            "type": "Integer",
            "optional": false,
            "field": "scale",
            "description": "<p>How many digits after the decimal place this ledger supports in currency amounts.</p>"
          },
          {
            "group": "200 OK",
            "type": "Object",
            "optional": false,
            "field": "urls",
            "description": "<p>Paths to other methods exposed by this ledger</p>"
          },
          {
            "group": "200 OK",
            "type": "(Various)",
            "optional": false,
            "field": "...",
            "description": "<p>The ledger may report additional arbitrary parameters as desired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"currency_code\": null,\n    \"currency_symbol\": null,\n    \"condition_sign_public_key\": \"YNDefwo4LB+AjkCRzuCSGuAlDLvSCWUxPRX7lXLhV1I=\",\n    \"urls\": {\n        \"health\": \"http://usd-ledger.example/health\",\n        \"transfer\": \"http://usd-ledger.example/transfers/:id\",\n        \"transfer_fulfillment\": \"http://usd-ledger.example/transfers/:id/fulfillment\",\n        \"transfer_rejection\": \"http://usd-ledger.example/transfers/:id/rejection\",\n        \"transfer_state\": \"http://usd-ledger.example/transfers/:id/state\",\n        \"accounts\": \"http://usd-ledger.example/accounts\",\n        \"account\": \"http://usd-ledger.example/accounts/:name\",\n        \"auth_token\": \"http://usd-ledger.example/auth_token\",\n        \"websocket\": \"ws://usd-ledger.example/websocket\",\n        \"message\": \"http://usd-ledger.example/messages\"\n    },\n    \"precision\": 10,\n    \"scale\": 2,\n    \"connectors\": [\n        {\n            \"id\": \"http://usd-ledger.example/accounts/chloe\",\n            \"name\": \"chloe\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/metadata.js",
    "groupTitle": "Metadata_Methods"
  },
  {
    "type": "get",
    "url": "/transfers/:id",
    "title": "Get Transfer by ID",
    "name": "GetTransfer",
    "group": "Transfer_Methods",
    "version": "1.0.0",
    "description": "<p>Use this to query about the details or status of a local transfer.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Transfer <a href=\"http://en.wikipedia.org/wiki/Universally_unique_identifier\">UUID</a>.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Get a transfer",
        "content": "curl -X GET http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204",
        "type": "shell"
      }
    ],
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Transfer",
            "optional": false,
            "field": "Object",
            "description": "<p>The <a href=\"#transfer_object\">Transfer object</a> as saved.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Transfer Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204\",\n  \"ledger\": \"http://usd-ledger.example\",\n  \"debits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/alice\",\n    \"amount\": \"50\"\n  }],\n  \"credits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/bob\",\n    \"amount\": \"50\"\n  }],\n  \"execution_condition\": \"ni:///sha-256;8ZdpKBDUV-KX_OnFZTsCWB_5mlCFI3DynX5f5H2dN-Y?fpt=preimage-sha-256&cost=32\",\n  \"expires_at\": \"2015-06-16T00:00:01.000Z\",\n  \"state\": \"executed\",\n  \"timeline\": {\n    \"proposed_at\": \"2015-06-16T00:00:00.000Z\",\n    \"prepared_at\": \"2015-06-16T00:00:00.500Z\",\n    \"executed_at\": \"2015-06-16T00:00:00.999Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/transfers.js",
    "groupTitle": "Transfer_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource could not be found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"id\": \"NotFoundError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/transfers/:id/fulfillment",
    "title": "Get Transfer Fulfillment",
    "name": "GetTransferFulfillment",
    "group": "Transfer_Methods",
    "version": "1.0.0",
    "description": "<p>Retrieve the fulfillment for a transfer that has been executed or cancelled. This is separate from the Transfer object because it can be very large.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Transfer <a href=\"http://en.wikipedia.org/wiki/Universally_unique_identifier\">UUID</a>.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Get Transfer Fulfillment:",
        "content": "curl -X GET\nhttp://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204/fulfillment",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 Fulfillment Response:",
          "content": "HTTP/1.1 200 OK\noAKAAA",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/transfers.js",
    "groupTitle": "Transfer_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>The requested resource could not be found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"id\": \"NotFoundError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/transfers/:id/state",
    "title": "Get Signed Transfer State",
    "name": "GetTransferState",
    "group": "Transfer_Methods",
    "version": "1.0.0",
    "description": "<p>Use this to get a signed receipt containing only the id of transfer and its state. It functions even if the transfer doesn't exist yet. If the transfer doesn't exist it will have the state <code>&quot;nonexistent&quot;</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Transfer <a href=\"http://en.wikipedia.org/wiki/Universally_unique_identifier\">UUID</a>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The signature type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "condition_state",
            "description": "<p>The state to hash for preimage algorithms' conditions.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Get a transfer state receipt",
        "content": "curl -X GET http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204/state",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Transfer State Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\":\n    {\n      \"id\": \"http://localhost/transfers/03b7c787-e104-4390-934e-693072c6eda2\",\n      \"state\": \"nonexistent\"\n    },\n  \"type\": \"ed25519-sha512\",\n  \"signer\": \"http://localhost\",\n  \"public_key\": \"9PAqTUEptSeQCOp/0FQTm3rkFnUFaYEUEwCcyyySQP0=\",\n  \"signature\": \"DPHsnt3/5gskzs+tF8LNne/3p9ZqFFWNO+mvUlol8geh3VeErLE3o3bKkiSLg890/SFIeUDtvHL3ruiZRcOFAQ==\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/transfers.js",
    "groupTitle": "Transfer_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/transfers/:id",
    "title": "Propose or Prepare Transfer",
    "name": "PutTransfer",
    "group": "Transfer_Methods",
    "version": "1.0.0",
    "description": "<p>Creates or updates a Transfer object. The transfer is &quot;proposed&quot; if it contains debits that do not have <code>&quot;authorized&quot;: true</code>. To set the <code>authorized</code> field, call this method <a href=\"#authentication\">authenticated</a> as owner of the account to be debited, or as an admin. The transfer is &quot;prepared&quot; when all debits have been authorized. When a transfer becomes prepared, it executes immediately if there is no condition. If an <code>execution_condition</code> is specified, the funds are held until a <a href=\"#api-Transfer_Methods-PutTransferFulfillment\">matching fulfillment is submitted</a> or the <code>expires_at</code> time is reached.</p>",
    "parameter": {
      "fields": {
        "URL Params": [
          {
            "group": "URL Params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A new <a href=\"http://en.wikipedia.org/wiki/Universally_unique_identifier\">UUID</a> to identify this Transfer.</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Transfer",
            "optional": false,
            "field": "Object",
            "description": "<p>A <a href=\"#transfer_object\">Transfer object</a> to describe the transfer that should take place. For a conditional transfer, this includes an <code>execution_condition</code>. The <code>authorized</code> field of each debit object must be set to <code>true</code> before the transfer can occur.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Propose a Transfer",
        "content": "curl -X PUT -H \"Content-Type: application/json\" -d \\\n'{\n  \"id\": \"http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204\",\n  \"ledger\": \"http://usd-ledger.example\",\n  \"debits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/alice\",\n    \"amount\": \"50\"\n  }],\n  \"credits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/bob\",\n    \"amount\": \"50\"\n  }],\n  \"execution_condition\": \"ni:///sha-256;8ZdpKBDUV-KX_OnFZTsCWB_5mlCFI3DynX5f5H2dN-Y?fpt=preimage-sha-256&cost=32\",\n  \"expires_at\": \"2015-06-16T00:00:01.000Z\"\n}' \\\nhttp://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204",
        "type": "shell"
      },
      {
        "title": "Prepare a Transfer",
        "content": "curl -X PUT -H \"Content-Type: application/json\" -H \"Authorization: Basic YWxpY2U6YWxpY2U=\" -d \\\n'{\n  \"id\": \"http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204\",\n  \"ledger\": \"http://usd-ledger.example\",\n  \"debits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/alice\",\n    \"amount\": \"50\",\n    \"authorized\": true\n  }],\n  \"credits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/bob\",\n    \"amount\": \"50\"\n  }],\n  \"execution_condition\": \"ni:///sha-256;8ZdpKBDUV-KX_OnFZTsCWB_5mlCFI3DynX5f5H2dN-Y?fpt=preimage-sha-256&cost=32\",\n  \"expires_at\": \"2015-06-16T00:00:01.000Z\"\n}' \\\nhttp://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204",
        "type": "shell"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be <code>application/json</code>.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": "<p>To control the <code>authorized</code> field of a debit, the user must be <a href=\"#authentication\">authenticated</a>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "Transfer",
            "optional": false,
            "field": "Object",
            "description": "<p>The newly-created <a href=\"#transfer_object\">Transfer object</a> as saved.</p>"
          }
        ],
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Transfer",
            "optional": false,
            "field": "Object",
            "description": "<p>The updated <a href=\"#transfer_object\">Transfer object</a> as saved.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 New Proposed Transfer Response",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": \"http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204\",\n  \"ledger\": \"http://usd-ledger.example\",\n  \"debits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/alice\",\n    \"amount\": \"50\"\n  }],\n  \"credits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/bob\",\n    \"amount\": \"50\"\n  }],\n  \"execution_condition\": \"ni:///sha-256;8ZdpKBDUV-KX_OnFZTsCWB_5mlCFI3DynX5f5H2dN-Y?fpt=preimage-sha-256&cost=32\",\n  \"expires_at\": \"2015-06-16T00:00:01.000Z\",\n  \"state\": \"proposed\"\n}",
          "type": "json"
        },
        {
          "title": "200 Prepared Transfer Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"http://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204\",\n  \"ledger\": \"http://usd-ledger.example\",\n  \"debits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/alice\",\n    \"amount\": \"50\",\n    \"authorized\": true\n  }],\n  \"credits\": [{\n    \"account\": \"http://usd-ledger.example/accounts/bob\",\n    \"amount\": \"50\"\n  }],\n  \"execution_condition\": \"ni:///sha-256;8ZdpKBDUV-KX_OnFZTsCWB_5mlCFI3DynX5f5H2dN-Y?fpt=preimage-sha-256&cost=32\",\n  \"expires_at\": \"2015-06-16T00:00:01.000Z\",\n  \"state\": \"prepared\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/transfers.js",
    "groupTitle": "Transfer_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InsufficientFundsError",
            "description": "<p>The source account does not have sufficient funds to satisfy the request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The provided entity is syntactically correct, but there is a generic semantic problem with it.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExistsError",
            "description": "<p>The specified entity already exists and may not be modified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidBodyError",
            "description": "<p>The submitted JSON entity does not match the required schema.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InsufficientFundsError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"InsufficientFundsError\",\n  \"message\": \"Error description here.\",\n  \"owner\": \"bob\"\n}",
          "type": "json"
        },
        {
          "title": "UnprocessableEntityError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"UnprocessableEntityError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "AlreadyExistsError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"AlreadyExistsError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        },
        {
          "title": "InvalidBodyError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidBodyError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/transfers/:id/fulfillment",
    "title": "Execute Prepared Transfer",
    "name": "PutTransferFulfillment",
    "group": "Transfer_Methods",
    "version": "1.0.0",
    "description": "<p>Execute or cancel a transfer that has already been prepared. If the prepared transfer has an <code>execution_condition</code>, you can submit the fulfillment of that condition to execute the transfer. If the prepared transfer has a <code>cancellation_condition</code>, you can submit the fulfillment of that condition to cancel the transfer.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be <code>text/plain</code>.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Transfer <a href=\"http://en.wikipedia.org/wiki/Universally_unique_identifier\">UUID</a>.</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "Fulfillment",
            "description": "<p>A <a href=\"#cryptoconditions\">Fulfillment</a> in string format.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Put Transfer Fulfillment:",
        "content": "curl -X PUT -H \"Content-Type: text/plain\" -d \\\n'oAKAAA' \\\nhttp://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204/fulfillment",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 Fulfillment Accepted Response:",
          "content": "HTTP/1.1 200 OK\noAKAAA",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/transfers.js",
    "groupTitle": "Transfer_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnmetConditionError",
            "description": "<p>Execution Condition Not Met</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The provided entity is syntactically correct, but there is a generic semantic problem with it.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidBodyError",
            "description": "<p>The submitted JSON entity does not match the required schema.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnmetConditionError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"UnmetConditionError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "UnprocessableEntityError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"UnprocessableEntityError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        },
        {
          "title": "InvalidBodyError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidBodyError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/transfers/:id/rejection",
    "title": "Reject Transfer",
    "name": "PutTransferRejection",
    "group": "Transfer_Methods",
    "version": "1.0.0",
    "description": "<p>Reject the transfer with the given message</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be <code>text/plain</code>.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Transfer <a href=\"http://en.wikipedia.org/wiki/Universally_unique_identifier\">UUID</a>.</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "Rejection",
            "description": "<p>An error message in string format.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Put Transfer Rejection:",
        "content": "curl -X PUT -H \"Content-Type: application/json\" -d \\\n'{\n  \"code\": \"S00\",\n  \"name\": \"Bad Request\",\n  \"message\": \"destination transfer failed\",\n  \"triggered_by\": \"example.red.bob\",\n  \"additional_info\": {}\n}'\nhttp://usd-ledger.example/transfers/3a2a1d9e-8640-4d2d-b06c-84f2cd613204/rejection",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 Rejection Accepted Response:",
          "content": "HTTP/1.1 200 OK\n'{\n  \"code\": \"S00\",\n  \"name\": \"Bad Request\",\n  \"message\": \"destination transfer failed\",\n  \"triggered_by\": \"example.red.bob\",\n  \"additional_info\": {}\n}'",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/transfers.js",
    "groupTitle": "Transfer_Methods",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The provided entity is syntactically correct, but there is a generic semantic problem with it.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUriParameterError",
            "description": "<p>(One of) the provided URI parameter(s) was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidBodyError",
            "description": "<p>The submitted JSON entity does not match the required schema.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnprocessableEntityError",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"id\": \"UnprocessableEntityError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidUriParameterError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidUriParameterError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        },
        {
          "title": "InvalidBodyError",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"id\": \"InvalidBodyError\",\n  \"message\": \"Error description here.\",\n  \"validationErrors\": [ ... ]\n}",
          "type": "json"
        }
      ]
    }
  }
] });