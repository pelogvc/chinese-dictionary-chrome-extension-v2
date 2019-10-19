import Dexie from "dexie";

export class WordbookDatabase extends Dexie {
  public wordbook: Dexie.Table<any, any>;
  private limit: number = 10;

  constructor() {
    super("dictionary");

    this.version(3).stores({
      dicWordbook: `++id, LAIMLog, collectionRanking, exactMatcheEntryUrl, mayBeKey, mode, query, range, searchResultMap, created, [query+created]`
    });

    this.wordbook = this.table("dicWordbook");
    this.searchByPage.bind(this);
  }

  public async searchByPage(page: number) {
    const offset = ((page || 1) - 1) * this.limit;
    return this.wordbook
      .orderBy("id")
      .reverse()
      .offset(offset)
      .limit(this.limit)
      .toArray();
  }

  public async count() {
    return this.wordbook.count();
  }
}