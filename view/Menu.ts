let input = require('readline-sync')
import MachineController from '../controllers/MachineController'
import AccountController from '../controllers/AccountController';

export default class Menu {
    private controller: MachineController
    private _MyAccount: string;
    private _MyPassword: string;
    private _AccountController: AccountController;

    constructor(_MyAccount: string, _MyPassword: string, _AccountController: AccountController) {
        this.controller = new MachineController()
        this._MyAccount = _MyAccount
        this._MyPassword = _MyPassword
        this._AccountController = _AccountController
    }

    public handleService(): void {
        let index = parseInt(input.question("Chon 1 so ban muon them vao vao dich vu :"));
        if (index > this.controller.arrMachineLength - 1) {
            console.log("Không tồn tại !")
            console.log("\n----------------------Thêm dch vụ thất bại !-----------------------");
        } else {
            let str = `
        --------------------------------
        1. CoCa : 10k
        2. Sting : 10k
        3. Mỳ tôm : 5k
        4. Combo mỳ tôm + sting : 12k
        --------------------------------
        `
            console.log(str)
            let n: number = 0;
            while (n < 1 || n > 4) {
                n = +(input.question("Chon 1 so: "));
                if (n < 1 || n > 4) {
                    console.log("Xin vui long chon tu 1 den 4 !")
                }
            }
            switch (n) {
                case 1:
                    this.controller.addService(index, 10000);
                    break;
                case 2:
                    this.controller.addService(index, 10000);
                    break;
                case 3:
                    this.controller.addService(index, 5000);
                    break;
                case 4:
                    this.controller.addService(index, 12000);
                    break;
            }
            this.controller.displayMachines();
            console.log("\n----------------------Them dich vu thanh cong !-----------------------");
        }
    }

    public mainMenu() {
        let index: number;
        let menu: string = `
         ------------------Menu-------------
        1. Hiển thị tất cả các máy
        2. Thêm máy
        3. Cập nhật máy
        4. Xóa máy
        5. Thêm dịch vụ
        6. Đổi tiền/giờ chơi
        7. Tổn tiền các máy
        8. Quản lý tài khoản
        9. Tổng doanh thu
        10. Tìm máy
        11. Sắp xếp máy theo tên
        12. Thoát
        --------------------------------------
        `
        console.log(menu)
        let n: number = 0;
        while (n < 1 || n > 12) {
            n = +(input.question("Chon so: "));
            if (n < 1 || n > 12) {
                console.log("Xin vui long chon tu 1 den 10 !")
            }
        }

        switch (n) {
            case 1:
                let str = `
                1. Hiển thị tất cả các máy đang trực tuyến
                2. Hiển thị tất cả các máy đang vô hiệu hóa
                3. Hiển thị tất cả máy
                `
                console.log(str);
                let a: number;
                a = +(input.question("Chn so:"))
                switch (a) {
                    case 1:
                        this.controller.displayMachineAvailable();
                        break;
                    case 2:
                        this.controller.displayMachineDisable();
                        break;
                    case 3:
                        this.controller.displayMachines();
                        break;
                }
                console.log("\n-------------------- Hiển thị máy thành công !---------------------");
                break;
            case 2:
                this.controller.addMachine()
                console.log("\n----------------------Thêm máy thành công !-----------------------");
                break;
            case 3:
                this.controller.displayMachines();
                index = parseInt(input.question("Chon 1 may ban muon cap nhat :"));
                if (index > this.controller.arrMachineLength - 1) {
                    console.log("Does not exist index !")
                } else {
                    this.controller.updateMachine(index);
                    console.log("\n----------------------Cập nhật máy thành công !-----------------------");
                }
                break;
            case 4:
                this.controller.displayMachines();
                index = parseInt(input.question("Chon may ban muon xoa :"));
                if (index > this.controller.arrMachineLength - 1) {
                    console.log("Does not exist index !")
                } else {
                    let a: number;
                    let str = `
                        Bạn có thực sự muốn xóa máy này
                        1. Đúng
                        2. Không
                    `
                    console.log(str)
                    a = +(input.question("Chon so :"))
                    if (a == 1) {
                        this.controller.deleteMachine(index);
                        console.log("\n----------------------Xóa máy thành công !-----------------------");
                    }
                }
                break;
            case 5:
                this.controller.displayMachines();
                this.handleService()
                break;
            case 6:
                let n6 = +(input.question("Chon so tien ban muon dat cho moi gio: "));
                this.controller.moneyPerHour = n6;
                console.log("\n----------------------Dat tien cho moi gio thanh cong!-----------------------");
                break;
            case 7:
                let str7 = `
                    --------------------------------
                    1. Bill
                    2. More Service
                    --------------------------------
                    `
                console.log(str7)
                let a7 = +(input.question("Chon 1 so: "));
                switch (a7) {
                    case 1:
                        this.controller.totalMoneyMachineAvailable();
                        this.controller.displayMachineAvailable()
                        n = +(input.question("Chon may ban muon tinh tien : "));
                        this.controller.billMachineAvailable(n);
                        this.controller.displayMachines()
                        break;
                    case 2:
                        this.controller.displayMachines();
                        this.handleService();
                        this.controller.displayMachines();
                        break;
                }
                break;
            case 8:
                let str8 = `
                    --------------------------------
                    1. Hiển thị tất cả tài khỏan
                    2. Xóa tài khoản
                    3. Đổi mật khẩu tài khoản
                    --------------------------------
                    `
                console.log(str8)
                let a8 = +(input.question("Chon 1 so: "));
                switch (a8) {
                    case 1:
                        this._AccountController.displayAllUsers();
                        break;
                    case 2:
                        this._AccountController.displayAllUsers();
                        index = +(input.question("Chon may ban muon xoa: "))
                        let str = `
                        Bạn có thực sự muốn xóa Người dùng này : 
                            1. Đúng
                            2. Không
                        `
                        console.log(str)
                        let b = +(input.question("Lua chon cua ban :"))
                        if (b == 1) {
                            this._AccountController.deleteUsers(index, this._MyAccount);
                        }
                        break;
                    case 3:
                        let currentPassword = input.question("Mat khau hien tai: ");
                        let newPassword1 = input.question("Mat khau moi : ");
                        let newPassword2 = input.question("Nhap lai mat khau : ");
                        if (newPassword1 === newPassword2 && currentPassword === this._MyPassword) {
                            this._AccountController.changePassword(this._MyAccount, newPassword1)
                        }
                        break;
                }
                break;
            case 9:
                console.log("Tổng doanh thu là : " + this.controller.sumRevenue());
                console.log("\n----------------------Tổng doanh thu !-----------------------");
                break;
            case 10:
                let findMachine = input.question("Nhap ten may muon tim : ");
                this.controller.findMachine(findMachine);
                break;
            case 11:
                this.controller.sortMachineByName();
                this.controller.displayMachines();
                console.log("\n----------------------Sap xep thanh cong !-----------------------");
                break;
            case 12:
                console.log("Cam on ban da su dung !!");
                return;
        }
        this.mainMenu()
    }
}
