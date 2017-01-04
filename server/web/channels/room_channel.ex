defmodule MySublistToMap do
  def fourth([ head | [] ], map) do
    nextmap = %{"op" => head}
    Map.merge(map, nextmap)
  end

  def third([ head | tail ], map) do
    nextmap = %{"tx" => head}
    newmap = Map.merge(map, nextmap)
    fourth(tail, newmap)
  end

  def second([ head | tail ], map) do
    nextmap = %{"v" => head}
    newmap = Map.merge(map, nextmap)
    third(tail, newmap)
  end

  def first([ head | tail ]) do
#    Enum.map(head, fn x -> IO.inspect x end)
    newmap = %{"e" => head, "a" => ":db/doc"}
    second(tail, newmap)
  end
end

defmodule MyList do
  def second([ head | [] ], list) do
    list ++ [MySublistToMap.first(head)]
  end

  def second([ head | tail ], list) do
    newlist = list ++ [MySublistToMap.first(head)]
    second(tail, newlist)
  end

  def first([ head | tail ]) do
    newlist = [MySublistToMap.first(head)]
    second(tail, newlist)
  end
end

defmodule TransactionLogger do
  def parse(msg) do
    base_one = byte_size("\#{")
    <<_::binary-size(base_one), rest::binary>> = msg
    base_two = byte_size(rest) - byte_size("\}\n")
    <<inner::binary-size(base_two), _::binary>> = rest
    final_list = Exdn.to_elixir! "[" <> inner <> "]"
    IO.inspect MyList.first(final_list)
  end
end

defmodule Mychat.RoomChannel do
  use Mychat.Web, :channel
  use Export.Python

  def join("rooms:lobby", message, socket) do 
    Process.flag(:trap_exit, true) 
    send(self, {:after_join, message}) 

    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/responsive-db",
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

    query = "[:find ?e ?v ?tx ?op :where [?e :db/doc ?v ?tx ?op]]"
    {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    TransactionLogger.parse(edn)
    IO.puts push socket, "new:msg", %{"user" => "system", "body" => TransactionLogger.parse(edn)}

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
