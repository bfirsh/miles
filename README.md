# 🎺 Miles
**Everything you need to build a modern JavaScript app**

Redux, GraphQL, Babel, Webpack… are you struggling to get your head around the JavaScript ecosystem?

Miles is a different approach. It includes everything you need to build a modern database-backed JavaScript app, from database to UI, so you can actually get on with building something.

You model your data as classes, then Miles does the heavy lifting of storing the data in a PostgreSQL database and getting the data from the server to the client. You write your user interface in React, then hook up the React views to the data model with controllers. (Yes, it's MVC frameworks from 2005 all over again!)

## What does it look like?

First, you define your models:

```javascript
class Todo extends Miles.Model {
  text: StringField(),
  completed: BooleanField(default=false),

  toggle() {
    this.update({completed: !this.completed});
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
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

const TodoListView = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <TodoView key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
);
```

Then, wire the two together with a controller:

```javascript
const TodoListController = () => (
  <h1>Todos</h1>
  <Query query={Todo.all()} render={({ loading, error, todos }) => {
    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    return <TodoListView todos={todos} toggleTodo={(id) => Todo.get(id).toggle()} />;
  }} />
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

The easiest way to learn how to use Miles is by example. We're going to create a basic todo app, as outlined above.

First step is to create your project directory. Miles includes a tool for generating a basic project to make it easy to get started.

```
$ miles init todoapp
```

Now, change into the directory it created and boot up the app:

```
$ cd todoapp/
$ npm start
```

When it finished booting, you can go to http://localhost:3000 and it should be running.

... yada yada

