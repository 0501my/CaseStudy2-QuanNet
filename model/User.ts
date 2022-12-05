export default class User {
    private _userName: string;
    private _userEmail: string;
    private _userPassWord: string;
    private _userAccount: string;
    private _userAge: number;

    constructor(_userAccount: string, _userPassWord: string, _userName: string, _userAge: number, _userEmail: string) {
        this._userAccount = _userAccount
        this._userPassWord = _userPassWord
        this._userName = _userName
        this._userAge = _userAge
        this._userEmail = _userEmail
    }

    get userAccount(): string {
        return this._userAccount
    }

    set userAccount(value: string) {
        this._userAccount = value;
    }

    get userPassWord(): string {
        return this._userPassWord
    }

    set userPassWord(value: string) {
        this._userPassWord = value;
    }

    get userName(): string {
        return this._userName
    }

    set userName(value: string) {
        this._userName = value;
    }

    get userAge(): number {
        return this._userAge
    }

    set userAge(value: number) {
        this._userAge = value;
    }

    get userEmail(): string {
        return this._userEmail
    }

    set userEmail(value: string) {
        this._userEmail = value;
    }

    public toString = (): string => {
        return `${this.userAccount},${this.userPassWord},${this.userName},${this.userAge},${this.userEmail}`;
    }
}
