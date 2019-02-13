const config = require('config');

export class AppSettings {
    private _Cache: Map<string, string> = new Map<string, string>();
    private stage: string;

    constructor() {
        this.stage = process.env.NODE_ENV || 'development';
    }

    public async get(key: string) {
        try {
            let value = config.get(key);
            if (value === '$$SECRET$$') {
                if (this._Cache.has(key)) {
                    console.log('found in the cache...');
                    return this._Cache.get(key);
                }

                let path = key.replace(/\./g, '\/');
                console.log(`will call paramStore with: '/${this.stage}/${path}'`);

                this._Cache.set(key, 'test');

                return 'test';
            }

            return value;
        } catch (err) {
            console.warn(`appSetting key:'${key}' can't be found`);
        }        
    }
}