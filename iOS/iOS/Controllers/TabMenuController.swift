//
//  TabMenuController.swift
//  http-requests
//
//  Created by Chris Caldwell on 2/6/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//
import UIKit

class TabMenuController: UITabBarController {
    override func viewDidLoad() {
        viewControllers = [homeController]
    }
    
    let homeController: UINavigationController = {
        let controller = UINavigationController(rootViewController: HomeController())
        controller.tabBarItem.image = UIImage(named: "home")
        controller.title = "Get"
        return controller
    }()
    
//    let getRequestController: UINavigationController = {
//        let controller = UINavigationController(rootViewController: GetRequestController())
//        controller.title = "Get"
//        controller.tabBarItem.image = UIImage(named: "get")
//        return controller
//    }()
}
