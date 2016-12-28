defmodule Mychat.RoomChannel do
  use Mychat.Web, :channel
  use Export.Python

  def join("rooms:lobby", message, socket) do 
    Process.flag(:trap_exit, true) 
    send(self, {:after_join, message}) 

    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/example-db",
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
    )

    {:ok, socket} 
  end 
  
  def join("rooms:" <> _something_else, _msg, _socket) do 
    {:error, %{reason: "can't do this"}} 
  end 
  
  def handle_info({:after_join, msg}, socket) do 
    broadcast! socket, "user:entered", %{user: msg["user"]} 
    push socket, "join", %{status: "connected"} 

#    DatomicGenServer.start_link(
#      "datomic:free://localhost:4334/responsive-db",
#      true,
#      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
#    )
    query = "[:find ?c ?doc :where [?c :db/doc \"This is an example\"] [?c :db/doc ?doc]]"
    result = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    IO.inspect result

    {:ok, py} = Python.start(python_path: Path.expand("lib/python"))
    IO.puts py |> Python.call("pytest", "upcase", ["hello"])

    stream = ExTwitter.stream_filter(track: "phoenix", timeout: :infinity) |>
      Stream.map(fn(x) -> IO.puts push socket, "new:msg", %{"user" => x.user.screen_name, "tweet" => x.text} end)
    Enum.to_list(stream)

    {:noreply, socket} 
  end 
  
  def terminate(_reason, _socket) do 
    :ok 
  end
  
  def handle_in("new:msg", msg, socket) do 
    broadcast! socket, "new:msg", %{user: msg["user"], body: msg["body"]} 
    {:reply, {:ok, %{msg: msg["body"]}}, assign(socket, :user, msg["user"])} 
  end

end
