
FROM node:16-alpine

RUN mkdir /iurc-front
WORKDIR /iurc-front

RUN npm install -g @angular/cli --force

COPY package.json .
COPY package-lock.json .
RUN npm install 

ADD . /iurc-front/
EXPOSE 4200
RUN npm run build

CMD ["ng","serve", "--host", "0.0.0.0", "--port", "4200" , "--poll","2000"]