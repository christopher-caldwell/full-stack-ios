//
//  Post.swift
//  iOS
//
//  Created by Chris Caldwell on 6/3/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//
import SwiftyJSON

class Post {
    
    var id: String
    var content: String
    var user: User
    var createdAt: Int
    
    init(
        id: String,
        user: User,
        content: String,
        createdAt: Int
    ){
        self.id = id;
        self.content = content;
        self.user = user;
        self.createdAt = createdAt;
    }
		class func build(json:JSON) -> Post? {
			let id = json["id"].string
			let content = json["content"].string
			let emailAddress = json["identifier"].string
			let createdAt = json["createdAt"].int
			let postAuthor = User(emailAddress: emailAddress!)
			return Post(id: id!, user: postAuthor, content: content!, createdAt: createdAt!)
	}
}

