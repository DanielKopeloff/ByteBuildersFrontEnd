export class ByteUserLogin {
    constructor(
        public id: number,
        public username: string,
        public expirationDate: Date,
        public email: string,
        private _token: string
    ){}

    get token(){
        if(!this.expirationDate || new Date() > this.expirationDate){
            return null;
        }
        return this._token;
    }

  }
  