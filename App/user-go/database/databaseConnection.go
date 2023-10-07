package database

import (
	"context"
	"encoding/base64"
	"fmt"
	// "github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

func decodeBase64(s string) string {
	decoded, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		fmt.Println("decode error:", err)
		return ""
	}
	return string(decoded)
}

func DBinstance() *mongo.Client {
	// err := godotenv.Load(".env")
	// if err != nil {
	// 	log.Fatalf("Error loading .env file")
	// }

	MongoDBHost := os.Getenv("DB_MONGO_HOST")
	MongoDBPort := os.Getenv("DB_MONGO_PORT")
	MongoDBUser := decodeBase64(os.Getenv("DB_MONGO_USER"))
	MongoDBPassword := decodeBase64(os.Getenv("DB_MONGO_PASSWORD"))

	MongoDBuri := fmt.Sprintf("mongodb://%s:%s@%s:%s/?authSource=admin&authMechanism=SCRAM-SHA-256", MongoDBUser, MongoDBPassword, MongoDBHost, MongoDBPort)

	mongo.NewClient(options.Client().ApplyURI(MongoDBuri))
	client, err := mongo.NewClient(options.Client().ApplyURI(MongoDBuri))
	if err != nil {
		log.Fatalf("Error creating MongoDB client: %v\nURI: %s", err, MongoDBuri)
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatalf("Error creating MongoDB client: %v\nURI: %s", err, MongoDBuri)
		return nil
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Error pinging MongoDB: %v", err)
		return nil
	}

	fmt.Println("Connected to MongoDB!")
	return client
}

var Client *mongo.Client = DBinstance()

func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection = client.Database("userdb").Collection(collectionName)
	return collection
}
