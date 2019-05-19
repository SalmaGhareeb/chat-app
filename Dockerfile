FROM node:10

# Good to have stuff
RUN npm install babel-cli -g

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install
RUN npm rebuild bcrypt --update-binary 

COPY . . 

# set your port
ENV PORT 3000
# Entrypoint script
RUN cp ./.docker/node/docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh
# expose the port to outside world
EXPOSE  3000
# start command as per package.json
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]