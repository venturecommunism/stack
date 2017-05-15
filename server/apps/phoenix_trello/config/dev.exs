use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :phoenix_trello, PhoenixTrello.Endpoint,
#  force_ssl: [host: "localhost", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: [
    node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color", cd: Path.expand("../", __DIR__)]
  ],

  http: [port: 80],
  https: [port: 443,
          otp_app: :phoenix_trello,
          keyfile: "priv/keys/localhost.key",
          certfile: "priv/keys/localhost.cert"],
  debug_errors: true,
  code_reloader: true,
  check_origin: false


# Watch static and templates for browser reloading.
config :phoenix_trello, PhoenixTrello.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :phoenix_trello, PhoenixTrello.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_trello_dev",
  hostname: "localhost",
  pool_size: 10

# Guardian configuration
config :guardian, Guardian,
  secret_key: "W9cDv9fjPtsYv2gItOcFb5PzmRzqGkrOsJGmby0KpBOlHJIlhxMKFmIlcCG9PVFQ"