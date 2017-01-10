sudo apt-get update && sudo apt-get install -y git
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb && sudo apt-get update && sudo apt-get install -y esl-erlang elixir build-essential
git clone https://github.com/venturecommunism/stack.git
cd stack/server
cp config/example-config.exs config/config.exs
sed -i -e 's/xx.xxx.xxx.xxx/localhost/g' config/config.exs
mix local.hex --force
mix local.rebar --force
mix deps.get -y
