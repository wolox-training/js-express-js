module.exports = {
  id: {
    type: 'integer',
    example: 1
  },
  name: {
    type: 'string',
    example: 'lorem'
  },
  lastName: {
    type: 'string',
    example: 'ipsum'
  },
  email: {
    type: 'string',
    example: 'dummy.user@wolox.com'
  },
  password: {
    type: 'string',
    example: 'wolox1234'
  },
  UserInput: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      last_name: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  UserOutput: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/id'
      },
      name: {
        $ref: '#/components/schemas/name'
      },
      last_name: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      }
    }
  }
};
