//
//  User.swift
//  iOS
//
//  Created by Chris Caldwell on 6/3/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//

class User {
    
	var firstName: String?
	var lastname: String?
	var emailAddress: String
	var role: String?
	var pictureUrl: String?
	var phone: String?
  
	init(
		emailAddress: String,
		firstName: String?,
		lastName: String?,
		role: String?,
		pictureUrl: String?,
		phone: String?
	 ){
		self.firstName = firstName
		self.lastname = lastName
		self.emailAddress = emailAddress
		self.role = role
		self.pictureUrl = pictureUrl
		self.phone = phone
	}
	
	convenience init( emailAddress: String ){
		self.init(emailAddress: emailAddress, firstName: nil, lastName: nil, role: nil,
		pictureUrl: nil, phone: nil)
		
	}
}
