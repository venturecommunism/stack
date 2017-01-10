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
sudo apt-get install -y docker.io
docker run -d -p 4334-4336:4334-4336 --name datomic-free akiel/datomic-free
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
mv lein /usr/bin/lein
chmod a+x /usr/bin/lein
sudo apt-get install -y openjdk-7-jre-headless
rm -r deps/datomic_gen_server/priv/datomic_gen_server_peer
cp -r ../server-extras/datomic_gen_server_peer deps/datomic_gen_server/priv
cd deps/datomic_gen_server/priv/datomic_gen_server_peer
lein uberjar
# docker exec -it CONTAINER-ID /bin/bash
# root@CONTAINER-ID:/datomic-free-0.9.5530# bin/groovysh
# groovy:000> import datomic.Peer
# groovy:000> uri = "datomic:free://localhost:4334/responsive-db"
# groovy:000> Peer.createDatabase(uri)
