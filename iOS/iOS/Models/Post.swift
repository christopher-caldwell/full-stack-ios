//
//  Post.swift
//  iOS
//
//  Created by Chris Caldwell on 6/3/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//


class Post: Decodable {
    
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
}
