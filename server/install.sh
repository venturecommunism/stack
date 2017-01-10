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
rm -r stack/server/deps/datomic_gen_server/priv/datomic_gen_server_peer
cp -r stack/server-extras/datomic_gen_server_peer stack/server/deps/datomic_gen_server/priv
echo 'cd stack/server/deps/datomic_gen_server/priv/datomic_gen_server_peer'
echo 'lein uberjar'
echo 'To find the container id do:'
echo 'docker ps'
echo 'Then, using the container id do:'
echo 'docker exec -it CONTAINER-ID /bin/bash'
echo 'root@CONTAINER-ID:/datomic-free-0.9.5530# bin/groovysh'
echo 'groovy:000> import datomic.Peer'
echo 'groovy:000> uri = "datomic:free://localhost:4334/responsive-db"'
echo 'groovy:000> Peer.createDatabase(uri)'
echo 'exit the groovy shell and datomic container'
echo 'cd ../.. # to stack/server'
echo 'mix local.hex --force'
echo 'mix local.rebar --force'
echo 'mix deps.get'
echo 'IP Address is:' $IP_ADDR
