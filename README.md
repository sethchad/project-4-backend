# Project-4-Backend

### Packages

Express
- npm init
- npm install express
- npm install method-override --save

Sequelize
- npm install sequelize-cli sequelize pg
- npx sequelize init
- createdb recipe_app_dev
- npx sequelize model:generate --name User --attributes name:string,username:string,password:string
- npx sequelize model:generate --name Meal --attributes name:string
- npx sequelize model:generate --name Ingredient --attributes description:string
- npx sequelize model:generate --name UserMeal --attributes userId:integer,mealId:integer
- npx sequelize seed:generate --name demo-user-meal-ingredient
- npx sequelize db:migrate
- npx sequelize db:seed:all
- Undoing migration
  * npx sequelize db:migrate:undo:all