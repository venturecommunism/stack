To build the server for electron:

sudo apt-get install -y build-essential

change url in configs/example-config.exs to 'localhost'. save as configs/example.exs

set twitter API keys

MIX_ENV=prod mix release

(mix release.clean to try again)

# Exercises (Elmoin Meetup August 2016)

We'll look at a simple chat application written in Elixir/Phoenix and replace the existing JavaScript-Code with Elm. 

The Phoenix application was written with the help of [this tutorial](http://blog.distortedthinking.agency/articles/phoenix-framework-building-a-chat-server-in-15-minutes/).

## Getting started

Install [Elixir](http://elixir-lang.org/install.html).

To start the Phoenix app:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser. You should see a simple chat application. Open different browser tabs and type some messages to see how it works. If everything runs as expected...

## Replace JS with Elm

Have a look at the folder web/static/js. It contains three js-files (note that Phoenix has built-in ES6-support). Have a look at web/templates/chat/lobby.html.eex and web/templates/layout/app.html.eex. 

You don't need to write Elixir or change anything else than these files.

  * Replace (or extend) the files with an equivalent Elm-version. Use the package  [elm-phoenix-socket](http://package.elm-lang.org/packages/fbonetti/elm-phoenix-socket/2.0.0/). (**Hint 1**: Take a look at [this example](https://github.com/fbonetti/elm-phoenix-socket/blob/2.0.0/examples/Chat.elm). **Hint 2**: You actually don't need to replace the files to communicate with the Phoenix server. If it's easier for you don't care about the Phoenix-stuff.)
  * Make sure that messages as well as the usernames are submitted to the server and displayed to all users.
  * Make it look nice (e. g. with [elm-mdl](http://package.elm-lang.org/packages/debois/elm-mdl/7.2.0/)).
  * (Optional) If you know Elixir/Phoenix: Add some new features or build TNBT. 
  * (Optional) Invite people to join your chat (e. g. in the local network). 

Have fun!
