import User from '../model/User';
import Menu from '../view/Menu';
import IOFile from '../IOFile'

let input = require('readline-sync')

export default class AccountController {
    private listUser = new Array<User>();
    private fileUser = new IOFile();
    private PATH = "./data/user.txt"

    init() {
        let dataUser = this.fileUser.readFile(this.PATH)
        dataUser.forEach(e => {
            let arr = e.split(",");
            this.listUser.push(new User(arr[0], arr[1], arr[2], parseInt(arr[3]), arr[4]));
        })
        let menu: string = `
        -----------------Menu-----------------
        1. Đăng nhập
        2. Đăng ký
        3. Thoát
        ---------------------------------------
        `;
        console.log(menu);
        let temp: number = 0;
        let regex: RegExp = /^[1-3]$/;

        while (temp < 1 || temp > 3) {
            let chooseUser = input.question("Chon chuc nang : ");
            if (regex.test(chooseUser)) {
                temp = +(chooseUser)
            } else {
                temp = -1
            }

            if (temp < 1 || temp > 3) {
                console.log("Vui lòng chọn giữa 1 và 3...");
            }
        }

        switch (temp) {
            case 1:
                this.login();
                break;
            case 2:
                this.register();
                break;
            case 3:
                console.log("Cảm ơn bạn đã sử dụng !!");
                break;
        }

    }

    login() {
        console.log("-----------------Login-----------------")
        let inputAccount = input.question("Account: ");
        let inputPassword = input.question("Password: ");
        let isLogin = this.listUser.some(e => e.userAccount == inputAccount && e.userPassWord == inputPassword)
        try {
            if (isLogin) {
                const theMenu = new Menu(inputAccount, inputPassword, this)
                theMenu.mainMenu()
            } else {
                throw new Error("Tài khoản hoạc mật khẩu sai !");
            }
        } catch (e: any) {
            console.log(e.message);
            this.init()
        }
        // this.login()
        console.log("---------------------------------------")
    }

    register() {
        let isErrorRegister = true;
        let newAccount: string;
        let newPassword: string;
        let newName: string;
        let newAge: number;
        let newEmail: string;
        console.log("-----------------Register-----------------")

        while (isErrorRegister) {
            newAccount = input.question("Account: ");
            newPassword = input.question("Password: ");
            newName = input.question("Your Name: ");
            newAge = parseInt(input.question("Your Age: "));
            newEmail = input.question("Your Email: ");

            if (this.listUser.some(e => e.userAccount == newAccount)) {
                console.log("Tài khoản đã tồn tại !\n");
            } else {
                isErrorRegister = false
            }

            if (!isErrorRegister) {
                if (!this.validatePassWord(newPassword)) {
                    console.log("Mật khẩu phải có ít nhất tám ký tự, ít nhất một chữ cái và một số !\n")
                    isErrorRegister = true;
                    this.init();
                }

                if (!this.validateEmail(newEmail)) {
                    console.log("Email không hợp lệ !\n");
                    isErrorRegister = true;
                    this.init();
                } else {
                    if (this.listUser.some(e => e.userEmail == newEmail)) {
                        console.log("Email đã tồn tại !\n");
                        isErrorRegister = true;
                        this.init();
                    }
                }
                this.listUser.push(new User(newAccount, newPassword, newName, newAge, newEmail))
                this.fileUser.writeFile(this.PATH, this.listUser)
                this.displayAllUsers();
                console.log("Tạo tài khoản thành công !")
                break;
            } else {
                this.init();
            }
        }
        console.log("------------------------------------------")

        this.init()
    }

    public displayAllUsers() {
        console.table(this.listUser);
    }

    public deleteUsers(value: number, currentAccount: string) {
        try {
            if (this.listUser[value].userAccount == currentAccount) {
                throw new Error("Bạn không thể xóa tài khoản !")
            } else {
                this.listUser.splice(value, 1);
                this.writeData();
                console.table(this.listUser);
                console.log("\n----------------------Xóa tài khoản thành công !-----------------------");
            }
        } catch (error: any) {
            console.log(error.message);
        }

    }

    public changePassword(Account: string, checkPassword: string) {
        this.listUser.forEach(e => {
            if (e.userAccount == Account) {
                if (e.userPassWord == checkPassword) {
                    try {
                        if (this.validatePassWord(checkPassword)) {
                            e.userPassWord = checkPassword;
                            this.writeData();
                        } else {
                            throw new Error("Mật khẩu phải có ít nhất tám ký tự, ít nhất một chữ cái và một số !\n")
                        }
                    } catch (e: any) {
                        console.log(e.message);
                    }

                } else {
                    console.log("Mật khẩu không khớp !")
                }
            }
        })
    }

    validatePassWord(inputPassword: string) {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(inputPassword);
    }

    validateEmail(inputEmail: string) {
        let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(inputEmail);
    }

    writeData() {
        this.fileUser.writeFile(this.PATH, this.listUser);
    }
}
