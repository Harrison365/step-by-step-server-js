1. Navigate to your project's folder

2. git init

3. npm init -y

4. Create a .gitignore file and add node_modules to it

5. If you don't care about husky protection, skip to step 19 (sql setup)

6. npm i husky -D

7. Add "prepare": "husky install", script to package.json

8. npm i jest -D (and change test script to “jest”)

9. npx husky install

10. Create a file manually named pre-commit (no file extension) in the .husky directory (automatically created by husky in step 9)

11. Add the following to the pre-commit file:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test

```

12. You should end up with a .husky folder in the root of repo, with a '\_' folder and a pre-commit file (no file type, containing the above shell script, and shoould not be in the '\_') inside.

13. In the '\_' folder there should be a .gitignore (containing only a \*) and a husky.sh file pre-filled with abstract code.

14. Make the pre-commit file executable by running ‘chmod +x .husky/pre-commit’ in the terminal.

15. Run npm install to install all dependencies and set up Husky hooks.

16. Now, whenever you try to commit, the pre-commit hook will run npm test and only if all your tests pass will the commit be allowed.

17. Add a .gitignore with node_modules inside in the root of your project. (Repeated from step 4???)

18. If you want to commit at this point, you will need to make a test file with at least one test in (even if its just, expect 1 .toBe 1) in order to commit anything.

19. Create setup.sql
    This will drop any databases that exist and creat new ones. Both development and test. You can make a script in package.json to run this.

20. npm i pg
    This will allow you to access your dbs using javascript.

21. npm i dotenv
    This will allow you to create the connection.js file that connects to either test or development dbs.

22. Create a connection.js (aka index) file
    This will allow you to connect to the relevant db.

23. Create .env.development and .env.test files with PGDATABASE = <name_of_the_database>.
    Be careful that the file paths correspond to the file path in the connection file.

    Also add .env.\* to your .gitignore file.

24. Create data files (often arrays of objects) in both test and dev data files

25. You will need to this for accompanying data

26. npm i pg-format

27. Write a seed file. this will require the connection to the database (using pg), and pg-format (to insert the data in the correct SQL format).

28. Write a run-seed file for the dev data to be seeded (you can make an npm script for this)

29. npm i express -D

30. This will allow you to create your express app file. To which you will need to add the following:

```js
const express = require("express");
const app = express();

module.exports = app;
```

31. Now, install jest (npm i jest -D), this allows testing as usual (unless done in step 8).

32. Then supertest (npm i supertest -D), this allows tests to make api requests.

33. So that we can create out test file.

```js
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});
```

34. Write tests

35. Write app endpoint

36. Write controller

37. Write models

38. Add sad path tests and error handling middleware
