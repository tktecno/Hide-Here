CREATE TABLE `email_verify` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`verified` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_verify_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`ip` varchar(45),
	`token_hash` varchar(256) NOT NULL,
	`user_agent` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`expired_at` timestamp,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_hash_unique` UNIQUE(`token_hash`)
);
--> statement-breakpoint
CREATE TABLE `userdata` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`code` varchar(20) NOT NULL,
	`title` varchar(255) NOT NULL DEFAULT 'Untitled',
	`data` varchar(1020) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`user_id` int NOT NULL,
	CONSTRAINT `userdata_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_info` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `email_verify` ADD CONSTRAINT `email_verify_user_id_user_info_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_info`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_info_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_info`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userdata` ADD CONSTRAINT `userdata_user_id_user_info_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_info`(`id`) ON DELETE cascade ON UPDATE no action;