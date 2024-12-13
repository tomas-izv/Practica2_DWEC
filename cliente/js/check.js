export class Check {
    constructor(parent, client) {
        this.parent = parent;
        this.client = client;
        this.states = [];
    }

    changeValue(name, value) {
        const data = this.states.find((item) => item.name == name);

        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, state: value }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('State updated:', data))  // This is to log the response
        .catch(console.error);
    }

    addCheck(name) {
        this.states.push({
            name: name,
            state: false
        })
        const check = document.createElement("label");
        check.classList.add("form-switch");
        this.parent.appendChild(check);
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        check.appendChild(input);
        check.appendChild(document.createElement("i"));
        const span = document.createElement('span');
        const text = document.createTextNode('OFF');
        span.appendChild(text);
        check.appendChild(span);
        input.addEventListener('change', (event) => {
            this.changeValue(name, event.target.checked);
            text.nodeValue = event.target.checked ? 'ON' : 'OFF'; // This is so that when the valve is checked/unchecked, the text changes as needed on it's state
        })

        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(data => {
                const valve = data.find(valve => valve.name === name);
                if (valve) {
                    input.checked = valve.state;  // This is th set the checkbox's state for the ON/OFF
                    text.nodeValue = valve.state ? "ON" : "OFF";

                    // This updates the local array as the user desires
                    const state = this.states.find(item => item.name === name);
                    if (state) {
                        state.state = valve.state;  // This syncs the initial state with the server
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching valve state:', error);
                text.nodeValue = 'Error';
            });
    }
}