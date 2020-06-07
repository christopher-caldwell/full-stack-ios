//
//  LoginController.swift
//  iOS
//
//  Created by Chris Caldwell on 6/1/20.
//  Copyright © 2020 Chris Caldwell. All rights reserved.
//

import LBTATools
import Alamofire
import JGProgressHUD
import ColorCompatibility
import SwiftyJSON
import SwiftKeychainWrapper

let fieldRadius = CGFloat(10)

struct Login: Encodable {
    let emailAddress: String
    let password: String
}

class LoginController: LBTAFormController {
    
    let logoImageView = UIImageView(image: #imageLiteral(resourceName: "startup"), contentMode: .scaleAspectFit)
    let logoLabel = UILabel(text: "FullStack Social", font: .systemFont(ofSize: 32, weight: .heavy), textColor: ColorCompatibility.label, numberOfLines: 0)
    
    let emailTextField = IndentedTextField(placeholder: "Email", padding: 24, cornerRadius: fieldRadius, keyboardType: .emailAddress, backgroundColor: ColorCompatibility.systemGray3, isSecureTextEntry: false)
    
    let passwordTextField = IndentedTextField(placeholder: "Password", padding: 24, cornerRadius: fieldRadius, backgroundColor: ColorCompatibility.systemGray3, isSecureTextEntry: true )
    
    lazy var loginButton = UIButton(title: "Login", titleColor: .white, font: .boldSystemFont(ofSize: 18), backgroundColor: .black, target: self, action: #selector(handleLogin))
    
    let errorLabel = UILabel(text: "Your login credentials were incorrect, please try again.", font: .systemFont(ofSize: 14), textColor: .red, textAlignment: .center, numberOfLines: 0)
    
    lazy var goToRegisterButton = UIButton(title: "Need an account? Go to register.", titleColor: ColorCompatibility.label, font: .systemFont(ofSize: 16), target: self, action: #selector(goToRegister))
    
    @objc fileprivate func handleLogin(){
        let hud = JGProgressHUD(style: .dark)
        hud.textLabel.text = "Logging in"
        hud.show(in: view)
        
        guard let emailAddress = emailTextField.text else { return }
        guard let password = passwordTextField.text else { return }
        
        sendLoginRequest(emailAddress: emailAddress, password: password)
        
        errorLabel.isHidden = true
        
        hud.dismiss()
        
    }
    
    @objc fileprivate func goToRegister(){
        print("Register")
    }
    
    fileprivate func sendLoginRequest(emailAddress: String, password: String) {
        let loginParameters = Login(emailAddress: emailAddress, password: password)
        AF.request("http://localhost:5000/local/user/login", method: .post, parameters: loginParameters, encoder: JSONParameterEncoder.default)
            .responseJSON { response in
                switch response.result {
                case .success:
                    if let json = response.data {
                        do{
                            let data = try JSON(data: json)
                            let token = data["token"].string
                            KeychainWrapper.standard.set(token ?? "oops", forKey: "token")
                            KeychainWrapper.standard.set(password, forKey: "password")
                            KeychainWrapper.standard.set(emailAddress, forKey: "emailAddress")
                        }
                        catch{
                        print("JSON Error")
                        }

                    }
                    self.dismiss(animated: true)
                case .failure(let error):
									self.errorLabel.isHidden = false
									self.errorLabel.text = "The combination given did not match our records. Please try again."
                    debugPrint(error)
									return
            }
            
            
            
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let previousToken: String? = KeychainWrapper.standard.string(forKey: "token")
        let previousEmail: String? = KeychainWrapper.standard.string(forKey: "emailAddress")
        let previousPassword: String? = KeychainWrapper.standard.string(forKey: "password")
        
        if previousToken != nil && previousEmail != nil && previousPassword != nil {
            sendLoginRequest(emailAddress: previousEmail!, password: previousPassword!)
        }
        
        print("token", previousToken ?? "no token")
        print("password", previousPassword ?? "no password")
        print("email", previousEmail ?? "no email")
        
        view.backgroundColor = ColorCompatibility.systemBackground
        
        emailTextField.autocapitalizationType = .none
        emailTextField.textColor = ColorCompatibility.label
        
        passwordTextField.textColor = ColorCompatibility.label
        
        loginButton.layer.cornerRadius = fieldRadius
        navigationController?.navigationBar.isHidden = true
        errorLabel.isHidden = true
        
        let formView = UIView()
        formView.stack(
            formView.stack(formView.hstack(logoImageView.withSize(.init(width: 80, height: 80)), logoLabel.withWidth(160), spacing: 16, alignment: .center).padLeft(12).padRight(12), alignment: .center),
            UIView().withHeight(12),
            emailTextField.withHeight(50),
            passwordTextField.withHeight(50),
            loginButton.withHeight(50),
            errorLabel,
            goToRegisterButton,
            UIView().withHeight(80),
            spacing: 16).withMargins(.init(top: 48, left: 32, bottom: 0, right: 32))
        
        formContainerStackView.padBottom(-24)
        formContainerStackView.addArrangedSubview(formView)
    }
}


