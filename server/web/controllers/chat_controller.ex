defmodule Mychat.ChatController do 
  use Mychat.Web, :controller 
  
  def index(conn, _params) do 
    render conn, "lobby.html" 
  end 
end