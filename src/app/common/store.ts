import { Dispatcher } from './dispatcher';
import { isPresent } from 'angular2/src/facade/lang';

export let DefaultStore: any = {};

export class Store {
	
	private _dispatcher: Dispatcher;
	private _store: any;
	private _channel: string;

	constructor(dispatcher: Dispatcher, channel: string, store?: any) {
		this._dispatcher = dispatcher;
		this._channel = channel + '.store';
		
		if (store) {
			this._store = new Baobab(store, {asynchronous: false});
		} else {
			this._store = new Baobab(DefaultStore);
		}
		
		this._dispatcher.subscribe(this._channel, 'push', this.onPush);
		this._dispatcher.subscribe(this._channel, 'update', this.onUpdate);
		this._dispatcher.subscribe(this._channel, 'remove', this.onRemove);

	}
	
	select(...args): Store {
		return this._store.select(args);
	}

	get(path?: any): any {
		return path ? this._store.get(path) : this._store.get();
	}
	
	unset(path: any,value:any): void {
		this._dispatcher.publish(this._channel, 'unset', {
			path: path,
			value: value
		});
	}
	
	remove(path: any, topic?: string): void {
		this._dispatcher.publish(this._channel, 'remove', {
			prop: path,
			topic: topic
		});
	}
	
	update(path: any, value: any, topic?: any): void {
		this._dispatcher.publish(this._channel, 'update', {
			prop: path,
			value: value,
			topic: topic
		});
	}
	
	push(path:any, item: any, topic?: any):void {
		this._dispatcher.publish(this._channel, 'push', {
			path: path,
			item: item,
			topic: topic
		});
	}
	
	onUpdate = (obj: any) => {
		this._store.set(obj.prop, obj.value);
		this.emitUpdate(obj.topic);
	};
	
	onRemove = (obj: any) => {
		this._store.unset(obj.prop);
		this.emitUpdate(obj.topic);
		
	}
	
	
	onPush = (obj:any) => {
		this._store.push(obj.path, obj.item)
		this.emitUpdate(obj.topic);
	}
	
	unsubscribe(sub:any): void {
		this._dispatcher.unsubsribeSub(sub);
	}
	
	emitUpdate(topic?): void {
		topic = isPresent(topic) ? topic : this._channel;
		if(topic!==false){
			this._dispatcher.publish(this._channel, topic + '.is-updated', this._store);
		}
		
	}
	
	subscribe(topic: string,cb:any): any{
		let sub = this._dispatcher.subscribe(this._channel, topic + '.is-updated', (state: any) => {
			cb(state);
		});
		this.emitUpdate(topic);
		return sub;
	}
	
	subscribeToChannel(cb: any): any {
		let sub = this._dispatcher.subscribe(this._channel, '#.is-updated', (state: any) => {
			cb(state);
		});
		this.emitUpdate();
		return sub;
	}
	
	exists(path) {
		return this._store.exists(path);
	}
	
	

}