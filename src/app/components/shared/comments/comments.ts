import { Component, View } from 'angular2/angular2';
import { Comment } from './comment';
import { NewComment } from './new_comment';
let template = require('./comments.html');
let styles = require('./comments.scss');

@Component({
	selector: 'comments'
})
@View({
	template: template,
	styles: [styles],
	directives: [Comment, NewComment]
})	    
export class Comments {

}