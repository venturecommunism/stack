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

defmodule MyLogQuerySublistToMap do
  def fifth([ head | [] ], map) do
    nextmap = %{"op" => head}
    Map.merge(map, nextmap)
  end

  def fourth([ head | tail ], map) do
    nextmap = %{"tx" => head}
    newmap = Map.merge(map, nextmap)
    fifth(tail, newmap)
  end

  def third([ head | tail ], map) do
    nextmap = %{"v" => head}
    newmap = Map.merge(map, nextmap)
    fourth(tail, newmap)
  end

  def second([ head | tail ], map) do
    nextmap = %{"a" => head}
    newmap = Map.merge(map, nextmap)
    third(tail, newmap)
  end

  def first([ head | tail ]) do
    newmap = %{"e" => head}
    second(tail, newmap)
  end
end

defmodule MyIndexSublistToMap do
  def fifth([ head | [] ], map) do
    nextmap = %{"op" => head}
    Map.merge(map, nextmap)
  end

  def fourth([ head | tail ], map) do
    nextmap = %{"tx" => head}
    newmap = Map.merge(map, nextmap)
    fifth(tail, newmap)
  end

  def third([{:tag, :inst, date} | tail], map) do
    nextmap = %{"v" => date}
    newmap = Map.merge(map, nextmap)
    fourth(tail, newmap)
  end

  def third([ head | tail ], map) do
    nextmap = %{"v" => head}
    newmap = Map.merge(map, nextmap)
    fourth(tail, newmap)
  end

  def second([ head | tail ], map) do
    nextmap = %{"a" => head}
    newmap = Map.merge(map, nextmap)
    third(tail, newmap)
  end

  def first({:tag, :datom, {:vector, [head | tail]}}) do
    newmap = %{"e" => head}
    second(tail, newmap)
  end
end

defmodule MyList do
  def second([], list) do
    list
  end

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

defmodule MyLogQueryList do
  def second([], list) do
    list
  end

  def second([ head | [] ], list) do
    list ++ [MyLogQuerySublistToMap.first(head)]
  end

  def second([ head | tail ], list) do
    newlist = list ++ [MyLogQuerySublistToMap.first(head)]
    second(tail, newlist)
  end

  def first([ head | tail ]) do
    newlist = [MyLogQuerySublistToMap.first(head)]
    second(tail, newlist)
  end

  def chopfirst([]) do
    []
  end

  def chopfirst([ _ | tail ]) do
    first(tail)
  end
end

defmodule MyIndexList do
  def second([], list) do
    list
  end

  def second([ head | [] ], list) do
    list ++ [MyIndexSublistToMap.first(head)]
  end

  def second([ head | tail ], list) do
    newlist = list ++ [MyIndexSublistToMap.first(head)]
    second(tail, newlist)
  end

  def first([ head | tail ]) do
    newlist = [MyIndexSublistToMap.first(head)]
    second(tail, newlist)
  end
end

defmodule TransactionLogQueryLogger do
  def parse(msg) do
    base_one = byte_size("\#{")
    <<_::binary-size(base_one), rest::binary>> = msg
    base_two = byte_size(rest) - byte_size("\}\n")
    <<inner::binary-size(base_two), _::binary>> = rest
    final_list = Exdn.to_elixir! "[" <> inner <> "]"
    MyLogQueryList.chopfirst(final_list)
  end
end

defmodule TransactionRegularQueryLogger do
  def parse(msg) do
    base_one = byte_size("\#{")
    <<_::binary-size(base_one), rest::binary>> = msg
    base_two = byte_size(rest) - byte_size("\}\n")
    <<inner::binary-size(base_two), _::binary>> = rest
    final_list = Exdn.to_elixir! "[" <> inner <> "]"
    MyList.first(final_list)
  end
end

defmodule TransactionIndexLogger do
  def parse(msg) do
    base_one = byte_size("(")
    <<_::binary-size(base_one), rest::binary>> = msg
    base_two = byte_size(rest) - byte_size(")\n")
    <<inner::binary-size(base_two), _::binary>> = rest
#    IO.inspect Exdn.to_elixir! "#foo \"blarg\"", (fn({:tag, _tag, val}) -> val <> "-converted" end), [{:foo, (fn x -> x end)}]
# the following isn't working so probably going to switch to reversible
#    IO.inspect final_list = Exdn.to_elixir! "[" <> inner <> "]", (fn({:tag, :datom, {:vector, val}}) -> val end), [{:datom, (fn x -> x end)}]
    list = Exdn.to_reversible "(" <> inner <> ")"
    {:list, final_list} = list
    MyIndexList.first(final_list)
  end
