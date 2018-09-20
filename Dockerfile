#Check https://hub.docker.com/_/node/ for stable version
FROM node:9.0.0

#Setting environment variable
ENV REACT_APP_SERVER_ENVIRONMENT $REACT_APP_SERVER_ENVIRONMENT
ENV REACT_APP_SERVER_ADDRESS $REACT_APP_SERVER_ADDRESS
ENV REACT_APP_GAID $REACT_APP_GAID
ENV REACT_APP_API_VERSION $REACT_APP_API_VERSION

WORKDIR /app
COPY package.json ./

RUN npm i

COPY . ./

CMD npm run build && find build/ -name "*.js.map" -type f -delete && cp -r build/. /dist
