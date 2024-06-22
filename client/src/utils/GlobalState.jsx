// globalState.js
class GlobalState {
    constructor() {
        this.state = {};
    }
    
    set(key, value) {
        this.state[key] = value;
    }
    
    get(key) {
        const value = this.state[key];
        this.clear(key); // Clear the state after retrieval
        return value;
    }
    
    clear(key) {
        delete this.state[key];
    }
}

const globalState = new GlobalState();
export default globalState;
