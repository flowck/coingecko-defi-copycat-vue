FROM node:lts-alpine3.14
WORKDIR /usr/app
COPY . ./

ENV GL_TOKEN=v5by7sRmVhzWBQjzW3e5
ENV GITLAB_TOKEN=v5by7sRmVhzWBQjzW3e5

RUN apk --no-cache add git
RUN npm ci
RUN npx semantic-release