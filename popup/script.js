class InputField {
    #id = '';
    #element = '';

    constructor(id) {
        this.#id = id;
        this.#element = document.getElementById(id);
        console.log("element", this.#element);
        this.loadStorage();
        this.addHandlers()
    }

    async loadStorage() {
        chrome.storage.local.get([this.#id]).then((result) => {
            console.log(`Loaded value for ${this.#id}:`, result[this.#id]);
            this.#element.value = result[this.#id] || '';
        }).catch((error) => {
            console.error(`Error loading value for ${this.#id}:`, error);
            this.#element.value = '';
        });
    }

    addHandlers() {
        console.log(`Adding handlers for ${this.#id}`);
        this.#element && this.#element.addEventListener('input', () => {
            console.log(`Input changed for ${this.#id}:`, this.#element.value);
            chrome.storage.local.set({[this.#id]: this.#element.value});
        });
    }
}

const ticketIdQuery = new InputField('ticket-id-query');
const ticketIdFormatter = new InputField('ticket-id-formatter');
const jiraUrl = new InputField('jira-url');

const branchQuery = new InputField('branch-query');
const branchFormatter = new InputField('branch-formatter');
const launcherConfig = new InputField('launcher-config');

const jiraButtonLocation = new InputField('jira-button-location');
const launcherButtonLocation = new InputField('launcher-button-location');

