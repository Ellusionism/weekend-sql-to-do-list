CREATE TABLE "todoList" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(500) NOT NULL,
	"deadline" VARCHAR(50) NOT NULL
);

CREATE TABLE "completedList" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(500) NOT NULL,
	"dateCompleted" VARCHAR(100) NOT NULL
);