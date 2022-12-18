CREATE TABLE "todoList" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(500) NOT NULL,
	"dateCompleted" TIMESTAMP
);

CREATE TABLE "completedList" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(500) NOT NULL,
	"dateCompleted" TIMESTAMP
);