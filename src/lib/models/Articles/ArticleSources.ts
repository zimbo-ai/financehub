import { date, mysqlTable, text, varchar, char, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { LinkedArticles } from './LinkedArticles';

export const ArticleSources = mysqlTable(
	'article_sources',
	{
		id: char('id', { length: 26 }).primaryKey(),
		name: varchar('name', { length: 255 }).notNull(),
		url: varchar('url', { length: 512 }).notNull().unique('unique_article_src_url'),
	},
	(t) => {
		return {
			urlIndex: index('username_index').on(t.url)
		};
	}
);

export const ArticleSourceRelations = relations(ArticleSources, ({ many }) => ({
	articles: many(LinkedArticles)
}));

export type ArticleSource = typeof ArticleSources.$inferSelect;
