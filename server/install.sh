sudo apt-get update && sudo apt-get install -y git
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb && sudo apt-get update && sudo apt-get install -y esl-erlang elixir build-essential
git clone https://github.com/venturecommunism/stack.git
cd stack/server
cp config/example-config.exs config/config.exs
IP_ADDR=`/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'`
sed -i -e "s/xx.xxx.xxx.xxx/$IP_ADDR/g" config/config.exs
mix local.hex --force
mix local.rebar --force
mix deps.get
