defmodule Mychat.PageController do
  use Mychat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
