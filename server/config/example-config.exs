# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :mychat, Mychat.Endpoint,
  url: [host: "xx.xxx.xxx.xxx"],
  secret_key_base: "5IkJ4msbA/4DOBci99bIGv7ksxZ3u6NJng+YwICKpLw8XXRZiS7FUtYA7WYSIwaw",
  render_errors: [view: Mychat.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Mychat.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Put your twitter credentials here
config :extwitter, :oauth, [
  consumer_key: "",
  consumer_secret: "",
  access_token: "",
  access_token_secret: ""
]
