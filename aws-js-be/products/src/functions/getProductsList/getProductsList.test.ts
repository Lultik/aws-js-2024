import { getProductsList } from "./getProductsList";

describe('findProductById', () => {
  test('should find right product', async () => {
    // @ts-ignore
    const {body: products} = await getProductsList();

    expect(JSON.parse(products).length).toEqual(6);
  })
})
