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

class HomeController: BaseController {

    override func viewDidLoad() {
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
        print("Button tapped")
        guard let url = URL(string: "http://localhost:5000/local/posts") else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            DispatchQueue.main.async {
                if let error = error {
                    print("Failed to hit server", error)
                    return
                } else if let response = response as? HTTPURLResponse, response.statusCode != 200 {
                    print("Failed to fetch posts, staus code:", response.statusCode)
                    return
                } else {
                    print("Success")
                    let html = String(data: data ?? Data(), encoding: .utf8) ?? ""
                    print(html)
                    let vc = UIViewController()
                    let webView = WKWebView()
                    webView.loadHTMLString(html, baseURL: nil)
                    vc.view.addSubview(webView)
                    webView.fillSuperview()
                    self.present(vc, animated: true)
                }
            }
        }.resume()
    }
}
