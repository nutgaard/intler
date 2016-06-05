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
            const serialized = JSON.stringify(args.map((arg) => {
                if (arg instanceof HTMLElement) {
                    const nodename = arg.nodeName.toLocaleLowerCase();
                    const id = arg.id;
                    const classes = Array.from(arg.classList).map((cls) => `.${cls}`).join('');
                    const components = [
                        nodename,
                        id && id.length > 0 ? `#${id}` : '',
                        classes && classes.length > 0 ? `${classes}` : ''
                    ];

                    return components.join('');
                }
                return arg;
            }));
            original[method](serialized);
        };
    });

    window.console = replacement;
};

module.exports = {
    listen,
    rebindConsole
};