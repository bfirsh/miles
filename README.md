# 🎺 Miles

**Everything you need to build a modern JavaScript app**

Redux, GraphQL, Babel, Webpack… are you struggling to get your head around the JavaScript ecosystem?

Miles is a different approach. It includes everything you need to build a modern database-backed JavaScript app, from database to UI, so you can actually get on with building something.

You model your data as classes, then Miles does the heavy lifting of storing the data in a PostgreSQL database and getting the data from the server to the client. You write your user interface in React, then hook up the React views to the data model with controllers. (Yes, it's MVC frameworks from 2005 all over again!)

## What does it look like?

First, you define your models:

```javascript
class Todo extends Model {
  static fields = {
    id: new IDField(),
    text: new StringField(),
    completed: new BooleanField(default=false)
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}
```

The data schema is used to create a PostgreSQL table, as well as a client-side API for you to work with the data. Miles also creates a server-side API so the client can access the database, but you don't need to worry about this if you don't want to.

Next, you define your UI with React:

```javascript
const TodoView = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

const TodoListView = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <TodoView key={todo.id} {...todo} onClick={() => toggleTodo(todo)} />
    ))}
  </ul>
);
```

Then, wire the two together with a controller:

```javascript
const TodoListController = () => (
  <div>
    <h1>Todos</h1>
    <Query query={Todo.all()}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.toString()}</div>;

        return <TodoListView todos={data} toggleTodo={todo => todo.toggle()} />;
      }}
    </Query>
  </div>
);
```

Finally, you hook the controller up to a URL route:

```javascript
const App = () => (
  <Router>
    <Route exact path="/" component={TodoListController} />
  </Router>
);
```

That's it! There are a few other bits that need adding, like authentication and authorization, but this hopefully gives you the gist of the architecture.

## Getting started

The easiest way to learn how to use Miles is by example. We're going to create a basic todo app, as outlined above. You'll need to have [Node 10.3 or above installed](https://nodejs.org/).

### Creating an app

First step is to scaffold a basic app:

```
$ npm init miles todoapp
$ cd todoapp/
```

Let's check that everything is working by booting up a development server. Run this command:

```
$ npm start
```

When it finished booting, you can go to http://localhost:3000 and you should see it running.

Open up the `todoapp/` directory in a code editor or file browser to take a look around. You'll see a directory structure like this:

```
todoapp/
  client/
    controllers/
      home.js
    models/
    views/
    App.js
    index.js
  public/
    index.html
  server/
    index.js
  package.json
```

There are three main directories:

- `client/` - The JavaScript React app that is your user-facing application.
- `public/` - Any static files that you want served by your server, including the root `index.html`.
- `server/` - The Node.js server that serves your app and data. This is the entrypoint for your application -- it compiles and serves everything in `client/` and `public/`.

Within `client/`, you've got the main building blocks for your app:

- `client/App.js` - Your app's URL routes.
- `client/models/` - Your data models.
- `client/views/` - React components that describe how to present your data.
- `client/controllers/` - The business logic that wires together the models and views.

There are a few other files in here, but don't worry too much about them -- we're going to look at all of the files in more detail later.

### Model your data

Models define your database schema. They are classes which define the database fields, and the operations that are performed on that data.

The model objects themselves are used from the client. Miles takes care of transmitting the data to and from the server, and ultimately storing that data in a database.

The idea is that this is a single, definitive source of truth about what your data looks like. Database tables, API clients, API servers, etc, can all be derived from it. Modelling your data also helps keep your code organised: instead of operations on the data being scattered all over your codebase, you can keep them all in one place behind a well-organised set of methods.

We're making a todo app, so let's model a todo item. Create `client/models/todo.js` with this content:

```javascript
import {
  Model,
  IDField,
  StringField,
  BooleanField
} from "miles-prototype/models";
import { createQuery } from "miles-prototype/models/query";

class Todo extends Model {
  static fields = {
    id: new IDField(),
    text: new StringField(),
    completed: new BooleanField(default=false)
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}
Todo.Query = createQuery(Todo);

export default Todo;
```

As you can see, Miles models subclass `Model`. Models must have a `fields` attribute, which define the database fields.

The field class uses tells Miles what type of database field to create, and what type to use to represent that data in JavaScript. Field classes also have various optional options, such as `default`, which defines a default value to assign to that field if it is not specified.

You can also define your own methods on models to do whatever you need to do with your data. In this example, there is a method to toggle the state of the `completed` field. It calls the `update()` method. When called from within your app, this method makes an API call to the server and runs an `UPDATE` query on the database.

_(Note: Ignore `Todo.Query`. We need to come up with a better syntax for that.)_
