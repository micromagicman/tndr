FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install zip -y

RUN rm -rf ./*
COPY ./build/site .
COPY ./build/extension ./tndr
RUN zip -j tndr.zip ./tndr/* && rm -rf ./tndr

ENTRYPOINT ["nginx", "-g", "daemon off;"]