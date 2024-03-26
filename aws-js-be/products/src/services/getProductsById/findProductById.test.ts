import { findProductById } from "./findProductById";


describe('findProductById', () => {
  test('should find right product', async () => {
    const event = {pathParameters: {id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'}}
    // @ts-ignore
    const { body: product } = await findProductById(event);

    expect(JSON.parse(product)).toMatchObject({
      "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      "title": "Decadent Croissant",
      "description": "Buttery and flaky French-style pastry, perfect with coffee",
      "price": 2.50,
      "imageName": "croissant"
    })
  });
})
