const Categories = require('../categories/categories.js');
const Products = require('../products/products');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  //How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = { };
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  test('can delete() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then( (record) => {
        let id = record.id;
        return categories.delete(id)
          .then( () => {
            expect(categories.get(id).length).not.toEqual(1);
          });
      });
  });

  test('can update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
    .then( (record) => {
      let id = record.id;
        let newEntry = {id: id, name: 'Updated Category'};
        return categories.update(id, newEntry)
          .then( (record) => {
            return(categories.get(id))
            .then( (item) => {
              expect(item[0].name).toEqual('Updated Category');
            })
          });
      });
  });

})
