exports.up = function(knex) {
	return knex.schema
		.createTable("Users", tbl => {
			tbl.increments();
			tbl
				.text("username")
				.unique()
				.notNullable();
			tbl.text("password", 128).notNullable();
		})
		.createTable("BucketList", tbl => {
			tbl.increments();
			tbl.text("name", 128).notNullable();
			tbl.text("description", 128).notNullable();
			tbl
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("Users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("BucketListUsers", tbl => {
			tbl
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("Users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl
				.integer("bucketList_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("BucketList")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("BucketListItem", tbl => {
			tbl.increments();
			tbl
				.integer("bucketList_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("BucketList")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl.text("name", 128).notNullable();
			tbl.text("description", 256).notNullable();
		})
		.createTable("Photos", tbl => {
			tbl.text("path", 128).notNullable();
			tbl.timestamp("time_stamp").notNullable();
			tbl
				.integer("item_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("BucketListItem")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("JournalEntries", tbl => {
			tbl.text("entry", 128).notNullable();
			tbl.timestamp("time_stamp").notNullable();
			tbl
				.integer("item_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("BucketListItem")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("JournalEntries")
		.dropTableIfExists("Photos")
		.dropTableIfExists("BucketListItem")
		.dropTableIfExists("BucketListUsers")
		.dropTableIfExists("BucketList")
		.dropTableIfExists("Users");
};
