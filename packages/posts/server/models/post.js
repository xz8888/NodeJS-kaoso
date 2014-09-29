'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/** Schema for comments **/
var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },

 	content: {
 		type: String, 
 		required: true, 
 		trim: true
 	}, 

 	slug: {
 		type: String
 	}, 

 	full_slug: {
 		type: String
 	}, 

    user: {
    	type: Schema.ObjectId,
    	ref: 'User'
 	},

    post:{
    	type: Schema.ObjectId, 
    	ref: 'Post'
    }
 });

/** Schema for posts **/
 var PostSchema = new Schema({
 	created: {
 		type: Date, 
 		default: Date.now
 	},

 	title: {
 		type: String, 
 		required: true, 
 		trim: true
 	}, 

 	content: {
 		type: String, 
 		required: true, 
 		trim: true
 	}, 

    totalNumberOfComments:{
    	type: Number, 
        default: 0
    },

    upvote: {
        type: Number, 
        default: 0
    },

    downvote: {
        type: Number, 
        default: 0
    },

    approved: {
    	type: Boolean, 
    	default: false
    },

    hot: {
        type: Boolean, 
        default: false
    },

 	user: {
 		type: Schema.ObjectId,
        ref: 'User'
 	}, 

 	category:{
 		type: Schema.ObjectId, 
 		ref: 'Category'
 	}
 });

 /** Schema for Category **/
 var CategorySchema = new Schema({
    name: String, 
    parent: {type: Schema.ObjectId, ref: 'Category'},
    children: [{ type: Schema.ObjectId, ref: 'Category'}],
    order: Number
 });

 /**
 * Statics
 */
PostSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
mongoose.model('Category', CategorySchema);