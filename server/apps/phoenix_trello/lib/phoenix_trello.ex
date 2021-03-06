defmodule PhoenixTrello do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false


    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/responsive-db-2",
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLinkTx}]
    )


reversible = Exdn.to_reversible """
  [{ :something/wut "a thing"
     :anotherthing "some other thing"
     :yo 2
  }]
"""

IO.inspect reversible

back_to_edn = Exdn.from_elixir reversible

IO.inspect back_to_edn


#    data_to_add = """
#      [ { :db/ident :app/cuid :db/unique :db.unique/identity   :db.install/_attribute :db.part/db} { :db/ident :app/muid :db/unique :db.unique/identity   :db.install/_attribute :db.part/db}]
#    """
data_to_add = """
[{
   :db/id #db/id [:db.part/db]
   :db.install/_attribute :db.part/db
   :db/ident :app/cuid
   :db/valueType :db.type/string
   :db/cardinality :db.cardinality/one
 }
 { 
   :db/id #db/id [:db.part/db]
   :db.install/_attribute :db.part/db
   :db/ident :app/muid
   :db/valueType :db.type/string
   :db/cardinality :db.cardinality/one
}]
"""
data_to_add = """
[{:db/ident :app/cuid
  :db/cardinality :db.cardinality/one
  :db/valueType :db.type/string
  :db.install/_attribute :db.part/db
  :db/id #db/id[:db.part/db]}]
"""
data_to_add = """
[{                         :db/ident :movie/title
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "The title of the movie"}

                          {:db/ident :movie/genre
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "The genre of the movie"}

                          {:db/ident :movie/release-year
                           :db/valueType :db.type/long
                           :db/cardinality :db.cardinality/one
                           :db/doc "The year the movie was released in theaters"}]
"""
data_to_add = """
[{                         :db/ident :wapp/cuid
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "The CUID"}

                          {:db/ident :wapp/muid
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "The MUID"}

                          {:db/ident :name
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "The name"}

                          {:db/ident :follows              
                           :db/valueType :db.type/long
                           :db/cardinality :db.cardinality/many
                           :db/doc "Who they follow"}]
"""


    {:ok, transaction_result} = DatomicGenServer.transact(DatomicGenServerLinkTx, data_to_add, [:options, {:client_timeout, 100_000}])

IO.puts "TX RESULT"
IO.inspect transaction_result

msg = %{"body" => %{"data" => [%{"C" => 0, "a" => ":name", "added" => true, "e" => 67,
       "m" => 2162164496, "tx" => 536870927,
       "v" => "thing"},
     %{"C" => 0, "a" => ":follows", "added" => true, "e" => 67,
       "m" => 2162164496, "tx" => 536870927, "v" => 2},
     %{"C" => 0, "a" => ":db/cuid", "added" => true, "e" => 67,
       "m" => 2162164496, "tx" => 536870927,
       "v" => "cj0kvrs40000qs1tsjq9zh3dv"},
     %{"C" => 0, "a" => ":db/muid", "added" => true, "e" => 67,
       "m" => 2162164496, "tx" => 536870927,
       "v" => "cj0kvrs43000rs1ts2en6r2at"}],
    "meta" => %{"mcuid" => "cj0kvrs43000rs1ts2en6r2at"}},
  "user" => "FaceGirlBug"}

%{"body" => %{"data" => data, "meta" => meta}, "user" => user} = msg

IO.puts 'parse'
IO.inspect ParseDatascriptTransaction.first(data)

parsed_data = ParseDatascriptTransaction.first(data)

#    {:ok, transaction_result} = DatomicGenServer.transact(DatomicGenServerLinkTx, parsed_data, [:options, {:client_timeout, 100_000}])

#IO.inspect transaction_result

    children = [
      # Start the endpoint when the application starts
      supervisor(PhoenixTrello.Endpoint, []),
      # Start the Ecto repository
      worker(PhoenixTrello.Repo, []),
      # Here you could define other workers and supervisors as children
      # worker(PhoenixTrello.Worker, [arg1, arg2, arg3]),
      supervisor(PhoenixTrello.BoardChannel.Supervisor, []),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhoenixTrello.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PhoenixTrello.Endpoint.config_change(changed, removed)
    :ok
  end
end
