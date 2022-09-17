node v14.20.0
npm 6.14.17

npm --init
npx tsc --init

npm install -g @types/node

// them scripts
"start": "node dist/index.js",
"dev": "nodemon ts-node src/index.ts",
"build": "npx tsc",

const userController = new UserController();
router.route('/user').get(userController.get.bind(userController);