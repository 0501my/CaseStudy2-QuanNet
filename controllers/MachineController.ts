import Machine from "../model/Machine";
import IOFile from "../IOFile"

let input = require('readline-sync')


export default class MachineController {
    private arrMachine = new Array<Machine>()
    private fileMachine = new IOFile()
    private _moneyPerHour: number = 5000;
    private PATH = './data/machine.txt'

    constructor() {
        let dataMachine = this.fileMachine.readFile(this.PATH)
        dataMachine.forEach(e => {
            let arr = e.split(",");
            this.arrMachine.push(new Machine(arr[0], arr[1], parseInt(arr[2]), parseInt(arr[3])));
        })
    }


    set moneyPerHour(value: number) {
        this._moneyPerHour = value
    }

    public addMachine(): void {
        let inputNameMachine = input.question("Ten may: ");
        let inputStatusMachine = input.question("Trang thai may : ");
        let inputTimeUsed = parseInt(input.question("Thoi gian su dung:"));
        try {
            if (this.arrMachine.some(e => e.nameMachine === inputNameMachine)) {
                console.log("Tên máy đã tồn tại !");
            } else {
                if (inputStatusMachine == "disable" || inputStatusMachine == "available") {
                    let newMachine = new Machine(inputNameMachine.toLowerCase(), inputStatusMachine, inputTimeUsed, 0);
                    this.arrMachine.push(newMachine);
                    this.writeData();
                } else {
                    throw new Error("Tình trạng máy lỗi !!");
                }
            }
        } catch (e: any) {
            console.log(e.message);
        }

    }

    public displayMachines(): void {
        console.table(this.arrMachine);
    }

    public updateMachine(value: number): void {
        let indexInput = value;
        try {
            if (this.arrMachine.findIndex((e, index) => indexInput == index) != -1) {
                let newName = input.question("Cap nhat ten may: ");
                let newStatus = input.question("Cap nhat trang thai may: ");
                let newTimeUsed = parseInt(input.question("Cap nhat thoi gian su dung: "));
                try {
                    if (this.arrMachine.some(e => e.nameMachine == newName)) {
                        console.log("Machine name already exist !")
                    } else {
                        if (newStatus == "available" || newStatus == "disable") {
                            this.arrMachine[indexInput] = new Machine(newName.toLowerCase(), newStatus, newTimeUsed, 0)
                            this.writeData();
                            console.log("----------------Cập nhật thành công---------------");
                            this.displayMachines()
                        } else {
                            throw new Error("Tình trạng máy lỗi !! ")
                        }
                    }
                } catch (e: any) {
                    console.log(e.message);
                }
            } else {
                throw new Error("Error index !")
            }
        } catch (err: any) {
            console.log(err.message);
        }

    }

    public deleteMachine(value: number) {
        let index = value;
        this.arrMachine.splice(index, 1)
        this.writeData();
        console.table(this.arrMachine);
    }

    public addService(index: number, price: number) {
        let indexInput = index;
        try {
            if (this.arrMachine.findIndex((e, index) => indexInput == index) != -1) {
                this.arrMachine[indexInput].totalMoney += price;
                this.writeData();
            } else {
                throw new Error("Error index !");
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    public findMachine(nameInput: string) {
        if (this.arrMachine.some(e => e.nameMachine == nameInput)) {
            console.table(this.arrMachine.filter(e => e.nameMachine == nameInput))
            console.log("\n----------------------Tìm thành công!-----------------------");
        } else {
            console.log("\n----------------------Không thể tìm thấy máy!!-----------------------");
        }
    }


    public totalMoneyMachineAvailable() {
        this.arrMachine.forEach(e => {
            let str = e.statusMachine.toLowerCase();
            if (str == "available") {
                e.totalMoney = e.timeUsed * this._moneyPerHour
            }
        })
    }

    public writeData() {
        this.fileMachine.writeFile(this.PATH, this.arrMachine);
    }

    public billMachineAvailable(index: number) {
        let newArr = this.arrMachine.filter(e => {
            let str = e.statusMachine.toLowerCase();
            return str == "available"
        })
        newArr[index].statusMachine = "disable"
        newArr[index].totalMoney = 0
        newArr[index].timeUsed = 0
        this.writeData();
    }

    public sortMachineByName() {
        console.table(this.arrMachine.sort());
        this.writeData();
    }

    public displayMachineAvailable() {
        let count = 0;
        let newArr = this.arrMachine.filter(e => {
            let str = e.statusMachine.toLowerCase();
            count++;
            return str == "available"
        })

        try {
            if (count != 0) {
                console.table(newArr)
            } else {
                throw new Error("Không có máy nào trực tuyến !")
            }
        } catch (error: any) {
            console.log(error.message)
        }

    }

    public sumRevenue(): number {
        let sum = 0;
        this.arrMachine.forEach(e => {
            sum += e.totalMoney
        })

        return sum
    }

    public displayMachineDisable() {
        let count = 0;
        let newArr = this.arrMachine.filter(e => {
            let str = e.statusMachine.toLowerCase();
            count++;
            return str == "disable"
        })
        try {
            if (count == 0) {
                throw new Error("Không có máy nào không trực tuyến !")
            } else {
                console.table(newArr)
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    get arrMachineLength() {
        return this.arrMachine.length
    }

}
