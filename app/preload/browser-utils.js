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

module.exports = {
    listen
};