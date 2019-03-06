# Introduction
This shopping cart application is built using Vue + Vuex, it is supposed to work with any of these servers listed below. **Be warned** that
while making this app I am using this [Spring Boot Server](https://github.com/melardev/SBootApiEcomMVCHibernate) so I strongly encourage you
to use that as well, all the other servers worked from postman, but I don't know If they return in the response something called differently that
this redux app can not read, so if this redux app does not work, that is the reason, just a typo in a response variable, let me know about any typos
in any of the server apps and I will try to fix it.
- [Spring Boot + Hibernate](https://github.com/melardev/SBootApiEcomMVCHibernate)
- [Spring Boot + JAX-RS Jersey + Hibernate](https://github.com/melardev/SpringBootEcommerceApiJersey)
- [Node Js + Sequelize](https://github.com/melardev/ApiEcomSequelizeExpress)
- [Node Js + Bookshelf](https://github.com/melardev/ApiEcomBookshelfExpress)
- [Node Js + Mongoose](https://github.com/melardev/ApiEcomMongooseExpress)
- [Python Django](https://github.com/melardev/DjangoRestShopApy)
- [Flask](https://github.com/melardev/FlaskApiEcommerce)
- [Golang go gonic](https://github.com/melardev/api_shop_gonic)
- [Ruby on Rails](https://github.com/melardev/RailsApiEcommerce)
- [AspNet Core](https://github.com/melardev/ApiAspCoreEcommerce)
- [Laravel](https://github.com/melardev/ApiEcommerceLaravel)

This client side E-commerce application is also implemented using other client side technologies:
- [React Redux](https://github.com/melardev/ReactReduxEcommerceRestApi)
- [React](https://github.com/melardev/ReactEcommerceRestApi)
- Vue will be released soon
- [Vue + Vuex]()
- Angular will be released soon

# TODO
- After login or register redirect where the user was
- Guards
- It may be a good idea to separate the UsersService from a secrets service, to store the user and the tokens
differently, this is how I did it at the beginning: UsersService manages user storage, JwtService manages token storage,
then I removed this difference to keep it simple.
- [] ProductDetails retrieves the current product, change by async load instead.
- Fix the carousel behaviour
- Implement the fetch products by tag and by category name, if I try to reuse the ProductList.vue then it is a little tricky
because the UI may not update, I have to write good code to handle that situation. The server side apps are implemented to
return products by tag and by category.

# Resources
- [Vuex modules](https://vuex.vuejs.org/guide/modules.html)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
