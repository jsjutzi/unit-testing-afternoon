const cart = require('./cart');
const cars = require('./data/cars');

const initializedCart = cart.cart;
const initializedTotal = cart.total;

describe('Cart Properties:', function() {
  test('Cart should default to an empty array.', function() {
    expect( Array.isArray( cart.cart ) ).toEqual( true );
    expect( cart.cart.length ).toEqual( 0 );
  });
  
  test('Total should default to 0.', function() {
    expect( cart.total ).toEqual( 0 );
    expect( typeof( cart.total ) ).toEqual( 'number' );
  });
});


describe('Cart Methods:', function() {
  afterEach(function() {
    cart.cart = initializedCart;
    cart.total = initializedTotal;
  });

  test('addToCart() should add a car object to the cart array.', function() {
    cart.addToCart( cars[0] );
  
    expect( cart.cart.length ).toEqual( 1 );
    expect( cart.cart[0] ).toEqual( cars[0] );
  });

  test('addToCart() should increase the total property.', function() {
    cart.addToCart( cars[0] );
    cart.addToCart( cars[8] );
    cart.addToCart( cars[2] );

    expect( cart.total ).toEqual( cars[0].price + cars[8].price + cars[2].price );
  });
  
  test('removeFromCart() should remove a car object from the cart array.', function() {
    cart.addToCart( cars[0] );
    cart.addToCart( cars[1] );
    cart.addToCart( cars[2] );
  
    cart.removeFromCart( 1, cars[1] );
  
    expect( cart.cart.length ).toEqual( 2 );
    expect( cart.cart[0] ).toEqual( cars[0] );
    expect( cart.cart[1] ).toEqual( cars[2] );
  });

  test('removeFromCart() should decrease the total property.', function() {
    cart.addToCart( cars[0] );
    cart.addToCart( cars[8] );
    cart.addToCart( cars[2] );

    cart.removeFromCart( 0, cars[0] );
    cart.removeFromCart( 1, cars[2] );

    expect( cart.total ).toEqual( cars[8].price );
  });

  test('checkout() shoud empty the cart array and set total to 0.', function() {
    cart.addToCart( cars[0] );
    cart.addToCart( cars[1] );
    cart.addToCart( cars[2] );
    cart.addToCart( cars[3] );

    cart.checkout();

    expect( cart.cart.length ).toEqual( 0 );
    expect( cart.total ).toEqual( 0 );
  });
});
