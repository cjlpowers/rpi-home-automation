#
# ---- Dependencies ----
FROM arm32v7/node:10 AS dependencies
WORKDIR /usr/src/app

# install node modules
COPY package.json ./
RUN npm install --only=production 
RUN cp -R node_modules prod_node_modules
RUN npm install

#
# ---- Build ----
FROM dependencies AS build
RUN rm -rf /usr/src/app/prod_node_modules
WORKDIR /usr/src/app

# build source
COPY tsconfig.* ./
COPY src ./src
RUN npm run build

#
# ---- Release ----
FROM arm32v7/node:10-slim AS release
WORKDIR /usr/src/app

# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules

# copy dist artifacts
COPY --from=build /usr/src/app/dist ./
COPY package.json ./

EXPOSE 3000

ENTRYPOINT ["node","main"]