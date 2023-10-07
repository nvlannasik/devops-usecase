FROM --platform=linux/arm64 golang:1.19.4-alpine

WORKDIR /app

COPY . .

RUN go mod download
RUN go build -o /user-services

EXPOSE 8080

CMD ["/user-services"]