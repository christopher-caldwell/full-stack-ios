//
//  ViewController.swift
//  http-requests
//
//  Created by Chris Caldwell on 2/6/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//
import UIKit
import WebKit
import LBTATools
import SwiftKeychainWrapper
import Alamofire
import SwiftyJSON
import ColorCompatibility

class HomeController: UITableViewController {
	
	var posts: [Post?] = []

	override func viewDidLoad() {
		view.backgroundColor = ColorCompatibility.systemBackground
		super.viewDidLoad()
		title = "Home"
		
		navigationItem.rightBarButtonItem = .init(title: "Fetch Posts", style: .plain, target: self, action: #selector(fetchPosts))
		navigationItem.leftBarButtonItem = .init(title: "Login", style: .plain, target: self, action: #selector(handleLogin))
	}
	
	@objc fileprivate func handleLogin(){
		let navController = UINavigationController(rootViewController: LoginController())
	 present(navController, animated: true)
	}
    
	@objc fileprivate func fetchPosts(){
		let retrievedToken: String? = KeychainWrapper.standard.string(forKey: "token")
		let emailAddress: String? = KeychainWrapper.standard.string(forKey: "emailAddress")
		if retrievedToken != nil && emailAddress != nil {
			let parameters = [ "emailAddress": emailAddress! ]
			let headers: HTTPHeaders = [ "Authorization": retrievedToken! ]
			AF.request("http://localhost:5000/local/posts",
			 method: .get,
			 parameters: parameters,
			 encoding: URLEncoding(destination: .queryString),
			 headers: headers
			)
			.validate(statusCode: 200..<201)
			.responseJSON { response in
				switch response.result {
					case .success:
						if let json = response.data {
							do{
								let data = try JSON(data: json)
								if let posts = (data["posts"].array?.map { return Post.build(json: $0) }) {
									print(data["posts"])
									self.posts = posts
									self.tableView.reloadData()
								}
							}
							catch{
							print("JSON Error")
							}

						}
							self.dismiss(animated: true)
						case .failure(let error):
									debugPrint(error)
					}
				}
			}
	}

	override func tableView(_ tableView: UITableView, numberOfRowsInSection: Int) -> Int {
		return posts.count
	}

	override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
		let cell = UITableViewCell(style: .subtitle, reuseIdentifier: nil)
		let post = posts[indexPath.row]
		cell.textLabel?.text = post?.user.emailAddress
		cell.textLabel?.font = .boldSystemFont(ofSize: 14)
		cell.detailTextLabel?.text = post?.content
		cell.detailTextLabel?.numberOfLines = 0
		return cell
	}
}
