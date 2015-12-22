import { Component, View } from 'angular2/core';
import { Comment } from './comment';
import { NewComment } from './new_comment';
let template = require('./comments.html');
let styles = require('./comments.css');

/*
	<comments class="inset"></comments>
*/

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