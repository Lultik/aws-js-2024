export default {
  type: "object",
  properties: {
    description: {type: 'string'},
    title: {type: 'string'},
    id: {type: 'string'},
    price: {type: 'number'}
  },
  required: ['id']
} as const;