end

defmodule Mychat.RoomChannel do
  use Mychat.Web, :channel
  use Export.Python

  def join("rooms:lobby", message, socket) do 
    Process.flag(:trap_exit, true) 
#    send(self, {:after_join, message}) 

    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/responsive-db",
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
    )
#    send(self, {:after_join, message})

    {:ok, socket} 
  end 
  
  def join("rooms:" <> _something_else, _msg, _socket) do 
    {:error, %{reason: "can't do this"}} 
  end 
  
##  def handle_info({:after_join, msg}, socket) do 
##    broadcast! socket, "user:entered", %{user: msg["user"]} 
##    push socket, "join", %{status: "connected"} 

#   query = "[:find ?e ?v ?tx ?op :where [62 :db/doc ?v ?tx ?op] [?e :db/doc ?v ?tx ?op]]"
#    query = "[:find ?e ?v ?tx ?op :where [?e :db/doc ?v ?tx ?op]]"
#    query = "[:find (count ?tx) :in ?log ?t1 ?t2 :where [(tx-ids ?log ?t1 ?t2) [?tx ...]]]"
#    query = "[:find ?e ?a ?v ?tx ?op :in ?log ?tx :where [(tx-data ?log ?tx)[[?e ?a ?v _ ?op]]]]"
#    query = "[:find (count ?tx) ?tx :in ?log ?t1 ?t2 :where [(tx-ids ?log ?t1 ?t2) [?tx ...]]]"
#    query = "[:find ?e ?a ?v ?tx ?op :in ?log ?t1 ?t2 :where [(tx-ids ?log ?t1 ?t2) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"
#    query = ":eavt"
#    query = "[:find ?e ?aname ?v ?t ?added
#              :in $ [[?e ?a ?v ?t ?added]]
#              :where [?a :db/ident ?aname]]"

#    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?a :db/ident ?aname]]"

#    {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
#    {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
#    IO.puts edn
#    grouped_tx = TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
#    Enum.each(grouped_tx, fn({_, x}) -> IO.puts push socket, "new:msg", %{"user" => "system", "body" => x} end)

#    {:ok, py} = Python.start(python_path: Path.expand("lib/python"))
#    IO.puts py |> Python.call("pytest", "upcase", ["hello"])

#    stream = ExTwitter.stream_filter(track: "phoenix", timeout: :infinity) |>
#      Stream.map(fn(x) -> IO.puts push socket, "new:msg", %{"user" => x.user.screen_name, "tweet" => x.text} end)
#    Enum.to_list(stream)

##    {:noreply, socket} 
##  end 
  
  def terminate(_reason, _socket) do 
    :ok 
  end

  def handle_in("new:msg", %{"body" => %{"id" => id}, "user" => user}, socket) do
    IO.puts "ID"
    IO.inspect id

    push socket, "join", %{status: "connected"}
    broadcast! socket, "new:msg", %{user: user, body: %{"id": id, "user": user}}
    {:reply, {:ok, %{msg: %{"id": id, "user": user}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", %{"body" => %{"syncpoint" => "none"}, "user" => user}, socket) do
    IO.puts "MSG FALSE"

    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?a :db/ident ?aname]]"

#    {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    IO.puts edn
    grouped_tx = TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
    Enum.each(grouped_tx, fn({_, x}) -> IO.puts push socket, "new:msg", %{"user" => "system", "body" => x} end)

    push socket, "join", %{status: "connected"}
    broadcast! socket, "new:msg", %{user: user, body: %{"syncpoint": false, "user": user}}
    {:reply, {:ok, %{msg: %{"syncpoint": false, "user": user}}}, assign(socket, :user, user)}
  end
  
  def handle_in("new:msg", msg, socket) do 
    IO.puts "MSG"
    IO.inspect msg

    %{"body" => %{"syncpoint" => latest_tx}} = msg 

    IO.puts latest_tx

    query = "[:find ?e ?a ?v ?tx ?op :in ?log ?t1 :where [(tx-ids ?log ?t1 nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"

    {:ok, edn} = DatomicGenServer.qlog(DatomicGenServerLink, query, latest_tx - 1 , [], [:options, {:client_timeout, 100_000}])

    IO.puts edn
    grouped_tx = TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
    Enum.each(grouped_tx, fn({_, x}) -> IO.puts push socket, "new:msg", %{"user" => "system", "body" => x} end)

    broadcast! socket, "new:msg", %{user: msg["user"], body: msg["body"]} 
    {:reply, {:ok, %{msg: msg["body"]}}, assign(socket, :user, msg["user"])} 
  end

end
