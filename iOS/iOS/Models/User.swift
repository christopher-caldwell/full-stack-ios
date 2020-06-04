//
//  User.swift
//  iOS
//
//  Created by Chris Caldwell on 6/3/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//

class User: Decodable {
    
    var id: String?
    var firstName: String?
    var lastname: String?
    
    init(id: String?, firstName: String?, lastName: String?){
        self.id = id
        self.firstName = firstName
        self.lastname = lastName
    }
}
