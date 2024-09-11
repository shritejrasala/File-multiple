using { media as db } from '../db/schema';

service Attachments {
    entity Files as projection on db.Files;
    entity Book as projection on db.Book;
}
annotate Attachments.Book with @odata.draft.enabled;