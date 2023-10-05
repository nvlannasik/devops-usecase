FROM golang:1.19.4-alpine

WORKDIR /app

COPY . .

RUN go mod download

COPY *.go ./

RUN go build -o /go-docker-demo

EXPOSE 8080

CMD [ "/go-docker-demo" ]