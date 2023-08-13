

export function waitForState(store, selector, expectedValue) {
    return new Promise((resolve, reject) => {
        if (selector(store.getState()) === expectedValue) {
            return resolve();
        }

        const unsubscribe = store.subscribe(() => {
            if (selector(store.getState()) === expectedValue) {
                unsubscribe();
                resolve();
            }
        });

        // 10-second timeout to reject the promise
        setTimeout(() => {
            unsubscribe();
            reject(new Error('Timeout after 10 seconds waiting for state change.'));
        }, 10000);  // 10,000 milliseconds is 10 seconds
    });
}