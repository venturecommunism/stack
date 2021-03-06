defmodule PhoenixTrello.UserSocket do
  use Phoenix.Socket

  alias PhoenixTrello.{GuardianSerializer}

  # Channels
  channel "boards:*", PhoenixTrello.BoardChannel
  channel "users:*", PhoenixTrello.UserChannel
  channel "rooms:lobby", PhoenixTrello.UserChannel

  # Transports
  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

#  def connect(%{"token" => token}, socket) do
#    case Guardian.decode_and_verify(token) do
#      {:ok, claims} ->
#        case GuardianSerializer.from_token(claims["sub"]) do
#          {:ok, user} ->
#IO.inspect token
#IO.inspect claims
#            {:ok, assign(socket, :current_user, user)}
#          {:error, _reason} ->
#            :error
#        end
#      {:error, _reason} ->
#        :error
#    end
#  end

  def connect(_params, socket) do
    {:ok, socket}
  end

  def connect(_params, _socket), do: :error

#  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
  def id(_socket), do: nil
end
