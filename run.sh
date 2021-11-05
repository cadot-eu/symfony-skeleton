export result=${PWD##*/}
#res=${PWD}
#docker kill $(docker ps -q)
docker-compose down --remove-orphans
docker-compose up -d
