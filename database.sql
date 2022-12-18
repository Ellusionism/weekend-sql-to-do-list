--Create Tables--

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

-- Dummy Data --
INSERT INTO "todoList" ("task", "deadline")
    VALUES
    ('Celebrate Christmas!', '2022-12-25'),
    ('Dominate in neighborhood snowball fight @ 12pm', '2022-12-21'),
    ('Wrap the rest of the presents', '2022-12-23'),
    ('Yearly pondering of the incomprehensible insignificance of our species` existence from a cosmic perspective', '2023-01-01'),
    ('Back to class for Week 9!', '2023-02-01');

INSERT INTO "completedList" ("task", "dateCompleted")
    VALUES
    ('Submit Week 8 Weekend Challenge', 'Sun Dec 18 2022 18:00:00 GMT-0600 (Central Standard Time)'),
    ('Finish shopping for holiday gifts', 'Sat Dec 17 2022 11:38:19 GMT-0600 (Central Standard Time)'),
    ('Go ice fishing with Andy @ 4pm', 'Sat Dec 17 2022 21:26:54 GMT-0600 (Central Standard Time)'),
    ('Watch the Vikings game', 'Sat Dec 17 2022 15:37:02 GMT-0600 (Central Standard Time)');
