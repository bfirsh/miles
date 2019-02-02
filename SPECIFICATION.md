# Specification

## Problem

As a developer building a small project, I want to get productive as quickly as possible. In the past, I would have used Django or Ruby on Rails. They work out of the box with best practices baked in, so I can just focus on building.

But, as soon as you want to add interactive elements to a server-side web app, you have this mess of frontend and backend code. You have to spend time figuring out where to draw the line between frontend and backend, instead of just building.

So, you build a web app that runs in the browser (single-page app, progressive web app, whatever you want to call it). That way your UI doesn't have to straddle backend and frontend - it is all cleanly in frontend-land.

The problem is there is nothing for web apps that lets you be productive in the same way Django or Rails did. The closest thing I have found is Create React App + Firebase. The problem is you still have to figure out how to wire up the frontend to the backend, mix in user authentication, etc. Also, you are tied to Google's cloud platform.

## Proposed solution

Miles lets you build single page apps without having to pick technologies and wire them together. It works out of the box with best practices.

You write your data model, then it creates a Postgres database, serves it via an API, then gives you a well-designed API client to access the data from within the browser.

It's not just a toy. It also does all the hard stuff you need to do in every app you write: authentication, authorization, database migrations, etc.

## Existing work

- Meteor
- Sails
- Vulcan.js
