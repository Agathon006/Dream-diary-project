# Dream-diary-project (JS)

### The dream diary project allows users to register and edit their profiles, view the dream entries of other users, as well as add your own dreams. Users can search for dream entries by their title, category, and mood, and filter them by specific users, sort them by views and likes. In addition to all of this, the project includes a page with world time, a page with the nearest weather forecast in Minsk with the option to check the weather at the user's location, information about the current and upcoming lunar phases, and a page with a music player where users can listen to suggested tracks. There is a division of roles between users and administrators. When an administrator logs in, they are automatically redirected to the editing page where they can delete and modify data about all users, including administrators, as well as data about dream entries.

---

## Video demo:

### soon

---

## Instruction for launching this project

1. Install all needed server dependencies:
   `npm install`
1. Run the json-server (back app):
   `npx json-server db.json`
1. Run the front app with some server (you can use [MAMP](https://www.mamp.info/en/windows/) for example). Attention: do not use LiveServer from VS Code for this as it can cause problems with POST / PUT / DELETE requests to the server.

---

## Technologies used in the project

- HTML
- CSS
- Javascript
- MVC pattern
- JS Docs
- Fetch API
- Promises
- Async / Await
- GET / POST / PUT / DELETE methods
- LocalStorage
- Modules
- Imports / Exports
- Webpack 
- Babel
- JSON-Web-Token (JWT)
- i18next
- seeds files