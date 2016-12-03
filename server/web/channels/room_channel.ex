defmodule Mychat.RoomChannel do
  use Mychat.Web, :channel

  def join("rooms:lobby", message, socket) do 
    Process.flag(:trap_exit, true) 
    send(self, {:after_join, message}) 
    {:ok, socket} 
  end 
  
  def join("rooms:" <> _something_else, _msg, _socket) do 
    {:error, %{reason: "can't do this"}} 
  end 
  
  def handle_info({:after_join, msg}, socket) do 
    broadcast! socket, "user:entered", %{user: msg["user"]} 
    push socket, "join", %{status: "connected"} 

    stream = ExTwitter.stream_filter(track: "pheonix", timeout: :infinity) |>
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
