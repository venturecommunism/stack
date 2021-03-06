run_it () {

sudo apt-get update && sudo apt-get install -y git
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb && sudo apt-get update && sudo apt-get install -y esl-erlang elixir build-essential
git clone https://github.com/venturecommunism/stack.git
cp stack/server/config/example-config.exs stack/server/config/config.exs
IP_ADDR=`/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'`
sed -i -e "s/xx.xxx.xxx.xxx/$IP_ADDR/g" stack/server/config/config.exs
sudo apt-get install -y docker.io
docker run -d -p 4334-4336:4334-4336 --name datomic-free akiel/datomic-free
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
mv lein /usr/bin/lein
chmod a+x /usr/bin/lein
sudo apt-get install -y openjdk-7-jre-headless
cd stack/server
mix local.hex --force
mix local.rebar --force
mix deps.get
cp ../server-extras/datomic_gen_server_peer/datomic-free-0.9.5544.jar deps/datomic_gen_server/priv/datomic_gen_server_peer
cd deps/datomic_gen_server/priv/datomic_gen_server_peer
lein uberjar
echo 'Container ID for your running datomic can be found here:'
docker ps
echo 'Then, using the container id do:'
echo 'docker exec -it CONTAINER-ID /bin/bash'
echo 'root@CONTAINER-ID:/datomic-free-0.9.5530# bin/groovysh'
echo 'groovy:000> import datomic.Peer'
echo 'groovy:000> uri = "datomic:free://localhost:4334/responsive-db"'
echo 'groovy:000> Peer.createDatabase(uri)'
echo 'exit the groovy shell and datomic container (exit, exit)'
echo 'cd stack/server'
echo 'mix phoenix.server'
echo 'IP Address is:' $IP_ADDR
}

run_it
