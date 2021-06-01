import { isNil as _isNil, cloneDeep as _cloneDeep } from 'lodash';

/**
 * ストレージ操作ユーティリティ
 */
export class StorageUtil {
    private myStorage;

    constructor(storageType: 'local' | 'session') {
        this.myStorage = storageType === 'local' ? localStorage : sessionStorage; 
    }

    public getValue(key: string): object {
        const data = this.myStorage.getItem(key);
        if (!_isNil(data)) {
            return JSON.parse(data);
        } else {
            this.remove(key);
            return null;
        }
    }

    public setValue(key: string, value: object): void {
        let data = JSON.stringify(_cloneDeep(value));
        if (!_isNil(data)) {
            this.myStorage.setItem(key, data);
        }
    }

    public remove(key: string): void {
        this.myStorage.removeItem(key);
    }
}
