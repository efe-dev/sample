export class CachingService{
  private cache: {[id: string]: CachingKey} = {};
  private cachePeriod: number = 5*60*1000; //5 minutes

  public set(url: string, promise: Promise<any>){
    var key = `${url}`;
    var cachingEntry = new CachingKey(promise, Date.now() + this.cachePeriod);
    this.cache[key] = cachingEntry;
  }

  public get(url: string): Promise<any>{
    var key = `${url}`;
    var cacheEntry = this.cache[key];
    if(cacheEntry){
      if(cacheEntry.CacheExpiry > Date.now()){
        return cacheEntry.Promise;
      }
      return null;
    }
    return null;
  }
}

class CachingKey{
  constructor(public Promise: Promise<any>, public CacheExpiry: number){}
}