-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `pass` VARCHAR(225) NOT NULL,
    `dob` DATE NOT NULL,
    `creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `attendance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `user_join` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_left` TIMESTAMP(0) NULL,

    INDEX `meeting_id_idx`(`meeting_id`),
    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`attendance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite` (
    `favorite_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `meeting_id` INTEGER NULL,

    INDEX `meeting_id_idx`(`meeting_id`),
    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`favorite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meeting` (
    `meeting_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `meeting_schedule_start` TIMESTAMP(0) NOT NULL,
    `meeting_cap` INTEGER NULL DEFAULT 30,

    PRIMARY KEY (`meeting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meeting_info` (
    `meeting_id` INTEGER NOT NULL,
    `meeting_total_attendee` INTEGER NULL,
    `meeting_end` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`meeting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `message` VARCHAR(250) NOT NULL,
    `message_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `message_meeting_id_fk`(`meeting_id`),
    INDEX `message_user_id_fk`(`user_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`meeting_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`meeting_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `meeting_info` ADD CONSTRAINT `meeting_info_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`meeting_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`meeting_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
