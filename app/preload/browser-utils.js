const listen = (eventType, scope, callback) => {
    document.body.addEventListener(eventType, (event) => {
        let node = event.target;
        while (node !== document.body) {
            if (node.matches(scope)) {
                callback(event);
                break;
            }
            node = node.parentNode;
        }
    });
};

const rebindConsole = () => {
    const original = window.console;
    const methods = ['log', 'warn', 'error'];

    const replacement = {};

    methods.forEach((method) => {
        replacement[method] = (...args) => {
            const serialized = JSON.stringify(args);
            original[method](serialized);
        };
    });

    window.console = replacement;
};

module.exports = {
    listen,
    rebindConsole
};