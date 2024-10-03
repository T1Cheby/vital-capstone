class AuthConfig {
    
    constructor(){
        if(!AuthConfig.instance){
            this.accessTokenLife = "30m";
            this.accessTokenSecret = "vital_cap_24";
            AuthConfig.instance = this;
        }
        return AuthConfig.instance;
    }
}

module.exports = new AuthConfig();