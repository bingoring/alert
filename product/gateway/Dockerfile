#####################################
#
#             build
#
#####################################
FROM node:18.12.1-alpine3.15 as build
WORKDIR /usr/src/alert
RUN npm i -g pnpm@7.30.3 && \
     addgroup -S -g 7701 custom && \
     adduser -u 7701 -S custom -G custom && \
     chown -R  custom:custom /usr/src && \
     chown -R  custom:custom /usr/src/alert/
COPY --chown=custom:custom dist/product/gateway/package.json ./package.json
COPY --chown=custom:custom dist/product/gateway/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --chown=custom:custom util/build/compression_node_modules.sh /build/compression_node_modules.sh
RUN pnpm install --prod && \
     pnpm i @opentelemetry/api && \
     pnpm i @opentelemetry/auto-instrumentations-node && \
     pnpm i @opentelemetry/instrumentation-grpc && \
     pnpm i @opentelemetry/sdk-metrics && \
     pnpm i @opentelemetry/sdk-node && \
     pnpm i pg && \
     sh /build/compression_node_modules.sh

#####################################
#
#             production
#
#####################################
FROM node:18.12.1-alpine3.15 as prod
WORKDIR /usr/src/alert
RUN apk --no-cache add curl && \
     addgroup -S -g 7701 custom && \
     adduser -u 7701 -S custom -G custom && \
     chown -R  custom:custom /usr/src && \
     chown -R  custom:custom /usr/src/alert/
ENV NODE_ENV production
COPY --chown=custom:custom dist/product/gateway/ .
COPY --from=build --chown=custom:custom /usr/src/alert/node_modules /usr/src/alert/node_modules
ENTRYPOINT [ "node", "main.js" ]
